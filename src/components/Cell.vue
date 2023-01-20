<script setup>
import * as utils from "../utils";
import { computed } from 'vue';
const props = defineProps({
    piece: Object,
    black: Boolean,
});
const imgSrc = computed(() => {
  const i = (2 * (props.piece.type));
  const j = props.piece.black?1:0;
  const k = i + j;
  return utils.images[k];
});

</script>

<template>
  <div :class="{ black }">
    <img v-if="piece" :src="imgSrc"/>
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

img {
  width: 60px;
  height: 60px;
}
</style>
