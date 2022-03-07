require('dotenv').config();

function fork() {
    const { argv } = require('yargs');
    const { network } = argv;

    if (network == undefined) {
        console.log('no network provided! use `--network <NETWORK_NAME>`');
    } else {
        console.log('yarr', network, process.env.RINKEBY_INFURA_KEY);
        const { exec } = require('child_process');
        exec(
            `hardhat node --fork https://mainnet.infura.io/v3/${process.env.RINKEBY_INFURA_KEY}`, 
            (error: string, stdout: string, stderr: string) => {
                console.log(error, stdout, stderr);
            }
        );
    }
}

fork();
