import { ethers } from "hardhat";

export const badPrice = ethers.utils.parseUnits('0.1', 'ether');
export const goodPrice = ethers.utils.parseUnits('0.2', 'ether');
export const reSalePrice = ethers.utils.parseUnits('1', 'ether');
export const updateSalePrice = ethers.utils.parseUnits('5', 'ether');
export const originalListingPrice = ethers.utils.parseUnits('0.025', 'ether');
export const gasLimit = 1000000;

export const pictures = [
    {
        name: '✨ Space and Time✨',
        description: 'Take a mind trip.',
        url: 'https://picsum.photos/id/40/300',
    },
    {
        name: '✨ Space and Time✨',
        description: 'Take a mind trip.',
        url: 'https://picsum.photos/id/41/300',
    },
    {
        name: '✨ Space and Time✨',
        description: 'Take a mind trip.',
        url: 'https://picsum.photos/id/42/300',
    },
    {
        name: '✨ Space and Time✨',
        description: 'Take a mind trip.',
        url: 'https://picsum.photos/id/43/300',
    },
    {
        name: '✨ Space and Time✨',
        description: 'Take a mind trip.',
        url: 'https://picsum.photos/id/44/300',
    },
    {
        name: '✨ Space and Time✨',
        description: 'Take a mind trip.',
        url: 'https://picsum.photos/id/99/300',
    },
];

const EVMErrorPrepended = 'Error: VM Exception while processing transaction: reverted with reason string';
export const createEVMErrorMessage = (msg: string) => `${EVMErrorPrepended} '${msg}'`;
export const errorMessages = {
    cancelSaleSellerOnly: 'Only seller can cancel.',
    tokenDoesNotExist: 'TokenId does not exist.',
    listingPriceOwner: 'Only owner can update listing price.',
    missingListingPrice: 'Missing listing price.',
    notForSale: 'TokenId is not for sale.',
    wrongPaymentAmountForSale: 'Wrong sale amount provided.',
    onlyOwnerReSell: 'Only owner can resell.',
    onlySellerReSell: 'Only seller can resell.',
    onlySellerUpdatePrice: 'Only seller can update price.'
};
