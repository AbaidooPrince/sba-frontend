<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <!--
    This example requires updating your template:

    ```
    <html class="h-full bg-gray-100">
    <body class="h-full">
    ```
  -->
  <main>
    <dashboard></dashboard>
  </main>
</template>

<script>
import Dashboard from "../organs/DashboardPage.vue";

export default {
  components: {
    Dashboard,
  },
  setup() {
    return {};
  },
};
</script>
