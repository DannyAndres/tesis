import { useForm, useField } from 'vee-validate';

export default defineNuxtPlugin(() => {
  return {
    provide: {
      useForm,
      useField,
    },
  };
});
