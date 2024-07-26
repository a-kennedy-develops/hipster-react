import React, { useEffect } from 'react';
import { Col, Row } from 'reactstrap';
import { Translate, translate } from 'react-jhipster';
import { toast } from 'react-toastify';

import { locales, languages } from 'app/config/translation';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getSession } from 'app/shared/redux/slices/authentication';
import { saveAccountSettings, reset } from './settings.reducer';
import { settingsSchema } from './form/settingsSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2 } from 'lucide-react';

export const SettingsPage = () => {
  const dispatch = useAppDispatch();
  const account = useAppSelector(state => state.authentication.account);
  const successMessage = useAppSelector(state => state.settings.successMessage);
  const isLoading = useAppSelector(state => state.settings.loading);

  const [selectKey, setSelectKey] = React.useState<string>('initial');

  const form = useForm<z.infer<typeof settingsSchema>>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      firstName: account.firstName,
      lastName: account.lastName,
      email: account.email,
      langKey: account.langKey,
    },
    mode: 'onTouched',
  });

  const handleValidSubmit = (values: z.infer<typeof settingsSchema>) => {
    dispatch(
      saveAccountSettings({
        ...account,
        ...values,
      }),
    );
  };

  const clearFormFields = () => {
    form.reset({
      firstName: '',
      lastName: '',
      email: '',
      langKey: '',
    });

    setSelectKey(prevKey => prevKey + '_reset'); // Change the key to force re-render of select
  };

  useEffect(() => {
    dispatch(getSession());
    return () => {
      dispatch(reset());
    };
  }, []);

  useEffect(() => {
    if (successMessage) {
      toast.success(translate(successMessage));
      dispatch(reset());
    }
  }, [successMessage]);

  useEffect(() => {
    form.reset({
      firstName: account.firstName,
      lastName: account.lastName,
      email: account.email,
      langKey: account.langKey,
    });
  }, [account]);

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="settings-title" className="mb-2">
            <Translate contentKey="settings.title" interpolate={{ username: account.login }}>
              User settings for {account.login}
            </Translate>
          </h2>
          <Form {...form}>
            {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
            <form id="settings-form" onSubmit={form.handleSubmit(handleValidSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{translate('settings.form.firstname')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={translate('settings.form.firstname.placeholder')}
                        error={form.formState.errors.firstName && true}
                        disabled={isLoading}
                        {...field}
                        data-cy="firstName"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{translate('settings.form.lastname')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={translate('settings.form.lastname.placeholder')}
                        error={form.formState.errors.lastName && true}
                        disabled={isLoading}
                        {...field}
                        data-cy="lastName"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{translate('global.form.email.label')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={translate('global.form.email.placeholder')}
                        error={form.formState.errors.email && true}
                        disabled={isLoading}
                        {...field}
                        data-cy="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="langKey"
                data-cy="langKey"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{translate('settings.form.language')}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value} key={selectKey} disabled={isLoading}>
                      <FormControl>
                        <SelectTrigger error={form.formState.errors.langKey && true}>
                          <SelectValue placeholder="Select a language" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {locales.map(locale => (
                          <SelectItem value={locale} key={locale}>
                            {languages[locale].name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex">
                <Button
                  className="mr-6"
                  size="lg"
                  type="submit"
                  disabled={isLoading || !form.formState.isValid || !form.formState.isDirty}
                  data-cy="submit"
                >
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  <Translate contentKey="settings.form.button">Save</Translate>
                </Button>
                <Button
                  size="lg"
                  variant="secondary"
                  disabled={isLoading || !form.formState.isDirty}
                  type="button"
                  onClick={clearFormFields}
                  aria-label="Clear form entries"
                  data-cy="clear"
                >
                  <Translate contentKey="password.form.clear">Clear</Translate>
                </Button>
              </div>
            </form>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default SettingsPage;
