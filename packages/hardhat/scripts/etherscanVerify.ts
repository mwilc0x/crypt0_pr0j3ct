require('dotenv').config();

// args: network, contract
function etherscanVerify() {
    const { argv } = require('yargs');
    const { contract, network } = argv;

    // TODO check for flags!!!!
    // We do not need to include the '0x' for the contract address
    // yarn hardhat:etherscan-verify --network rinkeby --contract '0B3EbbaDF83210FAa84334B513723d4Cd51Ff1e7'

    if (contract == undefined || network == undefined) {
        console.log('contract or network not provided. use --network and --contract flags');
    } else {
        console.log(argv);
        const { exec } = require('child_process');
        exec(
            `hardhat verify --network ${network} 0x${contract}`, // pass flags here in quotes "flag1" "flag2"
            (error: string, stdout: string, stderr: string) => {
                console.log(error, stdout, stderr);
            }
        );
    }
}

etherscanVerify();
