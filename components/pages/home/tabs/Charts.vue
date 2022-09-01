<script setup lang="ts">
const props = defineProps({
  tab: {
    type: String,
    require: true,
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
    <main v-if="props.tab === 'charts'" class="lg:col-span-9 xl:col-span-6">
      <ChartsLineChart />
      <ChartsTreeChart />
    </main>
  </transition>
</template>
