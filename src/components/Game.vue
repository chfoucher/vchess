<script setup>
import { computed, ref } from "vue";
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
const PION = 1;
const TOUR = 2;
const ROI = 3;
const FOU = 4;
const CHEVAL = 5;
const REINE = 6;
const NOIR = "noir";
const BLANC = "blanc";
let joueurActif = BLANC;
const mvtsPossibles = [];
let indexOrigine;
let historique;
let board;
let selection = null;
const message = ref("Clique sur une case !");
const annulationDesactivee = computed(() => {
  return historique.value.length === 0;
});

function initPartie() {
  historique = ref([]);
  board = ref(initBoard());
  joueurActif = BLANC;
  calculeMouvements();
  showStatus();
  //annulationDesactivee.value = true;
}
initPartie();

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
  const layout = [TOUR, CHEVAL, FOU, REINE, ROI, FOU, CHEVAL, TOUR];
  for (var c = 0; c < 8; c++) {
    board[0][c].piece = { type: layout[c], couleur: NOIR };
    ajouteOrigine(NOIR, 0, c);
    board[1][c].piece = { type: PION, couleur: NOIR };
    ajouteOrigine(NOIR, 1, c);
    board[6][c].piece = { type: PION, couleur: BLANC };
    ajouteOrigine(BLANC, 6, c);
    board[7][c].piece = { type: layout[c], couleur: BLANC };
    ajouteOrigine(BLANC, 7, c);
  }
  return board;
}

function showStatus() {
    if (selection) {
        message.value = "Sélectionne la destination";
    } else {
      message.value = `Aux ${joueurActif}s de jouer`;
    }
}

function onClick(caseChoisie) {
  console.log(selection);
  if (selection) {
    if (destinationAutorisee(caseChoisie.r, caseChoisie.c)) {
      historique.value.push({
                origine: {r: selection.r, c:selection.c, piece: board.value[selection.r][selection.c].piece},
                destination: {r: caseChoisie.r, c: caseChoisie.c, piece: board.value[caseChoisie.r][caseChoisie.c].piece}
            });
      const adversaire = (joueurActif === BLANC)?NOIR:BLANC;
      retireOrigine(joueurActif, selection.r, selection.c);
      if (board.value[caseChoisie.r][caseChoisie.c].piece) retireOrigine(adversaire, caseChoisie.r, caseChoisie.c);
      ajouteOrigine(joueurActif, caseChoisie.r, caseChoisie.c);
      board.value[caseChoisie.r][caseChoisie.c].piece =
      board.value[selection.r][selection.c].piece;
      promotion(caseChoisie);
      roque(selection.r, selection.c, caseChoisie.r, caseChoisie.c);
      board.value[selection.r][selection.c].piece = null;
      joueurActif = adversaire;
      calculeMouvements();
    }
    board.value[selection.r][selection.c].selected = false;
    selection = null;
  } else {
    if (origineAutorisee(caseChoisie)) {
      selection = caseChoisie;
      board.value[selection.r][selection.c].selected = true;
    }
  }
  showStatus();
}

function promotion(destination) {
    const piece = board.value[destination.r][destination.c].piece;
    if (piece.type === PION) {
        if ((piece.couleur === NOIR && destination.r === 7) ||
         (piece.couleur === BLANC && destination.r === 0)) {
             const nouvPiece = {type: REINE, couleur: piece.couleur};
             board.value[destination.r][destination.c].piece = nouvPiece;
         }
    }
}

function roque(or, oc, dr, dc) {
    const couleur = board.value[or][oc].piece.couleur;
    const row = or;
    let origCol, destCol;
    let roqueEnCours = false;
    if ((oc == 4) && (board.value[or][oc].piece.type === ROI)) {
        if (dc == 2) {
            origCol = 0;
            destCol = dc + 1;
            roqueEnCours = true;
        }
        if (dc == 6) {
            origCol = 7;
            destCol = dc - 1;
            roqueEnCours = true;
        }
        if (roqueEnCours) {
            board.value[row][destCol].piece = board.value[row][origCol].piece;
            board.value[row][origCol].piece = null;
            retireOrigine(couleur, row, origCol);
            ajouteOrigine(couleur, row, destCol);
        }
    }
}

function ajouteOrigine(couleur, r, c) {
    mvtsPossibles[couleur].push({origine: { r, c }, destinations:[]});
}

function retireOrigine(couleur, r, c) {
    const mvts = mvtsPossibles[couleur];
    for (let i = 0; i < mvts.length; i++) {
        if (mvts[i].origine.r === r && mvts[i].origine.c === c) {
            mvts.splice(i, 1);
            break;
        }
    }
}

function calculeMouvementsPion(r, c) {
    const resultat = [];
    let dr, dc;
    const direction = (joueurActif) === BLANC?-1:1;
    // Avance de 1
    dr = r + direction;
    dc = c;
    if (dr <= 7 && dr >= 0 && !(board.value[dr][dc].piece)) resultat.push({ r: dr, c: dc });
    // Avance de 2
    const startingRow = (joueurActif) === BLANC?6:1;
    if (r === startingRow) {
        dr = r + direction * 2;
        if (dr <= 7 && dr >= 0 && !(board.value[dr][dc].piece)) resultat.push({ r: dr, c: dc });
    }
    // Mange à gauche
    dr = r + direction;
    dc = c - 1;
    if (dr <= 7 && dr >= 0 && dc >= 0 && (board.value[dr][dc].piece) &&
        board.value[dr][dc].piece.couleur != joueurActif)
        resultat.push({ r: dr, c: dc });
    // Mange à droite
    dc = c + 1;
    if (dr <= 7 && dr >= 0 && dc <= 7 && (board.value[dr][dc].piece) &&
        board.value[dr][dc].piece.couleur != joueurActif)
        resultat.push({ r: dr, c: dc });
    return resultat;
}

