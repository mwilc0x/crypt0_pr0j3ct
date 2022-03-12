import { expect } from "chai";
import { ethers, deployments } from "hardhat";
import { NFTMarket } from '../typechain';

describe("NFT Market", function () {
    let nftMarket: NFTMarket;

    beforeEach(async () => {
        const NFTMarket = await deployments.get("NFTMarket");
        nftMarket = await ethers.getContractAt("NFTMarket", NFTMarket.address);
    });

    it("should have a listing price of 0.025 ether", async function () {
        const listingPrice = await nftMarket.getListingPrice();
        const convertedListingPrice = Number(ethers.utils.formatEther(listingPrice));
        expect(convertedListingPrice).equal(0.025);
    });
});
