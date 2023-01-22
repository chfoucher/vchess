export const TARGET = 0;
export const PAWN = 1;
export const ROOK = 2;
export const KING = 3;
export const BISHOP = 4;
export const KNIGHT = 5;
export const QUEEN = 6;

export function initBoard() {
  const board = [];
  let currentBlack = false;
  for (var r = 0; r < 8; r++) {
    board[r] = [];
    for (var c = 0; c < 8; c++) {
      board[r][c] = { r, c, black: currentBlack };
      currentBlack = !currentBlack;
    }
    currentBlack = !currentBlack;
  }
  const agency = [ROOK, KNIGHT, BISHOP, QUEEN, KING, BISHOP, KNIGHT, ROOK];
  for (var c = 0; c < 8; c++) {
    board[0][c].piece = { type: agency[c], black: true };
    board[1][c].piece = { type: PAWN, black: true };
    board[6][c].piece = { type: PAWN, black: false };
    board[7][c].piece = { type: agency[c], black: false };
  }
  return board;
}
