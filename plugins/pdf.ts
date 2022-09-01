//import { PDFViewer } from 'pdfjs-dist/web/pdf_viewer';
//import 'pdfjs-dist/web/pdf_viewer.css';

import * as pdfjslib from 'pdfjs-dist';
// @ts-ignore
const PDFJS = (<any>pdfjslib) as PDFJSStatic;
PDFJS.GlobalWorkerOptions.workerSrc =
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';

export default defineNuxtPlugin(() => {
  return {
    provide: {
      pdfjsLib: () => PDFJS,
    },
  };
});
