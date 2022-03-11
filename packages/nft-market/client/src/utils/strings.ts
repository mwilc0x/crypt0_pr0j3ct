export default {
    contractNotFound: 'contract not found',
    mintError: 'error minting token',
    mintEndpoint: '/api/mint',
    noWalletConnected: 'no wallet connected!',
    tokenMin: (count: number) => `token must be greater than ${count}`,
    tokenMax: (count: number) => `token cannot be greater than ${count}`
};