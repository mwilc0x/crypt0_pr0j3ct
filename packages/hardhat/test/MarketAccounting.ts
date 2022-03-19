import { expect } from "chai";
import { ethers } from "hardhat";
import { Contract, ContractFactory } from '@ethersproject/contracts';

describe("Market accounting", () => {
    let nftMarketContract: any;

    before(async () => {
        const NFTMarketContractFactory: ContractFactory = await ethers.getContractFactory("NFTMarket");
        let NFTMarketContract: Contract = await NFTMarketContractFactory.deploy();        
        nftMarketContract = await NFTMarketContract.deployed();
    });

    it("should have a listing price of 0.025 ether", async () => {
        const listingPrice = await nftMarketContract.getListingPrice();
        const convertedListingPrice = Number(ethers.utils.formatEther(listingPrice));
        expect(convertedListingPrice).equal(0.025);
    });

    it('should allow listing price to be updated to a lower price', async () => {
        const listingPrice = await nftMarketContract.getListingPrice();
        const convertedListingPrice = Number(ethers.utils.formatEther(listingPrice));
        expect(convertedListingPrice).equal(0.025);

        const newPrice = ethers.utils.parseUnits('0.01', 'ether');
        await nftMarketContract.updateListingPrice(newPrice);
        const newListingPrice = await nftMarketContract.getListingPrice();
        const convertedNewListingPrice = Number(ethers.utils.formatEther(newListingPrice));
        expect(convertedNewListingPrice).equal(0.01);
    });

    it('should allow listing price to be updated to a higher price', async () => {
        const listingPrice = await nftMarketContract.getListingPrice();
        const convertedListingPrice = Number(ethers.utils.formatEther(listingPrice));
        expect(convertedListingPrice).equal(0.01);

        const newPrice = ethers.utils.parseUnits('0.05', 'ether');
        await nftMarketContract.updateListingPrice(newPrice);
        const newListingPrice = await nftMarketContract.getListingPrice();
        const convertedNewListingPrice = Number(ethers.utils.formatEther(newListingPrice));
        expect(convertedNewListingPrice).equal(0.05);
    });

    it('should allow listing price to be updated multiple times higher and lower', async () => {
        const listingPrice = await nftMarketContract.getListingPrice();
        const convertedListingPrice = Number(ethers.utils.formatEther(listingPrice));
        expect(convertedListingPrice).equal(0.05);

        const newPrice = ethers.utils.parseUnits('0.10', 'ether');
        await nftMarketContract.updateListingPrice(newPrice);
        const newListingPrice = await nftMarketContract.getListingPrice();
        const convertedNewListingPrice = Number(ethers.utils.formatEther(newListingPrice));
        expect(convertedNewListingPrice).equal(0.10);

        const newNewPrice = ethers.utils.parseUnits('0.07', 'ether');
        await nftMarketContract.updateListingPrice(newNewPrice);
        const newNewListingPrice = await nftMarketContract.getListingPrice();
        const convertedNewNewListingPrice = Number(ethers.utils.formatEther(newNewListingPrice));
        expect(convertedNewNewListingPrice).equal(0.07);

        const newNewNewPrice = ethers.utils.parseUnits('0.15', 'ether');
        await nftMarketContract.updateListingPrice(newNewNewPrice);
        const newNewNewListingPrice = await nftMarketContract.getListingPrice();
        const convertedNewNewNewListingPrice = Number(ethers.utils.formatEther(newNewNewListingPrice));
        expect(convertedNewNewNewListingPrice).equal(0.15);
    });
});
