<template>
  <div class="">
    <div class="text-2xl font-semibold text-slate-700">
      {{ editMode ? "Edit Semester" : "New Semester" }}
      <hr class="my-3" />
    </div>
    <div>
      <form ref="class_form" disabled @submit.prevent="saveOption">
        <div class="grid grid-rows-1 gap-4">
          <div>
            <label
              for="last-name"
              class="block text-sm font-medium text-gray-700"
              >{{ "Course Name" }}</label
            >
            <input
              :disabled="processing"
              type="text"
              id="className"
              v-model="form.semesterName"
              class="mt-1 px-3 py-2 border focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm focus:outline-none border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label
              for="last-name"
              class="block text-sm font-medium text-gray-700"
              >{{ "Opening Date" }}</label
            >
            <input
              type="date"
              :disabled="processing"
              id="classDescription"
              rows="3"
              v-model="form.openingDate"
              class="mt-1 px-3 py-2 border focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm focus:outline-none border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label
              for="last-name"
              class="block text-sm font-medium text-gray-700"
              >{{ "Closing Date" }}</label
            >
            <input
              type="date"
              :min="form.openingDate"
              :disabled="processing"
              placeholder="Enter date..."
              id="closingDate"
              v-model="form.closingDate"
              class="mt-1 px-3 py-2 border focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm focus:outline-none border-gray-300 rounded-md"
            />
          </div>
          <div v-if="!addMore" class="justify-content-end">
            <custom-button
              :disabled="processing"
              :text="processing ? 'Saving...' : 'Save Semester'"
              class="ml-auto"
            >
              <template #icon>
                <SaveIcon class="h-6 w-6"></SaveIcon>
              </template>
            </custom-button>
          </div>
        </div>
      </form>
    </div>
    <div v-if="addMore" class="grid grid-rows-1 gap-4 mt-4">
      <div>
        <custom-button
          @click="addAnother"
          text="Add Another Semester"
        ></custom-button>
      </div>
    </div>
  </div>
</template>

<script>
import { SaveIcon } from "@heroicons/vue/solid";
import { useAdminStore } from "../../stores/admin";
import { ref } from 'vue'
export default {
  name: "AddNewSemesterForm",
  props: ["form", "editMode"],
  components: { SaveIcon },
  setup() {
    const semesterStore = useAdminStore();
    const enable = ref(false)
    return {
      semesterStore,
      enable
    };
  },
  data() {
    return {
      processing: false,
      addMore: false,
      enabled: false,
    };
  },
  methods: {
    saveOption() {
      if (this.editMode) {
        this.updateSemester();
      } else {
        this.addSemester();
      }
    },
    addAnother() {
      // this.form.reset()
      this.addMore = false;
      this.$emit("add-another");
    },
    async addSemester() {
      this.processing = true;
      const response = await this.semesterStore.addSemetser(this.form);
      if (response === "success") {
        this.processing = false;
        this.addMore = true;
        this.$emit("edit-mode", true);
        console.log("added");
      }
    },
    async updateSemester() {
      this.processing = true;
      const response = await this.semesterStore.updateSemetser(this.form);
      if (response === "success") {
        this.processing = false;
        this.addMore = true;
        this.$emit("edit-mode", true);
        console.log("added");
      }
    },
    fillForm() {
      if (this.editMode) {
        const data = {
          id: this.semesterStore.semester.id,
          ...this.semesterStore.semester.attributes,
        };
        this.form.fill(data);
      } else {
          this.form.reset()
      }
    },
  },
  mounted() {
      this.fillForm()
  },
};
</script>

<style></style>
