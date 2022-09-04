<script setup lang="ts">
import { useDataStore } from '~/store/data';

const dataStore = useDataStore();

const props = defineProps({
  tab: {
    type: String,
    require: true,
  },
});

const data = reactive({
  theses: computed(() => dataStore.getTheses),
  students: computed(() => dataStore.getStudents),
});

const processed = reactive({
  matches: computed(() => {
    if (!data.theses || !data.students) {
      return null;
    }
    return data.theses.map((thesis) => {
      thesis.match = data.students.find((student) => {
        return similarity(thesis.student, student.AUTOR) > 40;
      });
      return thesis;
    });
  }),
});

const distance = (s1, s2) => {
  s1 = s1.toLowerCase();
  s2 = s2.toLowerCase();

  var costs = new Array();
  for (var i = 0; i <= s1.length; i++) {
    var lastValue = i;
    for (var j = 0; j <= s2.length; j++) {
      if (i == 0) costs[j] = j;
      else {
        if (j > 0) {
          var newValue = costs[j - 1];
          if (s1.charAt(i - 1) != s2.charAt(j - 1))
            newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
          costs[j - 1] = lastValue;
          lastValue = newValue;
        }
      }
    }
    if (i > 0) costs[s2.length] = lastValue;
  }
  return costs[s2.length];
};

const calculate_similarity = (s1, s2) => {
  var longer = s1;
  var shorter = s2;
  if (s1.length < s2.length) {
    longer = s2;
    shorter = s1;
  }
  var longerLength = longer.length;
  if (longerLength === 0) {
    return 1.0;
  }
  return (longerLength - distance(longer, shorter)) / parseFloat(longerLength);
};

const similarity = (s1, s2) => {
  return Math.round(calculate_similarity(s1, s2) * 10000) / 100;
};
</script>

<template>
  <main v-if="props.tab === 'charts'" class="lg:col-span-9 xl:col-span-6">
    <div
      class="mb-6 p-4 flex flex-col justify-start items-start bg-white rounded-md dark:bg-[#18181b] border border-zinc-900/10 dark:border-zinc-50/[0.06] overflow-hidden"
    >
      <h2
        id="trending-heading"
        class="mb-2 text-base font-medium text-gray-900"
      >
        Datos generales
      </h2>
      <span v-if="data.theses"
        >Archivos procesados: <strong>{{ data.theses.length }}</strong></span
      >
      <span v-if="data.theses"
        >Con resumen:
        <strong>{{ data.theses.filter((e) => e.summary).length }}</strong></span
      >
      <span v-if="processed.matches"
        >Académicos encontrados:
        <strong
          >{{ processed.matches.filter((e) => e.match).length }}/{{
            data.students.length
          }}</strong
        ></span
      >
      <pre>
        {{ processed.matches.filter((e) => e.match) }}
      </pre>
    </div>
    <ChartsLineChart />
    <ChartsTreeChart />
  </main>
</template>
