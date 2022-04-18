import { defineStore } from "pinia";
import api from "../services/api";

export const useAdminStore = defineStore("admin", {
  state: () => ({
    allClasses: [],
    class: {},
    allCourses: [],
    course: {},
    semester: {},
    allSemesters: [],
    pagination: {
      lastPage: 1,
      currentPage: 1,
    },
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
  actions: {
    async getAllClasses() {
      try {
        const response = await api().get("/classes?populate=*");
        if (response.status === 200) {
          this.allClasses = response.data.data;
        }
      } catch (e) {
        console.log(e);
      }
    },
    async addClass(data) {
      try {
        const response = await api().post("/classes", { data: data });
        if (response.status === 200) {
          this.class = response.data.data;
          this.getAllClasses();
          return "success";
        }
      } catch (e) {
        console.log(e.response);
      }
    },
    async updateClass(data) {
      try {
        const response = await api().put(`/classes/${this.class.id}`, {
          data: data,
        });
        if (response.status === 200) {
          this.getAllClasses();
          return "success";
        }
      } catch (e) {
        console.log(e.response);
      }
    },
    async getAllCourses() {
      try {
        const response = await api().get("/courses?populate=*");
        if (response.status === 200) {
          this.allCourses = response.data.data;
          return "success"
        }
      } catch (e) {
        console.log(e);
      }
    },
    async addCourse(data) {
      try {
        const response = await api().post("/courses", { data: data });
        if (response.status === 200) {
          this.course = response.data.data;
          this.getAllClasses();
          return "success";
        }
      } catch (e) {
        console.log(e.response);
      }
    },
    async updateCourse(data) {
      try {
        const response = await api().put(`/courses/${this.course.id}`, {
          data: data,
        });
        if (response.status === 200) {
          this.getAllCourses();
          return "success";
        }
      } catch (e) {
        console.log(e.response);
      }
    },
    async getAllSemesters() {
      try {
        const response = await api().get("/semesters?populate=*");
        if (response.status === 200) {
          this.allSemesters = response.data.data;
          return "success"
        }
      } catch (e) {
        console.log(e);
      }
    },
    async addSemetser(data) {
      try {
        const response = await api().post("/semesters", { data: data });
        if (response.status === 200) {
          this.semester = response.data.data;
          this.getAllSemesters();
          return "success";
        }
      } catch (e) {
        console.log(e.response);
      }
    },
    async updateSemetser(data) {
      try {
        const response = await api().put(`/semesters/${this.semester.id}`, {
          data: data,
        });
        if (response.status === 200) {
          this.getAllSemetsers();
          return "success";
        }
      } catch (e) {
        console.log(e.response);
      }
    },
    increment() {
      this.counter++;
    },
  },
});
