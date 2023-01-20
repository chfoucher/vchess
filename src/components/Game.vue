<script setup>
import { reactive } from "vue";
import Cell from "./Cell.vue";
import * as utils from "../utils";
const state = reactive({
  board: initBoard(),
});

function initBoard() {
  const board = [];
  let currentBlack = false;
  for (var r = 0; r < 8; r++) {
      board[r] = [];
      for (var c = 0; c < 8; c++) {
          board[r][c] = {r, c, black: currentBlack};
          currentBlack = !currentBlack;
      }
      currentBlack = !currentBlack;
  }
  const agency = [utils.ROOK, utils.KNIGHT, utils.BISHOP, utils.QUEEN, utils.KING, utils.BISHOP, utils.KNIGHT, utils.ROOK];
  for (var c = 0; c < 8; c++) {
      board[0][c].piece = { type: agency[c], black: true };
      board[1][c].piece = { type: utils.PAWN, black: true };
      board[6][c].piece = { type: utils.PAWN, black: false };
      board[7][c].piece = { type: agency[c], black: false };
  }
  return board;
}

</script>

<template>
  <div class="greetings">
    <h1 class="green">Vuejs chess</h1>
    <h3>Jouons aux échecs !</h3>
    <table>
      <tr v-for="row in state.board">
        <td v-for="cell in row">
          <Cell v-bind="cell" />
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
