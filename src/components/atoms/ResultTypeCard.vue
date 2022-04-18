<template>
  <div>
    <router-link :to="{ name: `${data.routeName ? data.routeName : 'home'}` }">
      <div class="grid card grid-rows-3 grid-flow-col gap-4">
        <div class="row-span-3">
          <BookmarkAltIcon class="h-30 w-30 mx-auto"></BookmarkAltIcon>
        </div>
        <div class="col-span-2 font-bold">
          {{ data ? data.title : "Title" }}
        </div>
        <div class="row-span-2 col-span-2">
          {{ data ? data.description : "Description..." }}
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import { BookmarkAltIcon } from "@heroicons/vue/solid";
export default {
  name: "ResultTypeCard",
  props: ["data"],
  components: { BookmarkAltIcon },
};
</script>

<style></style>
