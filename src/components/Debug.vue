<script setup>
import { reactive, ref } from "vue";
import Cell from "./Cell.vue";

function initBoard() {
    const board = [];
    board[0] = [
            { r: 0, c: 0, black: false, selected: false, piece: { type: 2, black: true } },
            { r: 0, c: 1, black: true, selected: false, piece: null },
        ];
        board[1] = [
            { r: 1, c: 0, black: true, selected: false, piece: { type: 1, black: false } },
            { r: 1, c: 1, black: false, selected: false, piece: null },
        ];
    return board;
}
const board = ref(initBoard());
let selection = null;
function onClick(e) {
    console.log("click", e);
    if (selection) {
        board.value[e.r][e.c].piece = board.value[selection.r][selection.c].piece;
        board.value[selection.r][selection.c].piece = null;
        board.value[selection.r][selection.c].selected = false;
        selection = null;
    } else {
        selection = e;
        board.value[selection.r][selection.c].selected = true;
    }
    //board.value[0][0].black = !board.value[[0].black;
}
</script>

<template>
    <table>
      <tr v-for="row in board">
        <td v-for="cell in row">
          <Cell v-bind="cell" @click="onClick" />
        </td>
      </tr>
    </table>
    <!-- <ul v-for="r in board">
        <ul v-for="i in r">
            <li>{{ i.black }} <Cell v-bind="i" @click="onClick"/></li>
        </ul>
    </ul> -->
    <button @click="onClick">Test</button>
</template>
