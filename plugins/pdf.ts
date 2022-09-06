//import { PDFViewer } from 'pdfjs-dist/web/pdf_viewer';
//import 'pdfjs-dist/web/pdf_viewer.css';

import * as pdfjslib from 'pdfjs-dist';
// @ts-ignore
const PDFJS = (<any>pdfjslib) as PDFJSStatic;
if (PDFJS.GlobalWorkerOptions) {
  PDFJS.GlobalWorkerOptions.workerSrc =
    'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';
  PDFJS.disableTextLayer = true;
  PDFJS.disableWorker = true;
  PDFJS.disableFontFace = true;
  PDFJS.renderInteractiveForms = true;
}

export default defineNuxtPlugin(() => {
  return {
    provide: {
      pdfjsLib: () => PDFJS,
    },
  };
});
