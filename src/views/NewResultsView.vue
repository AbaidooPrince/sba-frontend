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
      <page-header title="Results Menu"></page-header>
    </div>
    <main>
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <!-- Replace with your content -->
        <div class="px-4 py-6 sm:px-0">
          <div class="md:container mt-auto mx-auto">
            <div class="mx-auto justify-content-start">
              <div class="grid md:grid-cols-2 gap-4">
                <ResultTypeCard
                  v-for="(item, i) in links"
                  :key="i + item.title"
                  :data="item"
                  class="hover:border-2 cursor-pointer border-blue-600 rounded-t-lg rounded-b-lg"
                ></ResultTypeCard>
              </div>
            </div>
          </div>
        </div>
        <!-- /End replace -->
      </div>
    </main>
  </div>
</template>

<script>
// import { BookmarkAltIcon } from "@heroicons/vue/solid";
const links = [
  { title: "Project Work" },
  { title: "Individual Test" },
  { title: "Mid-Term" },
  { title: "Terminal Exams" },
];
import PageHeader from "../molecules/PageHeader.vue";
import ResultTypeCard from "../components/atoms/ResultTypeCard.vue";
export default {
  name: "NewResultsView",
  components: { PageHeader, ResultTypeCard },
  setup() {
    return {
      links,
    };
  },
};
</script>
