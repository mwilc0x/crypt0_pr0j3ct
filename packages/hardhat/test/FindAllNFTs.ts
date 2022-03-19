import { expect } from "chai";
import { ethers } from "hardhat";
import { Contract, ContractFactory } from '@ethersproject/contracts';
import { 
    pictures, goodPrice, gasLimit, originalListingPrice,
} from './_data';

describe("Finding all market NFTs", () => {
    let nftMarketContract: any;

    before(async () => {
        const NFTMarketContractFactory: ContractFactory = await ethers.getContractFactory("NFTMarket");
        let NFTMarketContract: Contract = await NFTMarketContractFactory.deploy();        
        nftMarketContract = await NFTMarketContract.deployed();
    });

    it('should return all market nfts for sale', async () => {
        await nftMarketContract.createToken(
            pictures[0].name,
            pictures[0].description,
            pictures[0].url,
            goodPrice,
            { gasLimit, value: originalListingPrice }
        );
        await nftMarketContract.createToken(
            pictures[1].name,
            pictures[1].description,
            pictures[1].url,
            goodPrice,
            { gasLimit, value: originalListingPrice }
        );

        const items = await nftMarketContract.fetchMarketItems();
        expect(items.length).to.equal(2);
    });
});
