import { z } from 'zod';
import { translate } from 'react-jhipster';

export const passwordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, translate('global.messages.validate.currentpassword.required'))
      .min(4, translate('global.messages.validate.currentpassword.minlength'))
      .max(50, translate('global.messages.validate.currentpassword.maxlength')),
    newPassword: z
      .string()
      .min(1, translate('global.messages.validate.newpassword.required'))
      .min(4, translate('global.messages.validate.newpassword.minlength'))
      .max(50, translate('global.messages.validate.newpassword.maxlength')),
    confirmPassword: z
      .string()
      .min(1, translate('global.messages.validate.confirmpassword.required'))
      .min(4, translate('global.messages.validate.confirmpassword.minlength'))
      .max(50, translate('global.messages.validate.confirmpassword.maxlength')),
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: translate('global.messages.validate.confirmpassword.match'),
    path: ['confirmPassword'],
  })
  .refine(data => data.currentPassword !== data.newPassword, {
    message: translate('global.messages.validate.newpassword.different'),
    path: ['newPassword'],
  });
