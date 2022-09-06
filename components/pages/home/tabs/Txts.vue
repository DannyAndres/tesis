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
  files: [],
  filesToText: [],
  progress: 0,
  total: 0,
  acum: 0,
  limit: 10000000,
  modal: {
    status: false,
    title: '',
    description: '',
  },
});

const DocumentFile = ref(null);

const updateFiles = () => {
  if (DocumentFile && DocumentFile.value && DocumentFile.value.files) {
    data.files = DocumentFile.value.files;
  }
};

const searchFile = (index) => {
  if (
    data.filesToText[index] !== 'error' &&
    data.filesToText[index].numPages === data.filesToText[index].array.length
  ) {
    let txt = data.filesToText[index].array.join(' ').toLowerCase();
    if (txt.toLowerCase().includes('resumen')) {
      let array_temp = txt.toLowerCase().split('resumen');
      if (array_temp.length > 1) {
        txt = array_temp[1].toLowerCase().split('palabras claves')[0];
        data.filesToText[index].summary = txt;
      }
    }
  }
};

const readFile = async (fileIndex) => {
  if (fileIndex >= data.files.length) {
    return;
  }
  let file = data.files[fileIndex];
  if (file.size < data.limit) {
    let reader = new FileReader();
    reader.onload = async () => {
      let page = reader.result;
      data.filesToText[fileIndex] = {
        array: [],
        numPages: 1,
        summary: '',
        student: file.name
          .toLowerCase()
          .replace('.txt', '')
          .replace('resumen_', '')
          .replace('_00001', '')
          .split('_')
          .join(' '),
      };
      data.filesToText[fileIndex].array[0] = page;
      data.acum += 1;
      data.progress = Math.floor((data.acum * 100) / data.total);
      if (
        data.filesToText[fileIndex].numPages ===
        data.filesToText[fileIndex].array.length
      ) {
        searchFile(fileIndex);
      }
      readFile(fileIndex + 1);
    };
    reader.readAsText(file);
  } else {
    data.filesToText[fileIndex] = 'error';
  }
};

const processFiles = async () => {
  data.progress = 0;
  data.total = data.files.length;
  data.acum = 0;
  await readFile(0);
};

const fileProgress = (state, total) => {
  let curr = state < 0 ? 0 : state > total ? total : state;
  return Math.floor((curr * 100) / total) + '%';
};

const saveAll = () => {
  data.filesToText.forEach((file) => {
    dataStore.addThesis(file);
  });
  data.modal = {
    status: true,
    title:
      'Se agregarón ó actualizarón ' + data.filesToText.length + ' archivos',
    description: '',
  };
};

const save = (file) => {
  dataStore.addThesis(file);
  data.modal = {
    status: true,
    title: 'Se agregó un archivo',
    description: file.student,
  };
};

const resetModal = () => {
  data.modal = {
    status: false,
    title: '',
    description: '',
  };
};
</script>

