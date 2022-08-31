<script setup lang="ts">
const router = useRouter();

const { $useForm, $useField } = useNuxtApp();

const { meta: formMeta, handleSubmit } = $useForm();

const { value: email, errorMessage: emailError } = $useField('email', 'email');
const { value: password, errorMessage: passwordError } = $useField(
  'password',
  'password'
);
const { value: passwordConfirmation, errorMessage: passwordConfirmationError } =
  $useField('passwordConfirmation', 'passwordConfirmation:password');

const data = reactive({
  showPass: false,
  showConfirmationPass: false,
  remember: false,
  submitted: false,
  error: {
    status: false,
    title: '',
    description: '',
  },
  modal: {
    status: false,
    title: '',
    description: '',
  },
});

const resetModal = () => {
  data.modal = {
    status: false,
    title: '',
    description: '',
  };
};

const submitForm = handleSubmit(async ({ email, password }) => {
  data.submitted = true;
  data.error = {
    status: false,
    title: '',
    description: '',
  };
  const credentials = await createUser(email, password);
  console.log(credentials);
  //router.replace({ path: '/home' });
});
</script>

<template>
  <div>
    <NuxtLayout name="center-container">
      <Modal
        :trigger="data.modal.status"
        size="md"
        @close="resetModal()"
        @save="resetModal()"
      />
      <div class="flex flex-col px-6 md:px-0 justify-center w-full">
        <div class="sm:mx-auto sm:w-full sm:max-w-lg">
          <h2
            class="text-left text-3xl font-extrabold text-zinc-800 dark:text-zinc-100"
          >
            Bienvenido!
          </h2>
          <p class="mt-2 text-left text-md text-zinc-700 dark:text-zinc-500">
            Entra con tu cuenta
          </p>
        </div>

        <transition
          enter-active-class="duration-300 ease-out"
          enter-from-class="transform opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="duration-200 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="transform opacity-0"
        >
          <div
            v-if="data.error.status"
            class="mt-8 bg-sky-100/50 dark:bg-sky-900/40 border border-sky-200 dark:border-sky-900 py-2 px-4 sm:mx-auto sm:w-full sm:max-w-lg"
          >
            <p class="text-left text-md text-sky-900 dark:text-sky-200">
              <strong>{{ data.error.title }}</strong>
            </p>
            <p class="text-left text-sm text-sky-900 dark:text-sky-200">
              {{ data.error.description }}
            </p>
          </div>
        </transition>

        <div class="mt-8 pb-16 sm:mx-auto sm:w-full sm:max-w-lg">
          <div>
            <form class="space-y-6" @submit.prevent="submitForm">
              <div>
                <label
                  for="email"
                  class="block text-sm font-medium text-zinc-700 dark:text-zinc-200"
                >
                  Dirección de correo
                </label>
                <div class="mt-1">
                  <input
                    v-model="email"
                    id="email"
                    name="email"
                    :class="
                      emailError
                        ? 'bg-sky-100 dark:bg-sky-400/40 border border-sky-500 dark:border-sky-500/40'
                        : 'bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700'
                    "
                    class="appearance-none rounded-md block w-full px-3 py-2 shadow-sm placeholder-zinc-400 focus:outline-none focus:ring-sky-800 focus:border-sky-800 sm:text-sm"
                  />
                </div>
                <p
                  v-if="emailError"
                  class="mt-2 text-left text-sm text-sky-800 dark:text-sky-500/60"
                >
                  {{ emailError }}
                </p>
              </div>

              <div>
                <label
                  for="password"
                  class="block text-sm font-medium text-zinc-700 dark:text-zinc-200"
                >
                  Contraseña
                </label>
                <div class="mt-1">
                  <div class="relative w-full">
                    <div
                      class="absolute inset-y-0 right-0 flex items-center px-2"
                    >
                      <input
                        class="hidden"
                        id="toggle"
                        type="checkbox"
                        v-model="data.showPass"
                      />
                      <label
                        class="px-2 py-1 text-sm text-zinc-700 dark:text-zinc-200 font-mono cursor-pointer"
                        for="toggle"
                      >
                        <svg
                          v-if="data.showPass"
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          <path
                            fill-rule="evenodd"
                            d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        <svg
                          v-else
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                            clip-rule="evenodd"
                          />
                          <path
                            d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z"
                          />
                        </svg>
                      </label>
                    </div>
                    <input
                      v-model="password"
                      id="password"
                      name="password"
                      :type="data.showPass ? 'text' : 'password'"
                      :class="
                        passwordError
                          ? 'bg-sky-100 dark:bg-sky-400/40 border border-sky-500 dark:border-sky-500/40'
                          : 'bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700'
                      "
                      class="appearance-none rounded-md block w-full px-3 py-2 shadow-sm placeholder-zinc-400 focus:outline-none focus:ring-sky-800 focus:border-sky-800 sm:text-sm"
                    />
                  </div>
                </div>
                <p
                  v-if="passwordError"
                  class="mt-2 text-left text-sm text-sky-800 dark:text-sky-500/60"
                >
                  {{ passwordError }}
                </p>
              </div>

              <div>
                <label
                  for="password_confirmation"
                  class="block text-sm font-medium text-zinc-700 dark:text-zinc-200"
                >
                  Confirmar Contraseña
                </label>
                <div class="mt-1">
                  <div class="relative w-full">
                    <div
                      class="absolute inset-y-0 right-0 flex items-center px-2"
                    >
                      <input
                        class="hidden"
                        id="toggle_confirm"
                        type="checkbox"
                        v-model="data.showConfirmationPass"
                      />
                      <label
                        class="px-2 py-1 text-sm text-zinc-700 dark:text-zinc-200 font-mono cursor-pointer"
                        for="toggle_confirm"
                      >
                        <svg
                          v-if="data.showConfirmationPass"
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          <path
                            fill-rule="evenodd"
                            d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        <svg
                          v-else
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                            clip-rule="evenodd"
                          />
                          <path
                            d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z"
                          />
                        </svg>
                      </label>
                    </div>
                    <input
                      v-model="passwordConfirmation"
                      id="password_confirmation"
                      name="password_confirmation"
                      :type="data.showConfirmationPass ? 'text' : 'password'"
                      :class="
                        passwordConfirmationError
                          ? 'bg-sky-100 dark:bg-sky-400/40 border border-sky-500 dark:border-sky-500/40'
                          : 'bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700'
                      "
                      class="appearance-none rounded-md block w-full px-3 py-2 shadow-sm placeholder-zinc-400 focus:outline-none focus:ring-sky-800 focus:border-sky-800 sm:text-sm"
                    />
                  </div>
                </div>
                <p
                  v-if="passwordConfirmationError"
                  class="mt-2 text-left text-sm text-sky-800 dark:text-sky-500/60"
                >
                  {{ passwordConfirmationError }}
                </p>
              </div>

              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <div class="inset-y-0 right-0 flex items-center pr-2">
                    <input
                      class="hidden"
                      id="remember"
                      type="checkbox"
                      v-model="data.remember"
                    />
                    <label
                      class="bg-white rounded-md dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 px-1 py-1 text-sm text-zinc-700 dark:text-zinc-200 font-mono cursor-pointer"
                      for="remember"
                    >
                      <svg
                        v-if="data.remember"
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      <div v-else class="bg-transparent h-4 w-4"></div>
                    </label>
                  </div>
                  <label
                    for="remember"
                    class="cursor-pointer block text-sm text-zinc-500 dark:text-zinc-400"
                  >
                    Recuérdame
                  </label>
                </div>
              </div>

              <div>
                <button
                  :disabled="data.submitted || !formMeta.valid"
                  type="submit"
                  class="rounded-md bg-sky-900 hover:bg-sky-800 focus:bg-sky-800 disabled:bg-zinc-300 dark:disabled:bg-zinc-900 disabled:cursor-default w-full flex justify-center py-2 px-4 border border-transparent font-bold shadow-sm text-sm font-medium text-white disabled:text-zinc-400 dark:disabled:text-white focus:outline-none"
                >
                  <span v-if="data.submitted">
                    <svg
                      class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        class="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="4"
                      ></circle>
                      <path
                        class="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  </span>
                  <span v-else>Registrarse</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>
