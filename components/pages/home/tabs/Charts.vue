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
    let output = [];
    let accept = 90;
    data.theses.forEach((thesis) => {
      if (
        data.students.find((student) => {
          return similarity(thesis.student, student.AUTOR) > accept;
        })
      ) {
        let temp = thesis;
        temp.data = data.students.find((student) => {
          return similarity(thesis.student, student.AUTOR) > accept;
        });
        output.push(temp);
      }
    });
    return output;
  }),
  years: computed(() => {
    // year separation
    let years = [];
    processed.matches.forEach((e) => {
      if (!years.includes(e['data'].AÑO)) {
        years.push(e['data'].AÑO);
      }
    });
    years.sort();
    return years;
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
      class="mb-6 p-4 flex flex-row justify-between items-start bg-white rounded-md dark:bg-[#18181b] border border-zinc-900/10 dark:border-zinc-50/[0.06] overflow-hidden"
    >
      <div class="flex flex-col justify-start items-start">
        <h2 id="trending-heading" class="text-base font-medium text-gray-900">
          Datos generales
        </h2>
        <span class="mt-2" v-if="data.theses"
          >Archivos procesados:
          <strong
            >{{ data.theses.filter((e) => e.summary).length }}/{{
              data.theses.length
            }}</strong
          ></span
        >
        <span v-if="processed.matches"
          >Académicos encontrados:
          <strong
            >{{ processed.matches.length }}/{{ data.students.length }}</strong
          ></span
        >
      </div>
      <div class="w-2/6 flex flex-col justify-center items-center">
        <div
          v-if="data.theses && processed.matches && data.students"
          class="w-full flex flex-col justify-between items-center"
        >
          <div class="w-full bg-gray-200 rounded-md mb-2">
            <div
              class="transition-all text-xs font-medium text-sky-100 text-center p-0.5 leading-none rounded-md"
              :style="
                'width: ' +
                Math.floor(
                  (data.theses.filter((e) => e.summary).length * 100) /
                    data.theses.length
                ) +
                '%'
              "
              :class="
                Math.floor(
                  (data.theses.filter((e) => e.summary).length * 100) /
                    data.theses.length
                ) >= 90
                  ? 'bg-green-500 text-green-100'
                  : Math.floor(
                      (data.theses.filter((e) => e.summary).length * 100) /
                        data.theses.length
                    ) >= 50
                  ? 'bg-sky-700 text-sky-100'
                  : 'bg-red-500 text-red-100'
              "
            >
              {{
                Math.floor(
                  (data.theses.filter((e) => e.summary).length * 100) /
                    data.theses.length
                )
              }}%
            </div>
          </div>
          <div class="w-full bg-gray-200 rounded-md mb-2">
            <div
              class="transition-all text-xs font-medium text-center p-0.5 leading-none rounded-md"
              :style="
                'width: ' +
                Math.floor(
                  (processed.matches.length * 100) / data.students.length
                ) +
                '%'
              "
              :class="
                Math.floor(
                  (processed.matches.length * 100) / data.students.length
                ) >= 90
                  ? 'bg-green-500 text-green-100'
                  : Math.floor(
                      (processed.matches.length * 100) / data.students.length
                    ) >= 50
                  ? 'bg-sky-700 text-sky-100'
                  : 'bg-red-500 text-red-100'
              "
            >
              {{
                Math.floor(
                  (processed.matches.length * 100) / data.students.length
                )
              }}%
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="processed.years && processed.matches">
      <div v-for="(year, yearIndex) in processed.years" :key="yearIndex">
        <span>{{ year }}</span>
        <ChartsTreeChart :year="year" :data="processed.matches" />
      </div>
    </div>
  </main>
</template>
