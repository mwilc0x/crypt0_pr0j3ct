import { expect } from "chai";
import { ethers, deployments } from "hardhat";

describe("Barn", function () {
  let barn;

  beforeEach(async () => {
    const Barn = await deployments.get("Barn");
    barn = await ethers.getContractAt("Barn", Barn.address);
  });

  it("Should initialize", async function () {});
});
