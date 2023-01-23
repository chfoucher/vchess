/*global describe, it */
import { expect } from "chai";
import { initBoard, PAWN, ROOK } from "../src/utils/rules.js";

describe("rules", function () {
  describe("initBoard", function () {
    it("should return the board layout at game start", function () {
      const board = initBoard();
      expect(board[0][0].black).to.be.false;
      expect(board[0][1].black).to.be.true;
      expect(board[2][3].r).to.equal(2);
      expect(board[2][3].c).to.equal(3);
      expect(board[0][0]).to.have.property("piece");
      expect(board[0][0].piece).to.deep.equal({ type: ROOK, black: true });
      expect(board[6][1]).to.have.property("piece");
      expect(board[6][1].piece).to.deep.equal({ type: PAWN, black: false });
      expect(board[2][0]).to.not.have.property("piece");
    });
  });
});
