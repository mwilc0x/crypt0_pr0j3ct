import { ethers } from "hardhat";

export const badPrice = ethers.utils.parseUnits('0.1', 'ether');
export const goodPrice = ethers.utils.parseUnits('0.2', 'ether');
export const originalListingPrice = ethers.utils.parseUnits('0.025', 'ether');
export const gasLimit = 1000000;

export const pictures = [
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

const EVMErrorPrepended = 'Error: VM Exception while processing transaction: reverted with reason string';
export const createEVMErrorMessage = (msg: string) => `${EVMErrorPrepended} '${msg}'`;
export const errorMessages = {
    tokenDoesNotExist: 'TokenId does not exist.',
    listingPriceOwner: 'Only owner updates listing price.',
    missingListingPrice: 'Missing listing price.',
    notForSale: 'TokenId is not for sale.',
    wrongPaymentAmountForSale: 'Wrong sale amount provided.'
};