<template>
  <main v-if="props.tab === 'txt'" class="lg:col-span-9 xl:col-span-6">
    <Modal
      :trigger="data.modal.status"
      :title="data.modal.title"
      :description="data.modal.description"
      size="md"
      @close="resetModal()"
      @save="resetModal()"
    />
    <div class="flex justify-center">
      <div
        class="mb-6 bg-white rounded-md dark:bg-[#18181b] border border-zinc-900/10 dark:border-zinc-50/[0.06] overflow-hidden w-full"
      >
        <div class="m-4">
          <label class="inline-block mb-2 text-gray-500"
            >Sube un archivo txt</label
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
                  Selecciona un archivo txt
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
                    <span
                      class="inline-flex ml-2 items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                      :class="
                        !data.filesToText[fileIndex]
                          ? 'bg-sky-100 text-sky-500'
                          : data.filesToText[fileIndex] &&
                            data.filesToText[fileIndex] === 'error'
                          ? 'bg-red-100 text-red-500'
                          : data.filesToText[fileIndex] &&
                            data.filesToText[fileIndex] !== 'error' &&
                            data.filesToText.reduce(
                              (prev, curr, index) =>
                                prev +
                                (index <= fileIndex && curr !== 'error'
                                  ? curr.numPages
                                  : 0),
                              0
                            ) > data.acum
                          ? 'bg-sky-100 text-sky-500'
                          : data.filesToText[fileIndex] &&
                            data.filesToText[fileIndex] !== 'error' &&
                            data.filesToText.reduce(
                              (prev, curr, index) =>
                                prev +
                                (index <= fileIndex && curr !== 'error'
                                  ? curr.numPages
                                  : 0),
                              0
                            ) <= data.acum
                          ? 'bg-green-100 text-green-500'
                          : ''
                      "
                    >
                      <svg
                        class="-ml-0.5 mr-1.5 h-2 w-2 text-indigo-400"
                        fill="currentColor"
                        viewBox="0 0 8 8"
                      >
                        <circle cx="4" cy="4" r="3" />
                      </svg>
                      <span v-if="!data.filesToText[fileIndex]"
                        >Listo para procesar</span
                      >
                      <span
                        v-if="
                          data.filesToText[fileIndex] &&
                          data.filesToText[fileIndex] === 'error'
                        "
                        >Archivo demasiado pesado</span
                      >
                      <span
                        v-if="
                          data.filesToText[fileIndex] &&
                          data.filesToText[fileIndex] !== 'error' &&
                          data.filesToText.reduce(
                            (prev, curr, index) =>
                              prev +
                              (index <= fileIndex && curr !== 'error'
                                ? curr.numPages
                                : 0),
                            0
                          ) > data.acum
                        "
                        >Procesando</span
                      >
                      <span
                        v-if="
                          data.filesToText[fileIndex] &&
                          data.filesToText[fileIndex] !== 'error' &&
                          data.filesToText.reduce(
                            (prev, curr, index) =>
                              prev +
                              (index <= fileIndex && curr !== 'error'
                                ? curr.numPages
                                : 0),
                            0
                          ) <= data.acum
                        "
                        >Listo</span
                      >
                      <span
                        class="ml-2"
                        v-if="
                          data.filesToText[fileIndex] &&
                          data.filesToText[fileIndex] !== 'error'
                        "
                        >{{
                          fileProgress(
                            data.acum -
                              data.filesToText.reduce(
                                (prev, curr, index) =>
                                  prev +
                                  (index < fileIndex && curr !== 'error'
                                    ? curr.numPages
                                    : 0),
                                0
                              ),
                            data.filesToText[fileIndex].numPages
                          )
                        }}</span
                      >
                    </span>
                  </li>
                </ol>
              </div>
              <input
                id="filesInput"
                name="files"
                ref="DocumentFile"
                @change="updateFiles"
                type="file"
                accept=".txt"
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
    <div class="flex justify-center">
      <div
        class="mb-6 bg-white rounded-md dark:bg-[#18181b] border border-zinc-900/10 dark:border-zinc-50/[0.06] overflow-hidden w-full"
      >
        <div class="m-4">
          <label
            class="inline-block mb-3 text-gray-500 flex flex-row justify-start items-center"
          >
            <span>Proceso</span>
            <svg
              v-if="data.total !== data.acum"
              class="animate-spin ml-2 h-5 w-5 text-sky-900"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </label>
          <transition
            enter-active-class="duration-300 ease-out"
            enter-from-class="transform opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="duration-200 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="transform opacity-0"
          >
            <div
              v-if="data.progress !== 0"
              class="w-full bg-gray-200 rounded-md mb-4"
            >
              <div
                class="transition-all bg-sky-700 text-xs font-medium text-sky-100 text-center p-0.5 leading-none rounded-md"
                :style="'width: ' + data.progress + '%'"
              >
                {{ data.progress }}%
              </div>
            </div>
          </transition>
          <transition
            enter-active-class="duration-300 ease-out"
            enter-from-class="transform opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="duration-200 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="transform opacity-0"
          >
            <div
              v-if="data.progress !== 0"
              class="flex flex-row justify-end w-full"
            >
              <button
                @click="saveAll()"
                class="px-4 py-2 text-white text-sm bg-sky-700 hover:bg-sky-800 rounded-md"
              >
                <span>Guardar todos</span>
              </button>
            </div>
          </transition>
        </div>
      </div>
    </div>
    <div
      v-if="data.acum === data.total"
      class="flex flex-col justify-center items-center"
    >
      <div
        v-for="(file, fileIndex) in data.filesToText"
        :key="fileIndex"
        class="mb-6 bg-white rounded-md dark:bg-[#18181b] border border-zinc-900/10 dark:border-zinc-50/[0.06] overflow-hidden w-full"
      >
        <div class="m-4">
          <label
            v-if="file !== 'error' && file && file.student"
            class="inline-block mb-2 flex flex-row justify-between items-center font-semibold text-gray-500"
          >
            <span>{{ fileIndex + 1 }}) {{ file.student }}</span>
            <span>
              <span
                class="inline-flex ml-2 items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-sky-100 text-sky-500"
                v-if="
                  data.theses &&
                  data.theses.find((e) => e.student === file.student)
                "
                >Guardado</span
              >
            </span>
          </label>
          <label
            v-if="file === 'error'"
            class="inline-block mb-2 font-semibold text-gray-500"
          >
            {{ fileIndex + 1 }}) Archivo no procesado
          </label>
          <div
            v-if="file !== 'error' && file && file.summary"
            class="flex items-center text-sm justify-left w-full"
          >
            {{ file.summary }}
          </div>
          <div v-if="file !== 'error'" class="flex flex-row justify-end w-full">
            <button
              @click="save(file)"
              type="button"
              class="px-4 py-2 mt-4 text-white text-sm bg-sky-800 hover:bg-sky-900 rounded-md"
            >
              <span
                v-if="
                  !data.theses ||
                  (data.theses &&
                    !data.theses.find((e) => e.student === file.student))
                "
                >Guardar</span
              >
              <span v-else>Actualizar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
