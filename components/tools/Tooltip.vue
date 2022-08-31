<script setup lang="ts">
const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
  content: {
    type: String,
    default: '',
  },
});
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
      v-if="props.show"
      role="tooltip"
      class="z-20 -mt-24 w-64 absolute transition duration-150 ease-in-out left-0 shadow-xl border border-zinc-900/10 dark:border-zinc-50/[0.06] bg-white p-4 rounded"
    >
      <p class="text-sm text-left font-bold text-gray-800 pb-1">
        {{ props.title }}
      </p>
      <p class="text-xs text-left leading-4 text-gray-600">
        {{ props.content }}
      </p>
    </div>
  </transition>
</template>
