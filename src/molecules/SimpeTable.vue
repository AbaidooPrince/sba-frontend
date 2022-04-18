<template>
  <div class="">
    <table class="table table-fixed card w-full">
      <thead class="table-header-group bg-slate-200">
        <tr class="table-row">
          <th
            class="table-cell text-left p-4"
            v-for="(head, h) in headers"
            :key="h + 'head'"
          >
            {{ head.name }}
          </th>
        </tr>
      </thead>
          <tbody v-if="loading">
            <tr  class="lds-facebook mx-auto text-center">
                <td class="flex">
                <div></div>
                <div></div>
                <div></div></td>
            </tr>
          </tbody>
      <tbody v-else class="table-row-group">
        <tr
          class="table-row odd:bg-white even:bg-slate-50 cursor-pointer"
          v-for="(item, i) in items"
          :key="i + 'item'"
        >
          <td
            @click="rowClick(d, item)"
            class="table-cell px-4 py-2 first:hover:text-blue-600"
            v-for="(data, d) in headers"
            :key="d + 'data'"
          >
            <slot v-if="data.value !== 'action'" :name="`item[${data.value}]`">
              {{
                item[`${data.value.split(".")[0]}`][
                  `${data.value.split(".")[1]}`
                ]
              }}
            </slot>
            <div v-else class="text-right">
              <slot name="action"> </slot>
            </div>
          </td>
        </tr>
        <!-- <tr class="table-row odd:bg-white even:bg-slate-50">
          <td class="table-cell p-2">
            The Sliding Mr. Bones (Next Stop, Pottersville)
          </td>
          <td class="table-cell p-2">Malcolm Lockyer</td>
          <td class="table-cell p-2">1961</td>
        </tr> -->
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "SimpleTable",
  props: ["headers", "items", "loading"],
  methods: {
    rowClick(i, data) {
      console.log(data)
      if (i === 0) {
        this.$emit("row-click", data);
      }
    },
  },
};
</script>

<style scoped>
.lds-facebook {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-facebook div {
  margin-left: 20rem;
  /* margin-right: 100%; */
  /* display: inline-block; */
  position: absolute;
  left: 8px;
  width: 16px;
  background: rgb(114, 113, 114);
  animation: lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
}
.lds-facebook div:nth-child(1) {
  left: 8px;
  animation-delay: -0.24s;
}
.lds-facebook div:nth-child(2) {
  left: 32px;
  animation-delay: -0.12s;
}
.lds-facebook div:nth-child(3) {
  left: 56px;
  animation-delay: 0;
}
@keyframes lds-facebook {
  0% {
    top: 8px;
    height: 64px;
  }
  50%,
  100% {
    top: 24px;
    height: 32px;
  }
}
</style>
