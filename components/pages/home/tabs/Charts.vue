<script setup lang="ts">
const props = defineProps({
  tab: {
    type: String,
    require: true,
  },
});
</script>

<template>
  <main v-if="props.tab === 'charts'" class="lg:col-span-9 xl:col-span-6">
    <ChartsLineChart />
    <ChartsTreeChart />
  </main>
</template>
