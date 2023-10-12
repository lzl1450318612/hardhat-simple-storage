// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
// const hre = require("hardhat");

// async function main() {
//   const currentTimestampInSeconds = Math.round(Date.now() / 1000);
//   const unlockTime = currentTimestampInSeconds + 60;

//   const lockedAmount = hre.ethers.parseEther("0.001");

//   const lock = await hre.ethers.deployContract("Lock", [unlockTime], {
//     value: lockedAmount,
//   });

//   await lock.waitForDeployment();

//   console.log(
//     `Lock with ${ethers.formatEther(
//       lockedAmount
//     )}ETH and unlock timestamp ${unlockTime} deployed to ${lock.target}`
//   );
// }

// // We recommend this pattern to be able to use async/await everywhere
// // and properly handle errors.
// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });

const { ethers, run, network, hardhat } = require("hardhat");

async function verify(contractAddress, args) {
  console.log("Verifying contract...");
  console.log(`contractAddress: ${contractAddress}`);
  try {
    await run("verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Contract already verified!");
    } else {
      console.error(e);
    }
  }
}

async function main() {
  const simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
  console.log("Deploying......");

  const simpleStorage = await simpleStorageFactory.deploy();
  await simpleStorage.waitForDeployment();
  console.log(`deploy to: ${await simpleStorage.getAddress()}`);
  if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
    console.log("try to verify");
    await simpleStorage.deploymentTransaction().wait(6);
    await verify(await simpleStorage.getAddress(), []);
  }
  let balance = await simpleStorage.showMeBalance(
    "0x58741383d23B47f7ed42362f66abb5f6fBF214bA"
  );
  console.log(`Current balance is: ${balance}`);

  storeResp = await simpleStorage.store(
    "0x58741383d23B47f7ed42362f66abb5f6fBF214bA",
    100
  );
  await storeResp.wait(1);

  balance = await simpleStorage.showMeBalance(
    "0x58741383d23B47f7ed42362f66abb5f6fBF214bA"
  );
  console.log(`After update balance is: ${balance}`);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
