import { expect } from "chai";
import { ethers, waffle } from "hardhat";
import { Contract, ContractFactory } from '@ethersproject/contracts';
import { TransactionResponse } from "@ethersproject/abstract-provider"
import { 
    errorMessages, pictures, createEVMErrorMessage,
    goodPrice, gasLimit, originalListingPrice,
} from './_data';
import {
    getMarketItemCreatedEvent,
    getSignersAddresses,
    getOwnerAndSeller
} from './_helperFns';

describe("Uploading NFTs", () => {
    let nftMarketContract: any;

    before(async () => {
        const NFTMarketContractFactory: ContractFactory = await ethers.getContractFactory("NFTMarket");
        let NFTMarketContract: Contract = await NFTMarketContractFactory.deploy();        
        nftMarketContract = await NFTMarketContract.deployed();
    });

    const createToken = async () => {
        const transaction: TransactionResponse = await nftMarketContract.createToken(
            pictures[0].name,
            pictures[0].description,
            pictures[0].url,
            goodPrice,
            { gasLimit, value: originalListingPrice }
        );
        return transaction;
    }

    it('should reject if missing listing price', async () => {
        try {
            await nftMarketContract.createToken(
                pictures[0].name,
                pictures[0].description,
                pictures[0].url,
                goodPrice,
                { gasLimit }
            );
        } catch (error: any) {
            expect(error.message).to.equal(
                createEVMErrorMessage(errorMessages.missingListingPrice)
            );
        }
    });

    it('should create a new nft when uploaded', async () => {
        const transaction: TransactionResponse = await createToken();
        const marketItemCreatedEvent = await getMarketItemCreatedEvent(transaction);
        const signers = await ethers.getSigners();
        const signerAddresses = getSignersAddresses(signers);
        const { owner, seller } = getOwnerAndSeller(marketItemCreatedEvent);

        expect(nftMarketContract.address).to.equal(owner);
        expect(signerAddresses[0]).to.equal(seller);
    });

    it('should transfer ownership of nft to market owner', async () => {
        const transaction: TransactionResponse = await nftMarketContract.createToken(
            pictures[0].name,
            pictures[0].description,
            pictures[0].url,
            goodPrice,
            { gasLimit, value: originalListingPrice }
        );
        const marketItemCreatedEvent = await getMarketItemCreatedEvent(transaction);
        const signers = await ethers.getSigners();
        const signerAddresses = getSignersAddresses(signers);
        const { owner, seller } = getOwnerAndSeller(marketItemCreatedEvent);

        expect(nftMarketContract.address).to.equal(owner);
        expect(signerAddresses[0]).to.equal(seller);
    });

    it('should add listing price ETH to market owner for hosting', async () => {
        const provider = waffle.provider;
        const balanceInWei = await provider.getBalance(nftMarketContract.address);
        const ethValue = ethers.utils.formatEther(balanceInWei);
        const formattedListingPrice = ethers.utils.formatEther(originalListingPrice);

        await createToken();

        let updatedBalanceInWei = await provider.getBalance(nftMarketContract.address);
        let updatedEthValue = ethers.utils.formatEther(updatedBalanceInWei);
        expect(updatedEthValue).to.equal(
            ethers.utils
                .formatEther(ethers.utils.parseUnits(ethValue, 18)
                .add(ethers.utils.parseUnits(formattedListingPrice, 18))
                .toString())
        );

        await createToken();

        updatedBalanceInWei = await provider.getBalance(nftMarketContract.address);
        updatedEthValue = ethers.utils.formatEther(updatedBalanceInWei);
        expect(updatedEthValue).to.equal(
            ethers.utils
                .formatEther(ethers.utils.parseUnits(ethValue, 18)
                .add(ethers.utils.parseUnits(formattedListingPrice, 18))
                .add(ethers.utils.parseUnits(formattedListingPrice, 18))
                .toString())
        );
    });
});
