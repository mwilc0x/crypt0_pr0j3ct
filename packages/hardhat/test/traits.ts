import { expect } from "chai";
import { ethers, deployments } from "hardhat";

describe("Traits", function () {
  let traits;

  beforeEach(async () => {
    const Traits = await deployments.get("Traits");
    traits = await ethers.getContractAt("Traits", Traits.address);
  });

  it("Should initialize", async function () {});
});
