import { expect } from "chai";
import { ethers, deployments } from "hardhat";

describe("Woolf", function () {
  let woolf;

  beforeEach(async () => {
    const Woolf = await deployments.get("Woolf");
    woolf = await ethers.getContractAt("Woolf", Woolf.address);
    woolf.setPaidTokens(20000);
  });

  it("Should initialize", async function () {});
  it("should mint tokens", async function () {});
});

// Traits deployed to 0x610178dA211FEF7D417bC0e6FeD39F05609AD788
// WOOL deployed to 0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e
// Woolf deployed to 0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0
// Barn deployed to 0x0DCd1Bf9A1b36cE34237eEaFef220932846BCD82