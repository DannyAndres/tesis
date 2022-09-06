<script setup lang="ts">
const props = defineProps({
  data: {
    type: Array,
    require: true,
  },
  year: {
    type: String,
    required: true,
  },
});

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

const processed = reactive({
  data: computed(() => {
    let year = props.year;
    let years_obj = props.data.filter((e) => e['data'].AÑO === year);
    // add year
    let temp_year = {
      name: year,
      collapse: false,
      value: years_obj.length,
      children: [],
    };
    // career separation
    let careers = [];
    years_obj.forEach((e) => {
      if (!careers.includes(e['data'].CARRERA)) {
        careers.push(e['data'].CARRERA);
      }
    });
    careers.sort();
    careers.forEach((career) => {
      // add career
      let career_obj = years_obj.filter((e) => e['data'].CARRERA === career);
      let temp_career = {
        name: career,
        collapse: false,
        value: career_obj.length,
        children: [],
      };
      // student separation
      career_obj.forEach((e) => {
        let temp_student = {
          name: e['data'].AUTOR,
          collapse: false,
          children: [
            {
              name: e['data'].TÍTULO,
              collapse: false,
            },
          ],
        };
        temp_career.children.push(temp_student);
      });
      temp_year.children.push(temp_career);
    });
    return temp_year;
  }),
});

const option = ref({
  tooltip: {
    trigger: 'item',
    triggerOn: 'mousemove',
  },
  series: {
    type: 'tree',
    data: [processed.data],
    left: '2%',
    right: '2%',
    top: '8%',
    bottom: '20%',
    symbol: 'emptyCircle',
    orient: 'vertical',
    expandAndCollapse: true,
    label: {
      position: 'top',
      rotate: -90,
      verticalAlign: 'middle',
      align: 'right',
      fontSize: 9,
    },
    leaves: {
      label: {
        position: 'bottom',
        rotate: -90,
        verticalAlign: 'middle',
        align: 'left',
      },
    },
    animationDurationUpdate: 750,
  },
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
  height: 80vh;
  width: 100%;
}
</style>
