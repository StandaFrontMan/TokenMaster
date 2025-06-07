const { expect } = require("chai");

const NAME = "TokenMaster";
const SYMBOL = "TM";

const OCCASION = {
  name: "ETH Texas",
  date: "Apr 27",
  time: "10:00AM CTS",
  location: "Austin, Texas",
  cost: ethers.utils.parseUnits("1", "ether"),
  maxTickets: 100,
};

describe("TokenMaster", () => {
  let tokenMaster;
  let deployer, buyer;

  beforeEach(async () => {
    [deployer, buyer] = await ethers.getSigners();

    const TokenMaster = await ethers.getContractFactory("TokenMaster");
    tokenMaster = await TokenMaster.deploy(NAME, SYMBOL);

    const transaction = await tokenMaster
      .connect(deployer)
      .list(
        ...[
          OCCASION.name,
          OCCASION.date,
          OCCASION.time,
          OCCASION.location,
          OCCASION.cost,
          OCCASION.maxTickets,
        ]
      );

    await transaction.wait();
  });

  describe("Deployment", () => {
    it("Sets the name", async () => {
      let name = await tokenMaster.name();

      expect(name).to.equal(NAME);
    });

    it("Sets the symbol", async () => {
      let symbol = await tokenMaster.symbol();

      expect(symbol).to.equal(SYMBOL);
    });

    it("Sets the owner", async () => {
      const owner = await tokenMaster.owner();

      expect(owner).to.equal(deployer.address);
    });
  });

  describe("Occasions", () => {
    it("Updates occasions count", async () => {
      const totalOccasions = await tokenMaster.totalOccasions();
      expect(totalOccasions).to.be.equal(1);
    });
  });
});
