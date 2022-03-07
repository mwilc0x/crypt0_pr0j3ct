import { expect } from "chai";
import { ethers, deployments } from "hardhat";

describe("WOOL", function () {
  let wool;

  beforeEach(async () => {
    const WOOL = await deployments.get("WOOL");
    wool = await ethers.getContractAt("WOOL", WOOL.address);
  });

  it("Should initialize", async function () {});
});
