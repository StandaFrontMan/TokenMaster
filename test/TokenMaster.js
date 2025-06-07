const { expect } = require("chai");

describe("TokenMaster", () => {
  let tokenMaster;

  beforeEach(async () => {
    const TokenMaster = await ethers.getContractFactory("TokenMaster");
    tokenMaster = await TokenMaster.deploy("TokenMaster", "TM");
  });

  describe("Deployment", () => {
    it("Sets the name", async () => {
      let name = await tokenMaster.name();

      expect(name).to.equal("TokenMaster");
    });

    it("Sets the symbol", async () => {
      let symbol = await tokenMaster.symbol();

      expect(symbol).to.equal("TM");
    });
  });
});