function calculeMouvementsCercle(mvts, r, c) {
    const resultat = [];
    let dr, dc;
    for (const mvt of mvts) {
        dr = r + mvt[0];
        dc = c + mvt[1];
        if (dr <= 7 && dr >= 0 && dc <= 7 && dc >= 0) {
            if (!(board.value[dr][dc].piece) || (board.value[dr][dc].piece.couleur != joueurActif)) {
                resultat.push({ r: dr, c: dc });
            }
        }
    }
    return resultat;
}

function calculeMouvementsCavalier(r, c) {
    return calculeMouvementsCercle(
        [[1, 2], [2, 1], [-1, 2], [2, -1],
         [1, -2], [-2, 1], [-1, -2], [-2, -1]],
        r, c);
}

function calculeRoque(r, c) {
    const resultat = [];
    const startingRow = (joueurActif) === BLANC?7:0;
    if (r == startingRow && c == 4 && !board.value[r][c+1].piece && !board.value[r][c+2].piece) {
        resultat.push({ r, c: c + 2 });
    }
    if (r == startingRow && c == 4 && !board.value[r][c-1].piece && !board.value[r][c-2].piece && !board.value[r][c-3].piece) {
        resultat.push({ r, c: c - 2 });
    }
    return resultat;
}

function calculeMouvementsRoi(r, c) {
    const mvtsNormaux = calculeMouvementsCercle(
        [[1, 0], [1, 1], [1, -1], [0, -1],
        [-1, 0], [-1, 1], [-1, -1], [0, 1]],
        r, c);
    const mvtsRoque = calculeRoque(r, c);
    return mvtsNormaux.concat(mvtsRoque);
}

function calculeMouvementsLigne(mvts, r, c) {
    const resultat = [];
    var dr, dc;
    for (const mvt of mvts) {
        dr = r + mvt[0];
        dc = c + mvt[1];
        while (dr <= 7 && dr >= 0 && dc <= 7 && dc >= 0) {
            if (board.value[dr][dc].piece) {
                if (board.value[dr][dc].piece.couleur != joueurActif) {
                    // Prise
                    resultat.push({ r: dr, c: dc });
                }
                break; // Fin de la trajectoire
            } else { // Simple mouvement
                resultat.push({ r: dr, c: dc });
            }
            dr += mvt[0];
            dc += mvt[1];
        }
    }
    return resultat;
}

function calculeMouvementsFou(r, c) {
    return calculeMouvementsLigne([[1, 1], [1, -1], [-1, -1], [-1, 1]], r, c);
}

function calculeMouvementsTour(r, c) {
    return calculeMouvementsLigne([[0, 1], [0, -1], [-1, 0], [1, 0]], r, c);
}

function calculeMouvementsReine(r, c) {
    const mvtsFou = calculeMouvementsFou(r, c);
    const mvtsTour = calculeMouvementsTour(r, c);
    return mvtsFou.concat(mvtsTour);
}

function calculeMouvementsOrigine(r, c) {
    const piece = board.value[r][c].piece;
    var resultat = [];
    switch (piece.type) {
        case PION:
            resultat = calculeMouvementsPion(r, c);
            break;
        case CHEVAL:
            resultat = calculeMouvementsCavalier(r, c);
            break;
        case FOU:
            resultat = calculeMouvementsFou(r, c);
            break;
        case TOUR:
            resultat = calculeMouvementsTour(r, c);
            break;
        case REINE:
            resultat = calculeMouvementsReine(r, c);
            break;
        case ROI:
            resultat = calculeMouvementsRoi(r, c);
            break;
    }
    return resultat;
}

function calculeMouvements() {
    const possibles = mvtsPossibles[joueurActif];
    for (const mouvement of possibles) {
        mouvement.destinations = calculeMouvementsOrigine(mouvement.origine.r, mouvement.origine.c);
    }
}

function origineAutorisee({ r, c }) {
  console.log("origineAutorisee ?", joueurActif)
  console.log(mvtsPossibles);
    const cases = mvtsPossibles[joueurActif];
    for (let i = 0; i < cases.length; i++) {
        if (cases[i].origine.r === r && cases[i].origine.c === c && cases[i].destinations.length) {
            indexOrigine = i;
            console.log("Oui");
            return true;
        }
    }
    console.log("Non !");
    return false;
}

function destinationAutorisee(dr, dc) {
    const destinations = mvtsPossibles[joueurActif][indexOrigine].destinations;
    for (let i = 0; i < destinations.length; i++) {
        if (destinations[i].r === dr && destinations[i].c === dc) {
            return true;
        }
    }
    return false;
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
  <div>
    <button id="btnNouveau">Nouvelle partie</button>
    <button id="btnEnregistre">Enregistre partie</button>
    <button id="btnAnnule" :disabled="annulationDesactivee">Annule</button>
    {{  message }}
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
