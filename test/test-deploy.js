const { assert } = require("chai");
const { ethers } = require("hardhat");

describe("", function () {
  let simpleStorageFactory, simpleStorage;
  let balance;
  const testAddress = "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199";

  beforeEach(async function () {
    simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
    simpleStorage = await simpleStorageFactory.deploy();
  });

  it("校验balance是0", async function () {
    balance = await simpleStorage.showMeBalance(testAddress);
    assert.equal(balance.toString(), "0");
  });

  it("校验钱包更新成功", async function () {
    const resp = await simpleStorage.store(testAddress, "100");
    await resp.wait(1);
    balance = await simpleStorage.showMeBalance(testAddress);
    assert.equal(balance.toString(), "100");
  });
});
