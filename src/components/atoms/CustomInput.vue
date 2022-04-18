<template>
  <div>
    <label for="last-name" class="block text-sm font-medium text-gray-700">{{
      label ? label : ""
    }}</label>
    <input
      :type="type ? type : 'text'"
      :name="name ? name : ''"
      :id="id ? id : ''"
      v-model="model"
      class="mt-1 px-3 py-2 border focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm focus:outline-none border-gray-300 rounded-md"
    />
  </div>
</template>
<script>
export default {
  name: "CustomInput",
  props: ["label", "palceholder", "name", "type", "id", "model"],
  setup() {},
};
</script>
