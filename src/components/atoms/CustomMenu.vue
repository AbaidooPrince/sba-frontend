<template>
  <div class="">
    <Menu as="div" class="relative mt-auto mb-auto inline-block text-left">
      <div>
        <MenuButton
          :class="[
            menuStyle,
            'inline-flex justify-center w-full px-4 py-2 text-sm font-medium rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75',
          ]"
        >
          <PlusIcon class="h-5 mr-1"></PlusIcon>
          {{ name ? name : "Menu" }}
        </MenuButton>
      </div>

      <transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <MenuItems
          :class="[
            `${width ? width : 'w-52'}`,
            'absolute right-0 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none',
          ]"
        >
          <div class="px-1 py-1">
            <MenuItem
              @click="itemAction(item)"
              v-for="(item, i) in items"
              :key="i + item.name"
              v-slot="{ active }"
            >
              <button
                :class="[
                  active ? 'bg-violet-500 text-white' : 'text-gray-900',
                  'group flex rounded-md items-center w-full px-2 py-2 text-sm',
                ]"
              >
                <menu-icons
                  :icon="item.icon"
                  :class="[item.icon ? 'mr-2' : '']"
                ></menu-icons>
                {{ item.name }}
              </button>
            </MenuItem>
          </div>
        </MenuItems>
      </transition>
    </Menu>
  </div>
</template>

<script>
import { PlusIcon } from "@heroicons/vue/solid";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import MenuIcons from "./MenuIcons.vue";
export default {
  props: ["name", "items", "width", "menuStyle"],
  components: {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    MenuIcons,
    PlusIcon,
  },
  methods: {
    itemAction(item) {
      switch (item.type) {
        case "link":
          if (item.routeName) {
            this.$router.push({ name: `${item.routeName}` });
          }
          break;
        case "button":
          this.$emit(`${item.eventName}`);
          break;
        default:
          break;
      }
    },
  },
};
</script>
