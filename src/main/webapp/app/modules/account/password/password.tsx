import React, { useState, useEffect } from 'react';
import { Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { Row, Col } from 'reactstrap';
import { toast } from 'react-toastify';

import { Button } from '@/components/ui/button';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getSession } from 'app/shared/redux/slices/authentication';
import PasswordStrengthBar from 'app/shared/layout/password/password-strength-bar';
import { savePasswordRequest, reset } from './redux/passwordSlice';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { passwordSchema } from './form/passwordSchema';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input/input';

export const PasswordPage = () => {
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(reset());
    dispatch(getSession());
    return () => {
      dispatch(reset());
    };
  }, []);

  const form = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    mode: 'onTouched',
  });

  const handleSubmitPassword = (values: z.infer<typeof passwordSchema>) => {
    dispatch(savePasswordRequest({ currentPassword: values.currentPassword, newPassword: values.newPassword }));
  };

  const clearFormFields = () => {
    form.reset({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
    setPassword('');
  };

  // Selectors
  const account = useAppSelector(state => state.authentication.account);
  const successMessage = useAppSelector(state => state.password.successMessage);
  const errorMessage = useAppSelector(state => state.password.errorMessage);
  const isLoading = useAppSelector(state => state.password.loading);

  useEffect(() => {
    if (successMessage) {
      toast.success(translate(successMessage));
      clearFormFields();
    } else if (errorMessage) {
      toast.error(errorMessage);
    }
    dispatch(reset());
  }, [successMessage, errorMessage]);

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="password-title" className="mb-2">
            <Translate contentKey="password.title" interpolate={{ username: account.login }}>
              Password for {account.login}
            </Translate>
          </h2>
          <Form {...form}>
            {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
            <form id="password-form" onSubmit={form.handleSubmit(handleSubmitPassword)} className="space-y-6">
              <FormField
                control={form.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{translate('global.form.currentpassword.label')}</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder={translate('global.form.currentpassword.placeholder')}
                        error={form.formState.errors.currentPassword && true}
                        data-cy="currentPassword"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <PasswordStrengthBar password={password} />
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{translate('global.form.newpassword.label')}</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder={translate('global.form.newpassword.placeholder')}
                        error={form.formState.errors.newPassword && true}
                        onInput={(event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
                        {...field}
                        data-cy="newPassword"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{translate('global.form.confirmpassword.label')}</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder={translate('global.form.confirmpassword.placeholder')}
                        error={form.formState.errors.confirmPassword && true}
                        {...field}
                        data-cy="confirmPassword"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex">
                <Button className="mr-6" size="lg" disabled={isLoading || !form.formState.isValid} type="submit" data-cy="submit">
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  <Translate contentKey="password.form.button">Save</Translate>
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

export default PasswordPage;
