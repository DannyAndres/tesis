<script setup lang="ts">
const firebaseUser = useFirebaseUser();
const router = useRouter();

const signOut = async () => {
  const result = await signOutUser();
  router.replace({ path: '/' });
};
</script>

<template>
  <header
    class="backdrop-blur sticky top-0 z-40 w-full flex-none border-b border-zinc-900/10 dark:border-zinc-50/[0.06]"
  >
    <div class="max-w-[90rem] mx-auto">
      <div
        class="py-4 border-b border-zinc-900/10 lg:px-8 lg:border-0 dark:border-zinc-300/10 mx-4 lg:mx-0"
      >
        <div class="relative flex items-center">
          <button
            type="button"
            class="mr-3 flex flex-row w-[2.0625rem] overflow-hidden md:w-auto"
            @click="navigateTo('/')"
          >
            <img
              class="hidden dark:inline text-zinc-900 dark:text-white h-7 w-auto"
              src="~/assets/images/logo.png"
              alt="Tesis"
              data-v-33d85123=""
            />
            <img
              class="dark:hidden text-zinc-900 dark:text-white h-7 w-auto"
              src="~/assets/images/logo.png"
              alt="Tesis"
              data-v-33d85123=""
            />
            <h2
              class="logo-font ml-1 mr-2 text-center text-xl font-extrabold text-zinc-700 dark:text-zinc-100"
            >
              Tesis
            </h2>
          </button>
          <transition
            enter-active-class="duration-300 ease-out"
            enter-from-class="transform opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="duration-200 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="transform opacity-0"
          >
            <div class="relative hidden lg:flex items-center ml-auto">
              <nav
                v-if="!firebaseUser"
                class="text-sm leading-6 font-semibold text-zinc-700 dark:text-zinc-200"
              >
                <ul class="flex space-x-8">
                  <li>
                    <NuxtLink
                      class="hover:text-sky-500 dark:hover:text-sky-400"
                      to="/login"
                    >
                      Entrar
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink
                      class="hover:text-sky-500 dark:hover:text-sky-400"
                      to="/register"
                    >
                      Registrarse
                    </NuxtLink>
                  </li>
                </ul>
              </nav>
              <div
                class="flex items-center border-l border-zinc-200 ml-6 pl-6 dark:border-zinc-800"
              >
                <!-- <a
                  href="https://github.com/dinokeys"
                  class="block text-zinc-400 hover:text-zinc-500 dark:hover:text-zinc-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"
                    />
                    <path
                      d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"
                    />
                  </svg>
                </a>
                <a
                  href="https://github.com/dinokeys"
                  class="ml-6 mr-4 block text-zinc-400 hover:text-zinc-500 dark:hover:text-zinc-300"
                >
                  <img
                    class="h-8 w-8 rounded-full border border-zinc-900/10 dark:border-zinc-50/[0.06]"
                    src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </a> -->
                <transition
                  enter-active-class="duration-300 ease-out"
                  enter-from-class="transform opacity-0"
                  enter-to-class="opacity-100"
                  leave-active-class="duration-200 ease-in"
                  leave-from-class="opacity-100"
                  leave-to-class="transform opacity-0"
                >
                  <button
                    v-if="firebaseUser"
                    type="button"
                    @click.prevent="signOut()"
                    class="block px-2 py-1 rounded-md bg-zinc-200 hover:bg-zinc-300 text-zinc-500 hover:text-zinc-500 dark:hover:text-zinc-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="h-5 w-5"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                      />
                    </svg>
                  </button>
                </transition>
              </div>
            </div>
          </transition>
          <button
            type="button"
            class="ml-auto text-zinc-500 w-8 h-8 -my-1 flex items-center justify-center hover:text-zinc-600 lg:hidden dark:text-zinc-400 dark:hover:text-zinc-300"
          >
            <span class="sr-only">Search</span
            ><svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="m19 19-3.5-3.5"></path>
              <circle cx="11" cy="11" r="6"></circle>
            </svg>
          </button>
          <div class="ml-2 -my-1 lg:hidden">
            <button
              type="button"
              class="text-zinc-500 w-8 h-8 flex items-center justify-center hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300"
            >
              <span class="sr-only">Navigation</span
              ><svg width="24" height="24" fill="none" aria-hidden="true">
                <path
                  d="M12 6v.01M12 12v.01M12 18v.01M12 7a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm0 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm0 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
