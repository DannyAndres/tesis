<script setup lang="ts">
const { $xlsx } = useNuxtApp();
const xlsx = $xlsx();

const props = defineProps({
  tab: {
    type: String,
    require: true,
  },
});

const data = reactive({
  search: '',
  files: [],
  json: null,
  limit: 10000000,
});

const json = computed(() => {
  if (!data.search || !data.json) {
    return data.json;
  }
  return data.json.filter((item) => {
    return (
      item.AUTOR.toLowerCase().includes(data.search.toLowerCase()) ||
      item['TÍTULO'].toLowerCase().includes(data.search.toLowerCase()) ||
      item.CARRERA.toLowerCase().includes(data.search.toLowerCase()) ||
      item.CORRECTOR.toLowerCase().includes(data.search.toLowerCase()) ||
      item.CORRECTOR_1.toLowerCase().includes(data.search.toLowerCase()) ||
      item['PROFESOR GUIA'].toLowerCase().includes(data.search.toLowerCase())
    );
  });
});

const DocumentFile = ref(null);

const updateFiles = () => {
  if (DocumentFile && DocumentFile.value && DocumentFile.value.files) {
    data.files = DocumentFile.value.files;
  }
};

const processFiles = async () => {
  let file = data.files[0];
  if (file.size < data.limit) {
    let reader = new FileReader();
    reader.onload = async () => {
      // @ts-ignore
      const workbook = xlsx.read(reader.result, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = xlsx.utils.sheet_to_json(worksheet);
      data.json = json;
    };
    reader.readAsArrayBuffer(file);
  }
};
</script>

<template>
  <main v-if="props.tab === 'excel'" class="lg:col-span-9 xl:col-span-6">
    <div class="flex justify-center">
      <div
        class="mb-6 bg-white rounded-md dark:bg-[#18181b] border border-zinc-900/10 dark:border-zinc-50/[0.06] overflow-hidden w-full"
      >
        <div class="m-4">
          <label class="inline-block mb-2 text-gray-500"
            >Sube un archivo excel (xlsx)</label
          >
          <div class="flex items-center justify-center w-full">
            <label
              class="cursor-pointer flex flex-col w-full min-h-32 border-4 border-dashed hover:bg-gray-100 hover:border-gray-300"
            >
              <div
                v-if="data.files.length === 0"
                class="flex flex-col items-center justify-center pt-7"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-12 h-12 text-gray-400 group-hover:text-gray-600"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12l-3-3m0 0l-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                  />
                </svg>
                <p
                  class="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600"
                >
                  Selecciona un archivo excel (xlsx)
                </p>
              </div>
              <div
                v-else
                class="flex flex-col justify-center items-center pt-7"
              >
                <div
                  class="flex flex-row w-full items-center text-2xl font-bold text-gray-400 group-hover:text-gray-600"
                  :class="
                    data.files.length === 0
                      ? 'justify-center'
                      : 'justify-start pl-4'
                  "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-5 h-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
                    />
                  </svg>
                  {{ data.files.length }}
                </div>
                <ol class="list-decimal w-full px-8">
                  <li
                    v-for="(file, fileIndex) in data.files"
                    :key="fileIndex"
                    class="pt-1 text-left text-sm text-gray-400 group-hover:text-gray-600"
                  >
                    {{ file.name }}
                  </li>
                </ol>
              </div>
              <input
                id="filesInput"
                name="files"
                ref="DocumentFile"
                @change="updateFiles"
                type="file"
                accept=".xls, .xlsx, .csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                multiple
                class="opacity-0"
              />
            </label>
          </div>
        </div>
        <div class="flex flex-row justify-end w-full pb-4 px-4">
          <button
            @click="processFiles()"
            class="px-4 py-2 text-white text-sm bg-sky-700 hover:bg-sky-800 rounded-md"
          >
            <span>Procesar</span>
          </button>
        </div>
      </div>
    </div>
    <div class="flex flex-col">
      <div
        class="flex flex-row items-center justify-start text-sm w-full bg-gray-50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-5 h-5 mr-2 font-bold text-gray-400"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
        Buscar
      </div>
      <div
        class="flex flex-row items-center justify-start text-sm pb-3 w-full bg-gray-50"
      >
        <div
          class="flex flex-row items-center justify-between py-3 w-full bg-gray-50"
        >
          <input
            v-model="data.search"
            id="search"
            name="search"
            class="bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 appearance-none rounded-md block w-full px-3 py-2 shadow-sm placeholder-zinc-400 focus:outline-none focus:ring-sky-800 focus:border-sky-800 sm:text-sm"
          />
        </div>
      </div>
      <div
        v-if="json"
        class="flex flex-row items-center justify-start text-sm pb-3 w-full bg-gray-50"
      >
        {{ json.length }} Coincidencias
      </div>
    </div>
    <div class="flex flex-col">
      <div
        class="flex flex-col mb-6 bg-white rounded-md dark:bg-[#18181b] border border-zinc-900/10 dark:border-zinc-50/[0.06] overflow-hidden w-full"
      >
        <div class="flex flex-row px-6 py-3 w-full bg-gray-50">
          <div
            class="w-1/3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Autor
          </div>
          <div
            class="w-1/3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Título
          </div>
          <div
            class="w-1/3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Info
          </div>
        </div>
        <div v-if="data.json" class="w-full">
          <div
            v-for="(item, itemIndex) in json"
            :key="itemIndex"
            class="flex flex-row px-6 py-3 capitalize w-full border-t border-zinc-900/10 dark:border-zinc-50/[0.06]"
          >
            <div
              v-if="
                (!item.AUTOR.toLowerCase().includes(
                  data.search.toLowerCase()
                ) &&
                  data.search !== '') ||
                data.search === ''
              "
              class="w-1/3 text-left text-xs font-medium text-gray-700 pr-4"
            >
              {{ item.AUTOR }}
            </div>
            <div
              v-if="
                item.AUTOR.toLowerCase().includes(data.search.toLowerCase()) &&
                data.search !== ''
              "
              class="w-1/3 text-left text-xs font-medium text-gray-700 pr-4"
            >
              <span>{{
                item.AUTOR.toLowerCase().split(data.search.toLowerCase())[0]
              }}</span>
              <span
                v-for="(word, wordIndex) in item.AUTOR.toLowerCase().split(
                  data.search.toLowerCase()
                ).length - 1"
                :key="wordIndex"
              >
                <span class="bg-yellow-100">
                  {{ data.search.toLowerCase() }}</span
                >
                <span class="lowercase"
                  >{{
                    item.AUTOR.toLowerCase().split(data.search.toLowerCase())[
                      word
                    ]
                  }}
                </span>
              </span>
            </div>
            <div
              v-if="
                (!item['TÍTULO']
                  .toLowerCase()
                  .includes(data.search.toLowerCase()) &&
                  data.search !== '') ||
                data.search === ''
              "
              class="w-1/3 text-left text-xs font-medium text-gray-700 pr-4"
            >
              {{ item['TÍTULO'] }}
            </div>
            <div
              v-if="
                item['TÍTULO']
                  .toLowerCase()
                  .includes(data.search.toLowerCase()) && data.search !== ''
              "
              class="w-1/3 text-left text-xs font-medium text-gray-700 pr-4"
            >
              <span>{{
                item['TÍTULO'].toLowerCase().split(data.search.toLowerCase())[0]
              }}</span>
              <span
                v-for="(word, wordIndex) in item['TÍTULO']
                  .toLowerCase()
                  .split(data.search.toLowerCase()).length - 1"
                :key="wordIndex"
              >
                <span class="bg-yellow-100">
                  {{ data.search.toLowerCase() }}</span
                >
                <span class="lowercase"
                  >{{
                    item['TÍTULO']
                      .toLowerCase()
                      .split(data.search.toLowerCase())[word]
                  }}
                </span>
              </span>
            </div>
            <div
              class="w-1/3 flex flex-col justify-start items-start text-left text-sm font-medium text-gray-700"
            >
              <span class="text-xs text-gray-500">Carrera</span>

              <span
                v-if="
                  (!item.CARRERA.toLowerCase().includes(
                    data.search.toLowerCase()
                  ) &&
                    data.search !== '') ||
                  data.search === ''
                "
              >
                {{ item.CARRERA }}
              </span>
              <span
                v-if="
                  item.CARRERA.toLowerCase().includes(
                    data.search.toLowerCase()
                  ) && data.search !== ''
                "
              >
                <span>{{
                  item.CARRERA.toLowerCase().split(data.search.toLowerCase())[0]
                }}</span>
                <span
                  v-for="(word, wordIndex) in item.CARRERA.toLowerCase().split(
                    data.search.toLowerCase()
                  ).length - 1"
                  :key="wordIndex"
                >
                  <span class="bg-yellow-100">
                    {{ data.search.toLowerCase() }}</span
                  >
                  <span class="lowercase"
                    >{{
                      item.CARRERA.toLowerCase().split(
                        data.search.toLowerCase()
                      )[word]
                    }}
                  </span>
                </span>
              </span>

              <span class="text-xs text-gray-500">Correctores</span>
              <span>
                <span class="text-xs text-gray-500">1)</span>

                <span
                  v-if="
                    (!item.CORRECTOR.toLowerCase().includes(
                      data.search.toLowerCase()
                    ) &&
                      data.search !== '') ||
                    data.search === ''
                  "
                >
                  {{ item.CORRECTOR }}
                </span>
                <span
                  v-if="
                    item.CORRECTOR.toLowerCase().includes(
                      data.search.toLowerCase()
                    ) && data.search !== ''
                  "
                >
                  <span>{{
                    item.CORRECTOR.toLowerCase().split(
                      data.search.toLowerCase()
                    )[0]
                  }}</span>
                  <span
                    v-for="(
                      word, wordIndex
                    ) in item.CORRECTOR.toLowerCase().split(
                      data.search.toLowerCase()
                    ).length - 1"
                    :key="wordIndex"
                  >
                    <span class="bg-yellow-100">
                      {{ data.search.toLowerCase() }}</span
                    >
                    <span class="lowercase"
                      >{{
                        item.CORRECTOR.toLowerCase().split(
                          data.search.toLowerCase()
                        )[word]
                      }}
                    </span>
                  </span>
                </span>
              </span>
              <span>
                <span class="text-xs text-gray-500">2)</span>
                <span
                  v-if="
                    (!item.CORRECTOR_1.toLowerCase().includes(
                      data.search.toLowerCase()
                    ) &&
                      data.search !== '') ||
                    data.search === ''
                  "
                >
                  {{ item.CORRECTOR_1 }}
                </span>
                <span
                  v-if="
                    item.CORRECTOR_1.toLowerCase().includes(
                      data.search.toLowerCase()
                    ) && data.search !== ''
                  "
                >
                  <span>{{
                    item.CORRECTOR_1.toLowerCase().split(
                      data.search.toLowerCase()
                    )[0]
                  }}</span>
                  <span
                    v-for="(
                      word, wordIndex
                    ) in item.CORRECTOR_1.toLowerCase().split(
                      data.search.toLowerCase()
                    ).length - 1"
                    :key="wordIndex"
                  >
                    <span class="bg-yellow-100">
                      {{ data.search.toLowerCase() }}</span
                    >
                    <span class="lowercase"
                      >{{
                        item.CORRECTOR_1.toLowerCase().split(
                          data.search.toLowerCase()
                        )[word]
                      }}
                    </span>
                  </span>
                </span>
              </span>
              <span class="text-xs text-gray-500">Profesor Guia</span>
              <span
                v-if="
                  (!item['PROFESOR GUIA']
                    .toLowerCase()
                    .includes(data.search.toLowerCase()) &&
                    data.search !== '') ||
                  data.search === ''
                "
              >
                {{ item['PROFESOR GUIA'] }}
              </span>
              <span
                v-if="
                  item['PROFESOR GUIA']
                    .toLowerCase()
                    .includes(data.search.toLowerCase()) && data.search !== ''
                "
              >
                <span>{{
                  item['PROFESOR GUIA']
                    .toLowerCase()
                    .split(data.search.toLowerCase())[0]
                }}</span>
                <span
                  v-for="(word, wordIndex) in item['PROFESOR GUIA']
                    .toLowerCase()
                    .split(data.search.toLowerCase()).length - 1"
                  :key="wordIndex"
                >
                  <span class="bg-yellow-100">
                    {{ data.search.toLowerCase() }}</span
                  >
                  <span class="lowercase"
                    >{{
                      item['PROFESOR GUIA']
                        .toLowerCase()
                        .split(data.search.toLowerCase())[word]
                    }}
                  </span>
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
