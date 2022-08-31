import { defineRule } from 'vee-validate';
import { email, required, min, max } from '@vee-validate/rules';

export default defineNuxtPlugin((nuxtApp) => {
  defineRule('email', (value) => {
    if (email(value) && required(value)) {
      return true;
    }

    return 'La dirección de correo electrónico no es válida';
  });

  defineRule('password', (value) => {
    if (
      required(value) &&
      min(value, { length: 6 }) &&
      max(value, { length: 30 })
    ) {
      return true;
    }

    return 'La contraseña debe tener entre 6 y 30 caracteres';
  });

  // @ts-ignore
  defineRule('passwordConfirmation', (value, [target], ctx) => {
    if (required(value) && value === ctx.form[target]) {
      return true;
    }

    return 'Las contraseñas no coinciden';
  });
});
