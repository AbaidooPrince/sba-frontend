<template>
  <!--
    This example requires updating your template:

    ```
    <html class="h-full bg-gray-100">
    <body class="h-full">
    ```
  -->
  <div>
    <div class="sticky top-14">
      <page-header></page-header>
    </div>
    <main>
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div class="flex gap-4 justify-end">
          <div class="flex-none">
            <custom-button @click="openPanel" text="Add New Course">
              <template #icon>
                <PlusCircleIcon class="h-6 w-6"></PlusCircleIcon>
              </template>
            </custom-button>
          </div>
          <slot name="extraButtons"> </slot>
        </div>

        <!-- // main content  -->
        <div class="mt-8">
          <div class="w-3/4 mx-auto">
            <SimpeTable
              @row-click="editClass"
              :loading="loading"
              :headers="headers"
              :items="allCourses"
            >
              <template #action slot="{ item }">
                <div class="flex justify-end gap-4">
                  {{ item }}
                  <PencilAltIcon class="w-5 h-5"></PencilAltIcon>
                  <TrashIcon class="w-5 fill-red-600 h-5"></TrashIcon>
                </div>
              </template>
            </SimpeTable>
          </div>
        </div>
        <!-- /End replace -->
      </div>
    </main>
    <!-- Replace with your content -->
    <TransitionRoot as="template" :show="open">
      <Dialog
        as="div"
        class="fixed inset-0 overflow-hidden"
        @close="closePanel"
      >
        <div class="absolute inset-0 overflow-hidden">
          <TransitionChild
            as="template"
            enter="ease-in-out duration-500"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="ease-in-out duration-500"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <DialogOverlay
              class="absolute inset-0 bg-gray-500 bg-opacity-20 transition-opacity"
            />
          </TransitionChild>
          <div
            class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10"
          >
            <TransitionChild
              as="template"
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enter-from="translate-x-full"
              enter-to="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leave-from="translate-x-0"
              leave-to="translate-x-full"
            >
              <div class="pointer-events-auto relative w-screen max-w-md">
                <TransitionChild
                  as="template"
                  enter="ease-in-out duration-500"
                  enter-from="opacity-0"
                  enter-to="opacity-100"
                  leave="ease-in-out duration-500"
                  leave-from="opacity-100"
                  leave-to="opacity-0"
                >
                  <div
                    class="absolute top-14 left-0 -ml-8 flex pt-4 pr-2 sm:-ml-10 sm:pr-4"
                  >
                    <button
                      type="button"
                      class="rounded-md text-gray-800 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-slate-800"
                      @click="closePanel"
                    >
                      <span class="sr-only">Close panel</span>
                      <XIcon class="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </TransitionChild>
                <div
                  class="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl"
                >
                  <div class="px-4 sm:px-6">
                    <DialogTitle class="text-lg font-medium text-gray-900">
                      Panel title
                    </DialogTitle>
                  </div>
                  <div class="relative mt-6 flex-1 px-4 sm:px-6">
                    <!-- Replace with your content -->
                    <div class="absolute inset-0 px-4 sm:px-6">
                      <!-- <component
                        :is="panelComponent"
                        :editMode="editMode"
                        :form="courseForm"
                      /> --> 
                      <add-new-class-form
                          @edit-mode="switchMode"
                          @add-another="addAnother"
                          :editMode="editMode"
                          :form="courseForm"
                        ></add-new-class-form>
                      <div v-if="panelComponent === 'AddNewClassForm'">
                        <!-- <add-new-class-form
                          @edit-mode="switchMode"
                          @add-another="addAnother"
                          :editMode="editMode"
                          :form="classForm"
                        ></add-new-class-form> -->
                      </div>
                    </div>
                    <!-- /End replace -->
                  </div>
                </div>
              </div>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script>
import {
  Dialog,
  DialogOverlay,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import {
  XIcon,
  PlusCircleIcon,
  TrashIcon,
  PencilAltIcon,
} from "@heroicons/vue/solid";
import AddNewClassForm from "../../components/forms/AddNewCourseForm.vue";
import SimpeTable from "../../molecules/SimpeTable.vue";
import PageHeader from "../../molecules/PageHeader.vue";
import { useAdminStore } from "../../stores/admin";
// import SimpeTable from "../../molecules/SimpeTable.vue";
export default {
  name: "CourseManagerView",
  props: ["buttonText", "editModeProp"],
  components: {
    Dialog,
    DialogOverlay,
    DialogTitle,
    TrashIcon,
    PencilAltIcon,
    TransitionChild,
    TransitionRoot,
    XIcon,
    PlusCircleIcon,
    AddNewClassForm,
    // AddNewCourseForm: () => import("../../components/forms/AddNewCourseForm.vue"),
    SimpeTable,
    PageHeader,
  },
  data() {
    return {
      loading: false,
      editMode: false,
      open: false,
      panelOpen: false,
      panelComponent: "",
      data: {},
      classFormj: {
        component: {
          name: "AddNewClassForm",
          props: {
            data: {
              className: "",
              classDescription: "",
            },
          },
        },
      },
      headers: [
        { name: "Course Name", value: "attributes.courseName" },
        { name: "Course Description", value: "attributes.classDescription" },
        { name: "", value: "action" },
      ],
      classes: [
        {
          id: "1",
          attributes: {
            className: "Class Two",
            classDescription: "Colling you",
          },
        },
        {
          id: "2",
          attributes: {
            className: "Class Three",
            classDescription: "Colling you",
          },
        },
        {
          id: "3",
          attributes: {
            className: "Class One",
            classDescription: "Colling you",
          },
        },
      ],
      // eslint-disable-next-line no-undef
      courseForm: new Form({
        courseName: "",
        isElective: false,
        classDescription: "",
      }),
    };
  },
  setup() {
    const adminStore = useAdminStore();
    return {
      adminStore,
    };
  },
  watch: {
    editModeProp: {
      handler(newValue) {
        this.switchMode(newValue);
      },
    },
  },
  methods: {
    editClass(data) {
      this.editMode = true;
      this.panelComponent = this.classForm.component.name;
      this.adminStore.class = data;
      this.panelOpen = true;
    },
    async getAllCourses() {
      this.loading = true;
      const response = await this.adminStore.getAllCourses();
      if (response === "success") {
        this.loading = false;
      }
    },
    openNewItem() {
      this.editMode = false;
      this.panelComponent = "AddNewCourseForm";
      this.data = this.courseForm;
      //   {
      // form: this.classForm,
      //   };
      this.open = true;
    },
    closePanel() {
      this.panelComponent = null;
      this.data = {};
      this.open = false;
    },
    openSidePanel() {},
    switchMode(mode) {
      this.editMode = mode;
    },
    addAnother() {
      this.editMode = false;
      this.classForm.reset();
    },
    openPanel() {
      //   this.$emit("new-item");
      this.open = true;
    },
  },
  computed: {
    allCourses() {
      return this.adminStore.allCourses;
    },
  },
  created() {
    this.getAllCourses();
  },
};
</script>

<style></style>
