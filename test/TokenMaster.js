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

    it("Returns occasions attributes", async () => {
      const occasion = await tokenMaster.getOccasion(1);

      expect(occasion.id).to.be.equal(1);
      expect(occasion.cost).to.be.equal(OCCASION.cost);
      expect(occasion.tickets).to.be.equal(OCCASION.maxTickets);
      expect(occasion.name).to.be.equal(OCCASION.name);
      expect(occasion.date).to.be.equal(OCCASION.date);
      expect(occasion.time).to.be.equal(OCCASION.time);
      expect(occasion.location).to.be.equal(OCCASION.location);
    });
  });

  describe("Minting", () => {
    const OCCASION_ID = 1;
    const SEAT = 50;
    const AMOUNT = ethers.utils.parseUnits("1", "ether");

    beforeEach(async () => {
      const transaction = await tokenMaster
        .connect(buyer)
        .mint(OCCASION_ID, SEAT, { value: AMOUNT });

      await transaction.wait();
    });

    it("Updates ticket count", async () => {
      const occasion = await tokenMaster.getOccasion(1);
      expect(occasion.tickets).to.be.equal(OCCASION.maxTickets - 1);
    });

    it("Updates buying status", async () => {
      const status = await tokenMaster.hasBought(OCCASION_ID, buyer.address);
      expect(status).to.be.equal(true);
    });

    it("Updates taken seat", async () => {
      const takenSeat = await tokenMaster.seatTaken(OCCASION_ID, SEAT);
      expect(takenSeat).to.be.equal(buyer.address);
    });

    it("Updates ovarall seating status", async () => {
      const seats = await tokenMaster.getTakenSeats(OCCASION_ID);
      expect(seats.length).to.be.equal(1);
      expect(seats[0]).to.be.equal(SEAT);
    });

    it("Updates the contract balance", async () => {
      const balance = await ethers.provider.getBalance(tokenMaster.address);
      expect(balance).to.be.equal(AMOUNT);
    });
  });
});
