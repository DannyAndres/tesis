<script setup lang="ts">
const emit = defineEmits(['save', 'close']);

const props = defineProps({
  trigger: {
    type: Boolean,
    require: false,
  },
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: false,
  },
});

const save = () => {
  emit('save');
};

const toggle = () => {
  emit('close');
};
</script>

<template>
  <transition
    enter-active-class="duration-300 ease-out"
    enter-from-class="transform opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="duration-200 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="transform opacity-0"
  >
    <div
      v-if="props.trigger"
      class="fixed z-50 inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>
        <!-- This element is to trick the browser into centering the modal contents. -->
        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
          >&#8203;</span
        >
        <div
          class="inline-block align-bottom bg-white text-left overflow-hidden shadow-xl transform transition-all sm:my-20 sm:align-middle w-full max-w-[90vw] md:max-w-2xl"
        >
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="text-center sm:text-left w-full">
                <h3
                  class="text-lg mb-2 leading-6 font-medium text-left w-full text-gray-900"
                  id="modal-title"
                >
                  {{ props.title }}
                </h3>
                <div v-if="props.description" class="mt-2">
                  <p class="text-sm text-left text-gray-500 mb-2">
                    {{ props.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse items-center"
          >
            <button
              type="button"
              @click="save()"
              class="ml-3 bg-sky-900 hover:bg-sky-800 focus:bg-sky-800 disabled:bg-zinc-300 dark:disabled:bg-zinc-900 disabled:cursor-default flex justify-center py-2 px-4 border border-transparent font-bold shadow-sm text-sm font-medium text-white disabled:text-zinc-400 dark:disabled:text-white focus:outline-none"
            >
              Ok
            </button>
            <button
              type="button"
              @click="toggle()"
              class="mt-3 w-full inline-flex justify-center border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
