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
        const signers = await ethers.getSigners();
        for (let i = 0; i < signers.length; i++) {
            await nftMarketContract.connect(signers[i]).createToken(
                pictures[0].name,
                pictures[0].description,
                pictures[0].url,
                goodPrice,
                { gasLimit, value: originalListingPrice }
            );
        }
        const items = await nftMarketContract.fetchMarketItems();
        expect(items.length).to.equal(signers.length);
    });
});
