import { expect } from "chai";
import { ethers } from "hardhat";
import { Contract } from '@ethersproject/contracts';

describe("NFT Market", function () {
    let market: Contract;
    const badPrice = ethers.utils.parseUnits('0.1', 'ether');
    const goodPrice = ethers.utils.parseUnits('0.2', 'ether');
    const listingPrice = ethers.utils.parseUnits('0.025', 'ether');
    const gasLimit = 1000000;

    const EVMErrorPrepended = 'Error: VM Exception while processing transaction: reverted with reason string';
    const createEVMErrorMessage = (msg: string) => `${EVMErrorPrepended} '${msg}'`;
    const errorMessages = {
        badSalePrice: 'Do not exist mang.',
        listingPriceOwner: 'Only owner updates listing price.',
        missingListingPrice: 'Missing listing price.',
        wrongSaleAmount: 'Wrong sale amount provided.'
    };

    const pictures = [
        {
            name: 'Puppers',
            description: 'The cutest puppy ever did see.',
            url: 'https://picsum.photos/id/237/200/300'
        },
        {
            name: 'Mountain Peaks',
            description: 'To the top!',
            url: 'https://picsum.photos/seed/picsum/200/300',
        }
    ];

    before(async () => {
        const NFTMarket = await ethers.getContractFactory("NFTMarket");
        market = await NFTMarket.deploy();        
        await market.deployed();
    });

    describe('MARKET RULES', function() {
        it("should have a listing price of 0.025 ether", async function () {
            const listingPrice = await market.getListingPrice();
            const convertedListingPrice = Number(ethers.utils.formatEther(listingPrice));
            expect(convertedListingPrice).equal(0.025);
        });
    });

    describe('UPLOADING NFTS', function() {
        it('should reject if missing listing price', async function() {
            try {
                await market.createToken(
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

        it('should create a new nft when uploaded', async function() {
            await market.createToken(
                pictures[0].name,
                pictures[0].description,
                pictures[0].url,
                goodPrice,
                { gasLimit, value: listingPrice }
            );
        });
    });

    describe('SELLING NFTs', function() {
        it('should reject sale if passing wrong tokenId', async function() {
            const [_, buyerAddress] = await ethers.getSigners();
    
            try {
                await market.connect(buyerAddress).createMarketSale(5, { value: goodPrice, gasLimit });
            } catch (error: any) {
                expect(error.message).to.equal(
                    createEVMErrorMessage(errorMessages.badSalePrice)
                );
            }
        });
    
        it('should reject sale if passing wrong sale amount', async function() {
            const [_, buyerAddress] = await ethers.getSigners();
    
            try {
                await market.connect(buyerAddress).createMarketSale(1, { value: badPrice, gasLimit });
            } catch (error: any) {
                expect(error.message).to.equal(
                    createEVMErrorMessage(errorMessages.wrongSaleAmount)
                );
            }
        });
    
        it('should create a sale when buyer steps in', async function () {
            const [_, buyerAddress] = await ethers.getSigners();
            // hardhat.org/guides/waffle-testing.html#testing-from-a-different-account
            await market.connect(buyerAddress).createMarketSale(1, { value: goodPrice, gasLimit });
        });
    });

    describe('FINDING ALL NFTS', function() {
        it('should return correct # of listed nfts', async function () {
            await market.createToken(
                pictures[0].name,
                pictures[0].description,
                pictures[0].url,
                goodPrice,
                { gasLimit, value: listingPrice }
            );
            await market.createToken(
                pictures[1].name,
                pictures[1].description,
                pictures[1].url,
                goodPrice,
                { gasLimit, value: listingPrice }
            );
    
            const items = await market.fetchMarketItems();
            expect(items.length).to.equal(2);
            //console.log('holler!', items, items.length);
        });
    });

    describe('FINDING USER NFTS', function() {
        it ('should return correct # of listed nft for user', async function () {});
    });
});
