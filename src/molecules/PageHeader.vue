<template>
  <div>
    <header class="bg-white shadow -z-10">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold text-gray-900">
          {{ title ? title : "Page Title" }}
        </h1>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  name: "PageHeader",
  props: ["title"],
};
</script>

<style></style>
