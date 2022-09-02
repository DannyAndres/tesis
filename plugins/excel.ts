//import { PDFViewer } from 'pdfjs-dist/web/pdf_viewer';
//import 'pdfjs-dist/web/pdf_viewer.css';

import * as xlsx from 'xlsx';

export default defineNuxtPlugin(() => {
  return {
    provide: {
      xlsx: () => xlsx,
    },
  };
});
