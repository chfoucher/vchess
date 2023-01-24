<script setup>
import { ref } from "vue";
import Cell from "./Cell.vue";
import viseur_noir from "../assets/viseur_noir.svg";
import viseur_blanc from "../assets/viseur_blanc.svg";
import Chess_hdt45 from "../assets/Chess_hdt45.svg";
import Chess_plt45 from "../assets/Chess_plt45.svg";
import Chess_mdt45 from "../assets/Chess_mdt45.svg";
import Chess_rlt45 from "../assets/Chess_rlt45.svg";
import Chess_fdt45 from "../assets/Chess_fdt45.svg";
import Chess_klt45 from "../assets/Chess_klt45.svg";
import Chess_Bdt45 from "../assets/Chess_Bdt45.svg";
import Chess_blt45 from "../assets/Chess_blt45.svg";
import Chess_Ndt45 from "../assets/Chess_Ndt45.svg";
import Chess_nlt45 from "../assets/Chess_nlt45.svg";
import Chess_gdt45 from "../assets/Chess_gdt45.svg";
import Chess_qlt45 from "../assets/Chess_qlt45.svg";

const images = [
  viseur_noir,
  viseur_blanc,
  Chess_hdt45,
  Chess_plt45,
  Chess_mdt45,
  Chess_rlt45,
  Chess_fdt45,
  Chess_klt45,
  Chess_Bdt45,
  Chess_blt45,
  Chess_Ndt45,
  Chess_nlt45,
  Chess_gdt45,
  Chess_qlt45,
];
const PAWN = 1;
const ROOK = 2;
const KING = 3;
const BISHOP = 4;
const KNIGHT = 5;
const QUEEN = 6;
const NOIR = "noir";
const BLANC = "blanc";
let joueurActif = BLANC;

const mvtsPossibles = [];
const board = ref(initBoard());
let selection = null;

function initBoard() {
  const board = [];
  mvtsPossibles[NOIR] = [];
  mvtsPossibles[BLANC] = [];
  let currentBlack = false;
  for (var r = 0; r < 8; r++) {
    board[r] = [];
    for (var c = 0; c < 8; c++) {
      board[r][c] = { r, c, black: currentBlack };
      currentBlack = !currentBlack;
    }
    currentBlack = !currentBlack;
  }
  const layout = [ROOK, KNIGHT, BISHOP, QUEEN, KING, BISHOP, KNIGHT, ROOK];
  for (var c = 0; c < 8; c++) {
    board[0][c].piece = { type: layout[c], black: true };
    ajouteOrigine(NOIR, 0, c);
    board[1][c].piece = { type: PAWN, black: true };
    ajouteOrigine(NOIR, 1, c);
    board[6][c].piece = { type: PAWN, black: false };
    ajouteOrigine(BLANC, 6, c);
    board[7][c].piece = { type: layout[c], black: false };
    ajouteOrigine(BLANC, 7, c);
  }
  return board;
}

function ajouteOrigine(couleur, r, c) {
  mvtsPossibles[couleur].push({ origine: { r, c }, destinations: [] });
}

function onClick(target) {
  if (selection) {
    const adversaire = (joueurActif === BLANC)?NOIR:BLANC;
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
