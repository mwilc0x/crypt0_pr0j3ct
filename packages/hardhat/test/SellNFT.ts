import { expect } from "chai";
import { ethers } from "hardhat";
import { Contract, ContractFactory } from '@ethersproject/contracts';
import { TransactionResponse } from "@ethersproject/abstract-provider"
import {
    pictures, originalListingPrice,
    errorMessages, createEVMErrorMessage,
    badPrice, goodPrice, reSalePrice, gasLimit,
    updateSalePrice
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
        it('should allow owner to re-sell if they cancelled', async () => {
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

            await nftMarketContract.connect(signers[1]).cancelMarketSale(tokenId);
            await nftMarketContract.connect(signers[1]).resell(
                tokenId, 
                reSalePrice,
                { gasLimit, value: originalListingPrice }
            );
        });

        it('should not allow a non-owner to re-sell', async () => {
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

            await nftMarketContract.connect(signers[1]).cancelMarketSale(tokenId);

            try {
                await nftMarketContract.connect(signers[2]).resell(
                    tokenId, 
                    reSalePrice,
                    { gasLimit, value: originalListingPrice }
                );
            } catch (error: any) {
                expect(error.message).to.equal(
                    createEVMErrorMessage(errorMessages.onlyOwnerReSell)
                );
            }
        });

        it('should not allow a re-sell of wrong tokenId', async () => {
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

            await nftMarketContract.connect(signers[1]).cancelMarketSale(tokenId);

            tokenId++;
            try {
                await nftMarketContract.connect(signers[2]).resell(
                    tokenId, 
                    reSalePrice,
                    { gasLimit, value: originalListingPrice }
                );
            } catch (error: any) {
                expect(error.message).to.equal(
                    createEVMErrorMessage(errorMessages.tokenDoesNotExist)
                );
            }
        });

        it('should not allow a re-sell if missing listing price', async () => {
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

            await nftMarketContract.connect(signers[1]).cancelMarketSale(tokenId);

            try {
                await nftMarketContract.connect(signers[1]).resell(
                    tokenId, 
                    reSalePrice,
                    { gasLimit }
                );
            } catch (error: any) {
                expect(error.message).to.equal(
                    createEVMErrorMessage(errorMessages.missingListingPrice)
                );
            }
        });

        it('should allow seller to update the price of token they own', async () => {
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

            try {
                await nftMarketContract.connect(signers[1]).updatePrice(
                    tokenId, 
                    updateSalePrice,
                    { gasLimit }
                );
            } catch (error: any) {
                expect(error.message).to.equal(
                    createEVMErrorMessage(errorMessages.missingListingPrice)
                );
            }
        });

        it('should not allow seller to update the price of a wrong token', async () => {
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
                await nftMarketContract.connect(signers[1]).updatePrice(
                    tokenId, 
                    updateSalePrice,
                    { gasLimit }
                );
            } catch (error: any) {
                expect(error.message).to.equal(
                    createEVMErrorMessage(errorMessages.tokenDoesNotExist)
                );
            }
        });

        it('should not allow anyone other than seller to update price', async () => {
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

            try {
                await nftMarketContract.connect(signers[2]).updatePrice(
                    tokenId, 
                    updateSalePrice,
                    { gasLimit }
                );
            } catch (error: any) {
                expect(error.message).to.equal(
                    createEVMErrorMessage(errorMessages.onlySellerUpdatePrice)
                );
            }
        });
    });
});
