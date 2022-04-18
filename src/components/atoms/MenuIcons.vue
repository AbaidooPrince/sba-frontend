<template>
  <div>
    <UserAddIcon
      v-if="icon === 'user-add'"
      :class="['w-5 h-5 ml-2 -mr-1', style]"
    ></UserAddIcon>
    <BadgeCheckIcon
      v-if="icon === 'badge-check'"
      :class="['w-5 h-5 ml-2 -mr-1', style]"
    ></BadgeCheckIcon>
  </div>
</template>

<script>
import { UserAddIcon, BadgeCheckIcon } from "@heroicons/vue/solid";
const style = "text-violet-200 hover:text-violet-100";
export default {
  name: "MenuIcons",
  props: ["icon"],
  components: {
    UserAddIcon,
    BadgeCheckIcon,
  },
  setup() {
    return {
      style,
    };
  },
};
</script>

<style></style>
