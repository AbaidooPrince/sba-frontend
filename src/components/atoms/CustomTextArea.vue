<template>
  <div>
    <label for="last-name" class="block text-sm font-medium text-gray-700">{{
      label ? label : ""
    }}</label>
    <textarea
      type="textarea"
      :name="name ? name : ''"
      :id="id ? id : ''"
      :rows="rows"
      v-model="model"
      class="mt-1 px-3 py-2 border focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm focus:outline-none border-gray-300 rounded-md"
    ></textarea>
  </div>
</template>
<script>
export default {
  name: "CustomTextArea",
  props: ["label", "palceholder", "name", "type", "id", "model", "rows"],
  setup() {},
};
</script>
