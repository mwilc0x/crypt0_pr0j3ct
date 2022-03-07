// import { HardhatRuntimeEnvironment } from 'hardhat/types';
// import { DeployFunction } from 'hardhat-deploy/types';

// const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
//     const { ethers, getNamedAccounts, deployments } = hre;
//     const { deploy } = deployments;
//     const { deployer } = await getNamedAccounts(); // lookup from hardhat.config

//     // Get previously deployed contracts
//     const WoolfContract = await ethers.getContract("Woolf", deployer);
//     const WoolContract = await ethers.getContract("WOOL", deployer);
    
//     await deploy('Barn', {
//         from: deployer,
//         args: [
//           WoolfContract.address,
//           WoolContract.address
//         ],
//         log: true,
//     });
// };
// export default func;
// func.tags = ['Barn'];
