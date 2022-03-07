require('dotenv').config();
const fs = require('fs');
const shell = require('child_process').execSync;

function deploy() {
    const { argv } = require('yargs');
    const { network } = argv;
    const serverDeploySrc = '../website/server/src/generated';
    const clientDeploySrc = '../website/client/src/generated';

    if (network == undefined) {
        console.log('no network provided! use `--network <NETWORK_NAME>`');
    } else {
        console.log('yarrr', network);
        const { exec } = require('child_process');
        exec(
            `hardhat --network ${network} deploy --export-all ${clientDeploySrc}/hardhat_contracts.json`, 
            (error: string, stdout: string, stderr: string) => {
                console.log(error, stdout, stderr);
                
            }
        );
    }

    // cannot export generated to multiple locations
    // so copy to server what was generated to client
    fs.rmSync(serverDeploySrc, { recursive: true, force: true });
    shell(`mkdir -p ${serverDeploySrc}`);
    shell(`cp -r ${clientDeploySrc}/* ${serverDeploySrc}`);
}

deploy();
