import { expect } from "chai";
import { ethers } from "hardhat";
import { Contract, ContractFactory } from '@ethersproject/contracts';
import {
    pictures, originalListingPrice,
    errorMessages, createEVMErrorMessage,
    badPrice, goodPrice, gasLimit,
} from './_data';

describe("Selling NFTs", () => {
    let nftMarketContract: any;

    before(async () => {
        const NFTMarketContractFactory: ContractFactory = await ethers.getContractFactory("NFTMarket");
        let NFTMarketContract: Contract = await NFTMarketContractFactory.deploy();        
        nftMarketContract = await NFTMarketContract.deployed();

        // create an NFT
        await nftMarketContract.createToken(
            pictures[0].name,
            pictures[0].description,
            pictures[0].url,
            goodPrice,
            { gasLimit, value: originalListingPrice }
        );
    });

    it('should reject sale if passing wrong tokenId', async () => {
        const [_, buyerAddress] = await ethers.getSigners();
        try {
            await nftMarketContract.connect(buyerAddress).createMarketSale(5, { value: goodPrice, gasLimit });
        } catch (error: any) {
            expect(error.message).to.equal(
                createEVMErrorMessage(errorMessages.tokenDoesNotExist)
            );
        }
    });

    it('should reject sale if passing wrong price', async () => {
        const [_, buyerAddress] = await ethers.getSigners();

        try {
            await nftMarketContract.connect(buyerAddress).createMarketSale(1, { value: badPrice, gasLimit });
        } catch (error: any) {
            expect(error.message).to.equal(
                createEVMErrorMessage(errorMessages.wrongPaymentAmountForSale)
            );
        }
    });

    it('should complete a sale when buyer steps in with payment', async () => {
        const [_, buyerAddress] = await ethers.getSigners();
        // hardhat.org/guides/waffle-testing.html#testing-from-a-different-account
        await nftMarketContract.connect(buyerAddress).createMarketSale(1, { value: goodPrice, gasLimit });
    });

    it('should reject sale if not for sale', async () => {
        const [_, buyerAddress] = await ethers.getSigners();
        try {
            await nftMarketContract.connect(buyerAddress).createMarketSale(1, { value: badPrice, gasLimit });
        } catch (error: any) {
            expect(error.message).to.equal(
                createEVMErrorMessage(errorMessages.notForSale)
            );
        }
    });

    it('should allow owner to re-sell', async () => {});
    it('should allow owner to cancel sale', async () => {});
});
