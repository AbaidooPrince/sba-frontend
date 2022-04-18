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
    <manage-item-layout
      ref="manageItemLayout"
      :editModeProp="editMode"
      @panel-close="closePanel"
      :panelOpen="panelOpen"
      @new-item="openNewItem"
      :buttonText="'Add New Class'"
      :data="data"
      :panelComponent="panelComponent"
    >
      <template #table>
        <div class="w-3/4 mx-auto">
          <SimpeTable
            @row-click="editClass"
            :headers="headers"
            :items="allClasses"
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
      </template>
    </manage-item-layout>
  </div>
</template>

<script>
import ManageItemLayout from "../../components/layouts/ManageItemLayout.vue";
import PageHeader from "../../molecules/PageHeader.vue";
import SimpeTable from "../../molecules/SimpeTable.vue";
import { PencilAltIcon, TrashIcon } from "@heroicons/vue/solid";
import { useAdminStore } from "../../stores/admin";
export default {
  name: "ClassManagerView",
  components: {
    ManageItemLayout,
    PageHeader,
    SimpeTable,
    PencilAltIcon,
    TrashIcon,
  },
  setup() {
    const adminStore = useAdminStore();
    const classForms = {
      component: {
        name: "AddNewClassForm",
        props: {
          data: {
            className: "",
            classDescription: "",
          },
        },
      },
    };
    return {
      classForms,
      adminStore,
    };
  },
  data() {
    return {
      editMode: false,
      classForm: {
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
      panelComponent: "",
      data: {},
      panelOpen: false,
      headers: [
        { name: "Class Name", value: "attributes.className" },
        { name: "Class Description", value: "attributes.classDescription" },
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
    };
  },
  methods: {
    editClass(data) {
      this.editMode = true;
      this.panelComponent = this.classForm.component.name;
      this.adminStore.class = data;
      this.panelOpen = true;
    },
    getAllClasses() {
      this.adminStore.getAllClasses();
      this.adminStore.getAllCourses()
    },
    openNewItem() {
      this.editMode = false;
      this.panelComponent = this.classForm.component.name;
      //this.data = this.classForm.component.props.data;
      this.panelOpen = true;
    },
    closePanel() {
      this.panelComponent = null;
      this.data = {};
      this.panelOpen = false;
    },
    openSidePanel() {},
  },
  computed: {
    allClasses() {
      return this.adminStore.allClasses;
    },
  },
  created() {
    this.getAllClasses();
  },
};
</script>
