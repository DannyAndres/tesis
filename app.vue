<style>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700&display=swap');
.logo-font,
body {
  font-family: 'Nunito', sans-serif;
}
</style>

<template>
  <client-only>
    <NuxtLayout name="app-container">
      <AppHeader />
      <NuxtPage />
    </NuxtLayout>
    <!-- loading indicator, rendered on server-side -->
    <template #placeholder>
      <div
        class="min-h-screen relative w-full antialiased text-zinc-500 dark:text-zinc-400 bg-zinc-50 dark:bg-black/95 flex flex-col justify-center items-center"
      >
        <div class="mr-3 flex flex-row w-[2.0625rem] overflow-hidden md:w-auto">
          <img
            class="text-zinc-900 h-14 w-auto"
            src="~/assets/images/logo.png"
            alt="Tesis"
            data-v-33d85123=""
          />
          <h2
            class="logo-font ml-1 mr-2 text-center text-5xl font-extrabold text-zinc-700 dark:text-zinc-100"
          >
            Tesis
          </h2>
        </div>
        <svg
          class="animate-spin -ml-1 mr-3 h-8 w-8 mt-5 text-zinc-700 dark:text-zinc-100"
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
      </div>
    </template>
  </client-only>
</template>
