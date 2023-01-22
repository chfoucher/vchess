<script setup>
import { reactive } from "vue";
import Cell from "./Cell.vue";
import * as utils from "../utils";
const state = reactive({
  board: utils.initBoard(),
  selection: null,
});

function onClick(e) {
  if (state.selection) {
    state.board[state.selection.r][state.selection.c].selected = false;
    state.selection = null;
  } else {
    state.selection = e;
    state.board[state.selection.r][state.selection.c].selected = true;
  }
}
</script>

<template>
  <div class="greetings">
    <h1 class="green">Vuejs chess</h1>
    <h3>Jouons aux échecs !</h3>
    <table>
      <tr v-for="row in state.board">
        <td v-for="cell in row">
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
