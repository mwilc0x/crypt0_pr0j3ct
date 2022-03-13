import { expect } from "chai";
import { ethers, deployments } from "hardhat";
import { NFTMarket } from '../typechain/NFTMarket';

describe("NFT Market", function () {
    let nftMarket: NFTMarket;

    beforeEach(async () => {
        console.log(deployments);
        const NFTMarket = await deployments.get("NFTMarket");
        nftMarket = await ethers.getContractAt("NFTMarket", NFTMarket.address);
    });

    it("should have a listing price of 0.025 ether", async function () {
        const listingPrice = await nftMarket.getListingPrice();
        const convertedListingPrice = Number(ethers.utils.formatEther(listingPrice));
        expect(convertedListingPrice).equal(0.025);
    });

    it('should create a new nft when uploaded', async function() {});

    it('should create a sale when buyer steps in', async function () {});

    it('should return correct # of listed nfts', async function () {});

    it ('should return correct # of listed nft for user', async function () {});
});
