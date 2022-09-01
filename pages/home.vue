<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
});

const data = reactive({
  tab: 'files',
});

const changeTab = (tab) => {
  data.tab = tab;
};
</script>

<template>
  <div>
    <NuxtLayout name="main-container">
      <NuxtLayout name="triple-container">
        <PagesHomeNavbar @tab="changeTab" :active="data.tab" />
        <PagesHomeTabsFiles :tab="data.tab" />
        <PagesHomeTabsCharts :tab="data.tab" />
        <PagesHomeAnnouncements />
      </NuxtLayout>
    </NuxtLayout>
  </div>
</template>

<style scoped>
.chart {
  height: 500px;
  width: 100%;
}
</style>
