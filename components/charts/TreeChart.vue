<script setup lang="ts">
const json = reactive({
  name: 'json',
  collapse: true,
  value: 10,
  children: [
    {
      name: 'teacher 1',
      value: 1,
      collapse: true,
    },
    {
      name: 'teacher 2',
      value: 2,
    },
  ],
});

const option = ref({
  tooltip: {
    trigger: 'item',
    triggerOn: 'mousemove',
  },
  series: [
    {
      type: 'tree',
      data: [json],
      top: '1%',
      left: '7%',
      bottom: '1%',
      right: '20%',
      symbolSize: 7,
      label: {
        position: 'left',
        verticalAlign: 'middle',
        align: 'right',
        fontSize: 9,
      },
      leaves: {
        label: {
          position: 'right',
          verticalAlign: 'middle',
          align: 'left',
        },
      },
      emphasis: {
        focus: 'descendant',
      },
      expandAndCollapse: true,
      animationDuration: 550,
      animationDurationUpdate: 750,
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
