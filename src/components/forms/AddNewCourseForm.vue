<template>
  <div class="">
    <div class="text-2xl font-semibold text-slate-700">
      {{ editMode ? "Edit Course" : "New Course" }}
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
              v-model="form.courseName"
              class="mt-1 px-3 py-2 border focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm focus:outline-none border-gray-300 rounded-md"
            />
          </div>
          <div class="flex gap-2">
    <div><label class="text-sm font-medium text-gray-700">Is Elective?</label></div>
              <Switch
              @click="form.isElective = !form.isElective"
      v-model="form.isElective"
      :class="form.isElective ? 'bg-teal-700' : 'bg-gray-400'"
      class="relative inline-flex flex-shrink-0 h-[28px] w-[70px] border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
    >
      <span class="sr-only">Is Elective?</span>
      <!-- <span class="">Is Elective?</span> -->
      <span
        aria-hidden="true"
        :class="form.isElective ? 'translate-x-10' : 'translate-x-0'"
        class="pointer-events-none inline-block h-[24px] w-[24px] rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200"
      />
    </Switch>
          </div>
          <div>
            <label
              for="last-name"
              class="block text-sm font-medium text-gray-700"
              >{{ "Description" }}</label
            >
            <textarea
              type="textarea"
              :disabled="processing"
              id="classDescription"
              rows="3"
              v-model="form.classDescription"
              class="mt-1 px-3 py-2 border focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm focus:outline-none border-gray-300 rounded-md"
            ></textarea>
          </div>
          <div v-if="!addMore" class="justify-content-end">
            <custom-button
              :disabled="processing"
              :text="processing ? 'Saving...' : 'Save Course'"
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
          text="Add Another Class"
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
  name: "AddNewCourseForm",
  props: ["form", "editMode"],
  components: { SaveIcon },
  setup() {
    const classStore = useAdminStore();
    const enable = ref(false)
    return {
      classStore,
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
        this.updateClass();
      } else {
        this.addClass();
      }
    },
    addAnother() {
      // this.form.reset()
      this.addMore = false;
      this.$emit("add-another");
    },
    async addClass() {
      this.processing = true;
      const response = await this.classStore.addClass(this.form);
      if (response === "success") {
        this.processing = false;
        this.addMore = true;
        this.$emit("edit-mode", true);
        console.log("added");
      }
    },
    async updateClass() {
      this.processing = true;
      const response = await this.classStore.updateClass(this.form);
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
          id: this.classStore.class.id,
          ...this.classStore.class.attributes,
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
