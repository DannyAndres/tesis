<script setup lang="ts">
const firebaseUser = useFirebaseUser();

const tooltips = reactive({
  documents: false,
  teachers: false,
  students: false,
});
</script>

<template>
  <aside class="hidden xl:block xl:col-span-4">
    <div class="sticky top-header space-y-4">
      <section v-if="firebaseUser" aria-labelledby="who-to-follow-heading">
        <div
          class="bg-white rounded-md dark:bg-zinc-900 border border-zinc-900/10 dark:border-zinc-50/[0.06]"
        >
          <div class="p-6">
            <h2
              id="who-to-follow-heading"
              class="text-base font-medium text-gray-900"
            >
              Datos del usuario
            </h2>
            <div class="w-full">
              <pre class="text-xs">
                <code>{{{
                    id: firebaseUser.uid,
                    email: firebaseUser.email,
                    token: firebaseUser.stsTokenManager.accessToken
                  } }}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </section>
      <section aria-labelledby="trending-heading">
        <div
          class="bg-white rounded-md dark:bg-zinc-900 border border-zinc-900/10 dark:border-zinc-50/[0.06]"
        >
          <div class="p-6">
            <h2
              id="trending-heading"
              class="text-base font-medium text-gray-900"
            >
              Archivos
            </h2>
            <div class="flex flex-row justify-start items-center">
              <div class="mt-2 mr-4 flex">
                <span class="inline-flex items-center text-sm">
                  <button
                    @mouseover="
                      () => {
                        tooltips.documents = true;
                      }
                    "
                    @mouseout="
                      () => {
                        tooltips.documents = false;
                      }
                    "
                    type="button"
                    class="relative inline-flex space-x-2 text-gray-400 hover:text-gray-500"
                  >
                    <!-- Heroicon name: solid/chat-alt -->
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

                    <span class="font-medium text-gray-900">291</span>
                    <div>
                      <ToolsTooltip
                        :show="tooltips.documents"
                        :title="'Documentos'"
                        :content="'Número de documentos guardados en la plataforma.'"
                      />
                    </div>
                  </button>
                </span>
              </div>
              <div class="mt-2 mr-4 flex">
                <span class="inline-flex items-center text-sm">
                  <button
                    @mouseover="
                      () => {
                        tooltips.teachers = true;
                      }
                    "
                    @mouseout="
                      () => {
                        tooltips.teachers = false;
                      }
                    "
                    type="button"
                    class="relative inline-flex space-x-2 text-gray-400 hover:text-gray-500"
                  >
                    <!-- Heroicon name: solid/chat-alt -->
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
                        d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
                      />
                    </svg>
                    <span class="font-medium text-gray-900">10</span>
                    <div>
                      <ToolsTooltip
                        :show="tooltips.teachers"
                        :title="'Académicos'"
                        :content="'Número de académicos guía.'"
                      />
                    </div>
                  </button>
                </span>
              </div>
              <div class="mt-2 mr-4 flex">
                <span class="inline-flex items-center text-sm">
                  <button
                    @mouseover="
                      () => {
                        tooltips.students = true;
                      }
                    "
                    @mouseout="
                      () => {
                        tooltips.students = false;
                      }
                    "
                    type="button"
                    class="relative inline-flex space-x-2 text-gray-400 hover:text-gray-500"
                  >
                    <!-- Heroicon name: solid/chat-alt -->
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
                        d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                      />
                    </svg>

                    <span class="font-medium text-gray-900">50</span>
                    <div>
                      <ToolsTooltip
                        :show="tooltips.students"
                        :title="'Estudiantes'"
                        :content="'Número de estudiantes que emitieron documentos.'"
                      />
                    </div>
                  </button>
                </span>
              </div>
            </div>
            <div class="mt-3 flow-root">
              <ul role="list" class="-my-4 divide-y divide-gray-200">
                <li class="flex py-4 space-x-3">
                  <div class="flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-8 h-8"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                      />
                    </svg>
                  </div>
                  <div class="min-w-0 flex-1">
                    <p class="text-xs text-gray-700 font-bold">
                      Último documento
                    </p>
                    <p class="text-sm text-gray-800">
                      Sistema para monitorear la práctica de programación en
                      Python que realizan los estudiantes fuera del horario de
                      clases
                    </p>
                  </div>
                </li>

                <!-- More posts... -->
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  </aside>
</template>

<style scoped>
.top-header {
  top: calc(2rem + 61px);
}
pre,
code {
  font-family: Consolas, 'Andale Mono WT', 'Andale Mono', 'Lucida Console',
    'Lucida Sans Typewriter', 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono',
    'Liberation Mono', 'Nimbus Mono L', Monaco, 'Courier New', Courier,
    monospace;
  white-space: pre-wrap; /* Since CSS 2.1 */
  white-space: -moz-pre-wrap; /* Mozilla, since 1999 */
  white-space: -pre-wrap; /* Opera 4-6 */
  white-space: -o-pre-wrap; /* Opera 7 */
  word-wrap: break-word; /* Internet Explorer 5.5+ */
}
</style>
