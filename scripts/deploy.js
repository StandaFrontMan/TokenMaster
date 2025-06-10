const hre = require("hardhat");

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), "ether");
};

async function main() {
  // Setup accounts & variables
  const [deployer] = await ethers.getSigners();
  const NAME = "TokenMaster";
  const SYMBOL = "TM";

  // Deploy contract
  const TokenMaster = await ethers.getContractFactory("TokenMaster");
  const tokenMaster = await TokenMaster.deploy(NAME, SYMBOL);
  await tokenMaster.deployed();

  console.log(`Deployed TokenMaster Contract at: ${tokenMaster.address}\n`);

  // List 6 events
  const occasions = [
    {
      name: "UFC Miami",
      date: "May 31",
      time: "6:00PM EST",
      location: "Miami-Dade Arena - Miami, FL",
      cost: tokens(3),
      tickets: 0,
    },
    {
      name: "ETH Tokyo",
      date: "Jun 2",
      time: "1:00PM JST",
      location: "Tokyo, Japan",
      cost: tokens(1),
      tickets: 125,
    },
    {
      name: "ETH Privacy Hackathon",
      date: "Jun 9",
      time: "10:00AM TRT",
      location: "Turkey, Istanbul",
      cost: tokens(0.25),
      tickets: 200,
    },
    {
      name: "Dallas Mavericks vs. San Antonio Spurs",
      date: "Jun 11",
      time: "2:30PM CST",
      location: "American Airlines Center - Dallas, TX",
      cost: tokens(5),
      tickets: 0,
    },
    {
      name: "ETH Global Toronto",
      date: "Jun 23",
      time: "11:00AM EST",
      location: "Toronto, Canada",
      cost: tokens(1.5),
      tickets: 125,
    },
  ];

  for (var i = 0; i < 5; i++) {
    const transaction = await tokenMaster
      .connect(deployer)
      .list(
        occasions[i].name,
        occasions[i].date,
        occasions[i].time,
        occasions[i].location,
        occasions[i].cost,
        occasions[i].tickets
      );

    await transaction.wait();

    console.log(`Listed Event ${i + 1}: ${occasions[i].name}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
