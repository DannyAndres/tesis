import { defineStore } from 'pinia';

export interface Student {
  AUTOR: string;
  TÍTULO: string;
  CARRERA: string;
  CORRECTOR: string;
  CORRECTOR_1: string;
  'PROFESOR GUIA': string;
  AÑO: string;
}

export interface Thesis {
  pages: Array<string>;
  numPages: number;
  summary: string;
  student: string;
}

export interface Students extends Array<any> {
  students: Array<Student>;
}

export interface Theses extends Array<any> {
  theses: Array<Thesis>;
}

export type StudentsOption = Students | null;
export type ThesesOption = Theses | null;

interface DataState {
  students: StudentsOption;
  theses: ThesesOption;
}

const state = (): DataState => ({
  students: null,
  theses: null,
});

const getters = {
  getStudents: (state: DataState) => {
    return state.students;
  },
  getTheses: (state: DataState) => {
    return state.theses;
  },
};

export const useDataStore = defineStore('dataStore', {
  state,
  getters,
  actions: {
    updateStudents(students: Array<Student>) {
      this.students = students;
    },
    updateTheses(theses: Array<Thesis>) {
      this.theses = theses;
    },
    addThesis(thesis: Thesis) {
      // @ts-ignore
      if (thesis !== 'error') {
        if (!this.theses) {
          this.theses = [thesis];
        } else {
          if (this.theses.find((e) => e.student === thesis.student)) {
            this.theses = this.theses.map((e) => {
              if (e.student === thesis.student) {
                e = thesis;
              }
              return e;
            });
          } else {
            this.theses.push(thesis);
          }
        }
      }
    },
  },
});
