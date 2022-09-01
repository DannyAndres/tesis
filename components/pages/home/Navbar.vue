<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
});

const props = defineProps({
  active: {
    type: String,
    require: true,
  },
});

const emit = defineEmits(['tab']);
</script>

<template>
  <div class="hidden lg:block lg:col-span-3 xl:col-span-2">
    <nav
      aria-label="Sidebar"
      class="sticky top-header divide-y divide-gray-300"
    >
      <div class="pb-8 space-y-1">
        <!-- Current: "bg-gray-200 text-gray-900", Default: "text-gray-600 hover:bg-gray-50" -->
        <button
          @click="
            () => {
              emit('tab', 'files');
            }
          "
          type="button"
          :class="
            props.active === 'files'
              ? 'w-full bg-gray-200 dark:bg-red-900 text-gray-900 dark:text-white group flex items-center px-3 py-2 text-sm font-medium rounded-md'
              : 'w-full text-gray-600 hover:bg-gray-50 group flex items-center px-3 py-2 text-sm font-medium rounded-md'
          "
          aria-current="page"
        >
          <!-- Heroicon name: outline/home -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="text-gray-500 dark:text-zinc-900 flex-shrink-0 -ml-1 mr-3 h-6 w-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12l-3-3m0 0l-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
            />
          </svg>

          <span class="truncate"> Subir archivo </span>
        </button>

        <button
          @click="
            () => {
              emit('tab', 'charts');
            }
          "
          type="button"
          :class="
            props.active === 'charts'
              ? 'w-full bg-gray-200 dark:bg-red-900 text-gray-900 dark:text-white group flex items-center px-3 py-2 text-sm font-medium rounded-md'
              : 'w-full text-gray-600 hover:bg-gray-50 group flex items-center px-3 py-2 text-sm font-medium rounded-md'
          "
          aria-current="page"
        >
          <!-- Heroicon name: outline/home -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="text-gray-500 dark:text-zinc-900 flex-shrink-0 -ml-1 mr-3 h-6 w-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
            />
          </svg>

          <span class="truncate"> Gráficos </span>
        </button>
      </div>
      <div class="pt-10">
        <p
          class="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider"
          id="communities-headline"
        >
          My communities
        </p>
        <div class="mt-3 space-y-2" aria-labelledby="communities-headline">
          <a
            href="#"
            class="group flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50"
          >
            <span class="truncate"> Movies </span>
          </a>

          <a
            href="#"
            class="group flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50"
          >
            <span class="truncate"> Food </span>
          </a>

          <a
            href="#"
            class="group flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50"
          >
            <span class="truncate"> Sports </span>
          </a>

          <a
            href="#"
            class="group flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50"
          >
            <span class="truncate"> Animals </span>
          </a>

          <a
            href="#"
            class="group flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50"
          >
            <span class="truncate"> Science </span>
          </a>

          <a
            href="#"
            class="group flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50"
          >
            <span class="truncate"> Dinosaurs </span>
          </a>

          <a
            href="#"
            class="group flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50"
          >
            <span class="truncate"> Talents </span>
          </a>

          <a
            href="#"
            class="group flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50"
          >
            <span class="truncate"> Gaming </span>
          </a>
        </div>
      </div>
    </nav>
  </div>
</template>

<style scoped>
.top-header {
  top: calc(2rem + 61px);
}
</style>
