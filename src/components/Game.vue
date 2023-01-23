<script setup>
import { reactive, ref } from "vue";
import Cell from "./Cell.vue";
import * as utils from "../utils";
const board = ref(utils.initBoard());
let selection = null;

function onClick(target) {
  if (selection) {
    board.value[target.r][target.c].piece =
      board.value[selection.r][selection.c].piece;
    board.value[selection.r][selection.c].piece = null;
    board.value[selection.r][selection.c].selected = false;
    selection = null;
  } else {
    selection = target;
    board.value[selection.r][selection.c].selected = true;
  }
}
</script>

<template>
  <div class="greetings">
    <h1 class="green">Vuejs chess</h1>
    <h3>Jouons aux échecs !</h3>
    <table>
      <tr v-for="(row, i) in board" :key="i">
        <td v-for="(cell, j) in row" :key="`${i}-${j}`">
          <Cell v-bind="cell" @click="onClick" />
        </td>
      </tr>
    </table>
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

table {
  background-color: darkgray;
}

td {
  padding: 0;
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
