<script setup>
const props = defineProps({
    piece: String,
    black: Boolean,
});
</script>

<template>
  <div :class="{ black }">
    <h3>{{  piece }}</h3>
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
</style>
