<template>
  <div class="">
    <div class="text-2xl font-semibold text-slate-700">
      {{ editMode ? "Edit Class" : "New Class" }}
      <hr class="my-3" />
    </div>
    <div>
      <form ref="class_form" disabled @submit.prevent="saveOption">
        <div class="grid grid-rows-1 gap-4">
          <div>
            <label
              for="last-name"
              class="block text-sm font-medium text-gray-700"
              >{{ "Class Name" }}</label
            >
            <input
              :disabled="processing"
              type="text"
              id="className"
              v-model="form.className"
              class="mt-1 px-3 py-2 border focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm focus:outline-none border-gray-300 rounded-md"
            />
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
          <div class="pb-6">
            <Disclosure
              as="div"
              class="border-b border-gray-200"
              v-slot="{ open }"
            >
              <label
                for="last-name"
                class="block text-sm flow-root font-medium text-gray-700"
              >
                <DisclosureButton
                  class="bg-white w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500"
                >
                  <span class="font-medium text-gray-900">
                    {{ "Course(s)" }}
                  </span>
                  <span class="ml-6 flex items-center">
                    <PlusSmIcon
                      v-if="!open"
                      class="h-5 w-5"
                      aria-hidden="true"
                    />
                    <MinusSmIcon v-else class="h-5 w-5" aria-hidden="true" />
                  </span> </DisclosureButton
              ></label>
              <DisclosurePanel class="">
                  <div class="mb-3">
            <input
              type="text"
              id="className"
              placeholder="Search course..."
              v-model="search"
              class="mt-1 py-2 px-3 border focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm focus:outline-none border-gray-300 rounded-md"
            />
                  </div>
                <div class=" grid grid-cols-2 gap-2">
                  <div
                    v-for="(option, optionIdx) in allCourses"
                    :key="option.value"
                    class="flex items-center"
                  >
                    <input
                    @input="checkCourse(option)"
                      :id="`filter-${optionIdx}`"
                      :value="option.id"
                      v-model="form.courses[optionIdx]"
                      type="checkbox"
                      class="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                    />
                    <label
                      :for="`filter-${optionIdx}`"
                      class="ml-3 text-sm text-gray-600"
                    >
                      {{ option.attributes.courseName }}
                    </label>
                  </div>
                </div>
              </DisclosurePanel>
            </Disclosure>
          </div>
          <hr />
          <div v-if="!addMore" class="justify-content-end">
            <custom-button
              :disabled="processing"
              :text="processing ? 'Saving...' : 'Save Class'"
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
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import { MinusSmIcon, PlusSmIcon, SaveIcon } from "@heroicons/vue/solid";
// import {  } from "@heroicons/vue/solid";
import { useAdminStore } from "../../stores/admin";
export default {
  name: "AddNewClassForm",
  props: ["form", "editMode"],
  components: {
    SaveIcon,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    MinusSmIcon,
    PlusSmIcon,
  },
  setup() {
    const classStore = useAdminStore();
    const filters = [
      { value: "white", label: "White  fkcj sdkjsnd skdnckjx", checked: false },
      { value: "beige", label: "Beige", checked: false },
      { value: "blue", label: "Blue", checked: true },
      { value: "brown", label: "Brown", checked: false },
      { value: "green", label: "Green", checked: false },
      { value: "purple", label: "Purple", checked: false },
    ];

    return {
      classStore,
      filters,
    };
  },
  data() {
    return {
      processing: false,
      addMore: false,
    };
  },
  computed: {
    allCourses () {
      return this.classStore.allCourses
    }
  },
  methods: {
      checkCourse(e, data) {
          console.log('checked', e.target.modelValue)
          this.form.courses.push(data.id)
      },
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
        this.form.reset();
      }
    },
  },
  mounted() {
    this.fillForm();
  },
};
</script>

<style></style>
