<template>
  <!-- header size 1rem = 16px padding top + 1rem = 16px padding bottom + 1px border bottom -->
  <main
    class="min-h-[calc(100vh-60px-1px)] w-full flex flex-column justify-center items-center max-w-[90rem] mx-auto"
  >
    <slot />
  </main>
</template>
