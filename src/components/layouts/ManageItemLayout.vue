<template>
  <!--
    This example requires updating your template:

    ```
    <html class="h-full bg-gray-100">
    <body class="h-full">
    ```
  -->
  <div>
    <main>
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div class="flex gap-4 justify-end">
          <div class="flex-none">
            <custom-button
              @click="openPanel"
              :text="buttonText ? buttonText : 'Add'"
            >
              <template #icon>
                <PlusCircleIcon class="h-6 w-6"></PlusCircleIcon>
              </template>
            </custom-button>
          </div>
          <slot name="extraButtons"> </slot>
        </div>

        <!-- // main content  -->
        <div class="mt-8">
          <slot name="table"></slot>
        </div>
        <!-- /End replace -->
      </div>
    </main>
    <!-- Replace with your content -->
    <TransitionRoot as="template" :show="open || panelOpen">
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
                      <div v-if="panelComponent === 'AddNewClassForm'">
                        <add-new-class-form
                          @edit-mode="switchMode"
                          @add-another="addAnother"
                          :editMode="editMode"
                          :form="classForm"
                        ></add-new-class-form>
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
import { XIcon, PlusCircleIcon } from "@heroicons/vue/outline";
import AddNewClassForm from "../forms/AddNewClassForm.vue";
// import SimpeTable from "../../molecules/SimpeTable.vue";
export default {
  name: "ManageItemLayout",
  props: ["panelComponent", "data", "buttonText", "panelOpen", "editModeProp"],
  components: {
    Dialog,
    DialogOverlay,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
    XIcon,
    PlusCircleIcon,
    AddNewClassForm,
  },
  data() {
    return {
      editMode: false,
      open: false,
      // eslint-disable-next-line no-undef
      classForm: new Form({
        className: "",
        classDescription: "",
        courses: [],
      }),
    };
  },
  setup() {
    const opens = false;
    return {
      opens,
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
    switchMode(mode) {
      this.editMode = mode;
    },
    addAnother() {
      this.editMode = false;
      this.classForm.reset();
    },
    openPanel() {
      this.$emit("new-item");
      this.open = true;
    },
    closePanel() {
      this.$emit("panel-close");
      this.open = false;
    },
  },
};
</script>
