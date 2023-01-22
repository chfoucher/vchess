/*global describe, it */
import { expect } from "chai";
import { initBoard } from "../src/utils/rules.js";

describe("Array", function () {
  describe("#indexOf()", function () {
    it("should return -1 when the value is not present", function () {
      expect([1, 2, 3].indexOf(4)).to.equal(-1); // assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});

describe("rules", function () {
  describe("initBoard", function () {
    it("should return the board layout at game start", function () {
      const board = initBoard();
      expect(board[0][0].black).to.be.false;
    });
  });
});
