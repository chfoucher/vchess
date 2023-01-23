<script setup>
import * as utils from "../utils";
import { computed } from "vue";
const props = defineProps({
  black: Boolean,
  c: Number,
  piece: Object,
  r: Number,
  selected: Boolean,
});
const imgSrc = computed(() => {
  const i = 2 * props.piece.type;
  const j = props.piece.black ? 0 : 1;
  const k = i + j;
  return utils.images[k];
});
const emit = defineEmits(["click"]);

function onClick() {
  console.log("click", props);
  emit("click", { r: props.r, c: props.c });
}
</script>

<template>
  <div :class="{ black, selected }" @click="onClick">
    <img v-if="piece" :src="imgSrc" />
  </div>
</template>

<style scoped>
div {
  width: 60px;
  height: 60px;
  cursor: pointer;
  background-color: #ffce9e;
}

div.black {
  background-color: #d18b47;
}

div.selected {
  background-color: red;
}

img {
  width: 60px;
  height: 60px;
}
</style>
