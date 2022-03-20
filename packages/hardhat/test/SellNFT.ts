import { expect } from "chai";
import { ethers } from "hardhat";
import { Contract, ContractFactory } from '@ethersproject/contracts';
import { TransactionResponse } from "@ethersproject/abstract-provider"
import {
    pictures, originalListingPrice,
    errorMessages, createEVMErrorMessage,
    badPrice, goodPrice, gasLimit,
} from './_data';
import {
    getMarketItemCreatedEvent,
    getTokenIdFromMarketCreatedEvent
} from './_helperFns';


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

    describe('Rejecting a Sale', () => {
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

        it('should reject sale if not for sale', async () => {
            const signers = await ethers.getSigners();
            const transaction: TransactionResponse = await nftMarketContract.connect(signers[1]).createToken(
                pictures[0].name,
                pictures[0].description,
                pictures[0].url,
                goodPrice,
                { gasLimit, value: originalListingPrice }
            );
            const marketItemCreatedEvent = await getMarketItemCreatedEvent(transaction);
            const tokenId = getTokenIdFromMarketCreatedEvent(marketItemCreatedEvent);

            await nftMarketContract.connect(signers[1]).cancelMarketSale(tokenId);

            try {
                await nftMarketContract.connect(signers[2]).createMarketSale(tokenId, { value: goodPrice, gasLimit });
            } catch (error: any) {
                expect(error.message).to.equal(
                    createEVMErrorMessage(errorMessages.notForSale)
                );
            }
        });
    });

    describe('Completing a Sale', () => {
        it('should complete a sale when buyer steps in with payment', async () => {
            const signers = await ethers.getSigners();
            const transaction: TransactionResponse = await nftMarketContract.connect(signers[1]).createToken(
                pictures[0].name,
                pictures[0].description,
                pictures[0].url,
                goodPrice,
                { gasLimit, value: originalListingPrice }
            );
            const marketItemCreatedEvent = await getMarketItemCreatedEvent(transaction);
            const tokenId = getTokenIdFromMarketCreatedEvent(marketItemCreatedEvent);

            await nftMarketContract.connect(signers[2]).createMarketSale(tokenId, { value: goodPrice, gasLimit });
        });
    });

    describe('Cancelling a Sale', () => {
        it('should allow seller to cancel sale', async () => {
            const signers = await ethers.getSigners();
            const transaction: TransactionResponse = await nftMarketContract.connect(signers[1]).createToken(
                pictures[0].name,
                pictures[0].description,
                pictures[0].url,
                goodPrice,
                { gasLimit, value: originalListingPrice }
            );
            const marketItemCreatedEvent = await getMarketItemCreatedEvent(transaction);
            const tokenId = getTokenIdFromMarketCreatedEvent(marketItemCreatedEvent);

            await nftMarketContract.connect(signers[1]).cancelMarketSale(tokenId);
        });

        it('should not allow non-seller to cancel sale', async () => {
            const signers = await ethers.getSigners();
            const transaction: TransactionResponse = await nftMarketContract.connect(signers[1]).createToken(
                pictures[0].name,
                pictures[0].description,
                pictures[0].url,
                goodPrice,
                { gasLimit, value: originalListingPrice }
            );
            const marketItemCreatedEvent = await getMarketItemCreatedEvent(transaction);
            const tokenId = getTokenIdFromMarketCreatedEvent(marketItemCreatedEvent);

            try {
                await nftMarketContract.connect(signers[0]).cancelMarketSale(tokenId);
            } catch (error: any) {
                expect(error.message).to.equal(
                    createEVMErrorMessage(errorMessages.cancelSaleSellerOnly)
                );
            }
        });

        it('should not allow cancel sale of non-existent token', async () => {
            const signers = await ethers.getSigners();
            const transaction: TransactionResponse = await nftMarketContract.connect(signers[1]).createToken(
                pictures[0].name,
                pictures[0].description,
                pictures[0].url,
                goodPrice,
                { gasLimit, value: originalListingPrice }
            );
            const marketItemCreatedEvent = await getMarketItemCreatedEvent(transaction);
            let tokenId = getTokenIdFromMarketCreatedEvent(marketItemCreatedEvent);
            tokenId++;

            try {
                await nftMarketContract.connect(signers[1]).cancelMarketSale(tokenId);
            } catch (error: any) {
                expect(error.message).to.equal(
                    createEVMErrorMessage(errorMessages.tokenDoesNotExist)
                );
            }
        });
    });

    describe('Updating a Sale', () => {
        it('should allow seller to re-sell', async () => {});
        it('should allow seller to update the price', async () => {});
    });
});
