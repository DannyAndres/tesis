<script setup lang="ts">
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

const data = reactive({
  mounted: false,
});

onMounted(() => {
  setTimeout(() => {
    data.mounted = true;
  }, 500);
});
</script>

<template>
  <div
    v-if="data.mounted"
    class="mb-6 bg-white rounded-md dark:bg-[#18181b] border border-zinc-900/10 dark:border-zinc-50/[0.06] overflow-hidden"
  >
    <v-chart class="chart" :option="option" />
  </div>
</template>

<style scoped>
.chart {
  height: 500px;
  width: 100%;
}
</style>
