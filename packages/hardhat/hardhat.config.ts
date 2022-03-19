require('dotenv').config({ path: '../../.env' });

import * as fs from 'fs';

import { HardhatUserConfig, task } from "hardhat/config";
import "hardhat-deploy";
import "@nomiclabs/hardhat-ethers";
import { HttpNetworkUserConfig } from 'hardhat/types';
import "@typechain/hardhat";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "solidity-coverage";

import * as bip39 from 'bip39';
import { hdkey } from 'ethereumjs-wallet';
import * as EthUtil from 'ethereumjs-util';

import qrcode from 'qrcode-terminal';
import yargs from 'yargs';

// require("hardhat-ethernal");

const argv: any = yargs.argv;
console.log('hardhat.config command line args:', argv.network);
const TARGET_NETWORK = 'localhost';

const mnemonicPath = './generated/mnemonic.secret';
const getMnemonic = () => {
  try {
    return fs.readFileSync(mnemonicPath).toString().trim();
  } catch (e) {
    // @ts-ignore
    if (TARGET_NETWORK !== 'localhost') {
      console.log('☢️ WARNING: No mnemonic file created for a deploy account. Try `yarn run generate` and then `yarn run account`.');
    }
  }
  return '';
};

const config: HardhatUserConfig = {
  defaultNetwork: TARGET_NETWORK,
  namedAccounts: {
    deployer: {
      default: 0, // here this will by default take the first account as deployer
    },
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    hardhat: {
      // chainId: 1337
    },
    rinkeby: {
      url: 'https://rinkeby.infura.io/v3/c582da34f3284dc386db2403aff0781a',
      accounts: {
        mnemonic: getMnemonic(),
      },
    },
    coverage: {
      url: "http://127.0.0.1:8555", // Coverage launches its own ganache-cli client
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API
  }
};

console.log('Etherscan API in the house.', process.env.ETHERSCAN_API);

const DEBUG = true;

function debug(text: string) {
  if (DEBUG) {
    console.log(text);
  }
}

task('generate', 'Create a mnemonic for builder deploys', async (_, { ethers }) => {
  const mnemonic = bip39.generateMnemonic();
  if (DEBUG) console.log('mnemonic:', mnemonic);
  const seed = await bip39.mnemonicToSeed(mnemonic);
  if (DEBUG) console.log('seed', seed);
  const hdwallet = hdkey.fromMasterSeed(seed);
  const wallet_hdpath = "m/44'/60'/0'/0/";
  const account_index = 0;
  const fullPath = wallet_hdpath + account_index;
  if (DEBUG) console.log('fullPath', fullPath);
  const wallet = hdwallet.derivePath(fullPath).getWallet();
  const privateKey = `0x${wallet.getPrivateKey()}`;
  if (DEBUG) console.log('privateKey', privateKey);
  const address = `0x${EthUtil.privateToAddress(wallet.getPrivateKey()).toString('hex')}`;
  console.log(`🔐 Account Generated as ${address} and set as mnemonic in packages/hardhat`);
  console.log("💬 Use 'yarn run account' to get more information about the deployment account.");

  fs.writeFileSync(`./generated/${address}.secret`, mnemonic.toString());
  fs.writeFileSync(mnemonicPath, mnemonic.toString());
});

task('private-key', 'Get private key for the deployment account.', async (_, { ethers }) => {
  const mnemonic = fs.readFileSync(mnemonicPath).toString().trim();
  // if (DEBUG) console.log('mnemonic', mnemonic);
  const seed = await bip39.mnemonicToSeed(mnemonic);
  // if (DEBUG) console.log('seed', seed);
  const hdwallet = hdkey.fromMasterSeed(seed);
  const wallet_hdpath = "m/44'/60'/0'/0/";
  const account_index = 0;
  const fullPath = wallet_hdpath + account_index;
  // if (DEBUG) console.log('fullPath', fullPath);
  const wallet = hdwallet.derivePath(fullPath).getWallet();
  const address = `0x${EthUtil.privateToAddress(wallet.getPrivateKey()).toString('hex')}`;
  console.log(address);
  // const address = EthUtil.privateToAddress(wallet.getPrivateKey());
  // console.log(address);
});

task('account', 'Get balance informations for the deployment account.', async (_, { ethers }) => {
  const mnemonic = fs.readFileSync(mnemonicPath).toString().trim();
  if (DEBUG) console.log('mnemonic', mnemonic);
  const seed = await bip39.mnemonicToSeed(mnemonic);
  if (DEBUG) console.log('seed', seed);
  const hdwallet = hdkey.fromMasterSeed(seed);
  const wallet_hdpath = "m/44'/60'/0'/0/";
  const account_index = 0;
  const fullPath = wallet_hdpath + account_index;
  if (DEBUG) console.log('fullPath', fullPath);
  const wallet = hdwallet.derivePath(fullPath).getWallet();
  const privateKey = `0x${wallet.getPrivateKey()}`;
  if (DEBUG) console.log('privateKey', privateKey);
  const address = `0x${EthUtil.privateToAddress(wallet.getPrivateKey()).toString('hex')}`;

  qrcode.generate(address);
  console.log(`‍📬 Deployer Account is ${address}`);
  for (const n in config.networks) {
    // console.log(config.networks[n],n)
    try {
      const { url } = config.networks[n] as HttpNetworkUserConfig;
      const provider = new ethers.providers.JsonRpcProvider('');
      const balance = await provider.getBalance(address);
      console.log(` -- ${n} --  -- -- 📡 `);
      console.log(`   balance: ${ethers.utils.formatEther(balance)}`);
      console.log(`   nonce: ${await provider.getTransactionCount(address)}`);
    } catch (e) {
      if (DEBUG) {
        console.log(e);
      }
    }
  }
});

export default config;

// task('balance', "Prints an account's balance")
//   .addPositionalParam('account', "The account's address")
//   .setAction(async (taskArgs, { ethers }) => {
//     const balance = await ethers.provider.getBalance(await findFirstAddr(ethers, taskArgs.account));
//     console.log(formatUnits(balance, 'ether'), 'ETH');
//   });

//   const findFirstAddr = async (ethers: TEthers, addr: string) => {
//     if (isAddress(addr)) {
//       return getAddress(addr);
//     }
//     const accounts = await ethers.provider.listAccounts();
//     if (accounts !== undefined) {
//       const temp = accounts.find((f: string) => f === addr);
//       if (temp?.length) return temp[0];
//     }
//     throw `Could not normalize address: ${addr}`;
//   };
