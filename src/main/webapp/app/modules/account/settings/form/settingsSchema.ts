import { z } from 'zod';
import { translate } from 'react-jhipster';

export const settingsSchema = z.object({
  firstName: z
    .string()
    .min(1, translate('settings.messages.validate.firstname.required'))
    .max(50, translate('settings.messages.validate.firstname.maxlength')),
  lastName: z
    .string()
    .min(1, translate('settings.messages.validate.lastname.required'))
    .max(50, translate('settings.messages.validate.lastname.maxlength')),
  email: z
    .string()
    .min(1, translate('global.messages.validate.email.required'))
    .email(translate('global.messages.validate.email.invalid'))
    .min(5, translate('global.messages.validate.email.minlength'))
    .max(254, translate('global.messages.validate.email.maxlength')),
  langKey: z.string().min(1, translate('settings.messages.validate.language.required')),
});
