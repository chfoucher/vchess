<script setup>
const props = defineProps({
    piece: String,
});
</script>

<template>
  <div>
    <h3>{{  piece }}</h3>
  </div>
</template>

<style scoped>
div {
  width: 60px;
  height: 60px;
  cursor: pointer;
  background-color: white;
}
</style>
