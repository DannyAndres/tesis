<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
});
</script>

<template>
  <div>
    <NuxtLayout name="main-container">
      <NuxtLayout name="triple-container">
        <PagesHomeNavbar />
        <main class="lg:col-span-9 xl:col-span-6">
          <ChartsLineChart />
          <ChartsTreeChart />
        </main>
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
