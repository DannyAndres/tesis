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

          <span class="truncate"> Subir archivos (pdf) </span>
        </button>

        <button
          @click="
            () => {
              emit('tab', 'txt');
            }
          "
          type="button"
          :class="
            props.active === 'txt'
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

          <span class="truncate"> Subir archivos (txt) </span>
        </button>

        <button
          @click="
            () => {
              emit('tab', 'excel');
            }
          "
          type="button"
          :class="
            props.active === 'excel'
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
              d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
            />
          </svg>

          <span class="truncate">Lista de académicos</span>
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

        <button
          @click="
            () => {
              emit('tab', 'excel');
            }
          "
          type="button"
          :class="
            props.active === 'motivation'
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
              d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
            />
          </svg>

          <span class="truncate">Motivación</span>
        </button>

        <button
          @click="
            () => {
              emit('tab', 'excel');
            }
          "
          type="button"
          :class="
            props.active === 'database'
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
              d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
            />
          </svg>

          <span class="truncate">Base de datos</span>
        </button>
      </div>
    </nav>
  </div>
</template>

<style scoped>
.top-header {
  top: calc(2rem + 61px);
}
</style>
