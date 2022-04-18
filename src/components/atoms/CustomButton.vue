<template>
  <div>
    <button
    :disabled="disabled"
      type="submit"
      class="inline-flex align-middle justify-center py-2 px-4 border border-transparent shadow-sm text-md font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none disabled:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
    <div class="mr-2">
    <slot  name="icon"></slot>
    </div>
    <div>
      {{ text ? text : "" }}
      </div>
    </button>
  </div>
</template>

<script>
export default {
  name: "CustomButton",
  props: ["text", "disabled"],
};
</script>

<style></style>
