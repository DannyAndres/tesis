<script setup lang="ts">
import TreeChart from '~~/components/charts/TreeChart.vue';
const option = ref({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985',
      },
    },
  },
  grid: {
    left: '-1%',
    right: '0%',
    bottom: '0%',
    top: '-1%',
    containLabel: false,
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      axisTick: {
        inside: true,
      },
      splitLine: {
        show: true,
      },
      axisLabel: {
        inside: true,
        formatter: '{value}\n',
        interval: 0,
        rotate: 90,
      },
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
  ],
  yAxis: [
    {
      type: 'value',
      axisTick: {
        inside: true,
      },
      splitLine: {
        show: true,
      },
      axisLabel: {
        inside: true,
        formatter: ' {value}\n',
      },
    },
  ],
  series: [
    {
      name: 'Line 1',
      type: 'line',
      stack: 'Total',
      smooth: true,
      lineStyle: {
        width: 1,
        color: '#0f172a50',
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        color: '#0f172a50',
      },
      emphasis: {
        focus: 'series',
      },
      data: [140, 232, 101, 264, 90, 340, 250],
    },
  ],
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
