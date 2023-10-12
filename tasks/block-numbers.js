require("@nomicfoundation/hardhat-toolbox");

const { task } = require("hardhat/config");

task("block-number", "打印当前区块编号").setAction(async (taskArgs) => {
  const blockNum = await ethers.provider.getBlockNumber();

  console.log(`Current block number is: ${blockNum}`);
});

module.exports = {};
