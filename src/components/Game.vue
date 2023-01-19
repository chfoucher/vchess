<script setup>
import { reactive } from "vue";
import Cell from "./Cell.vue";

const state = reactive({
  board: "Reine",
});

</script>

<template>
  <div class="greetings">
    <h1 class="green">Vuejs chess</h1>
    <h3>Jouons aux échecs !</h3>
    <Cell :content="state.board" />    
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
