// import { HardhatRuntimeEnvironment } from 'hardhat/types';
// import { DeployFunction } from 'hardhat-deploy/types';

// const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
//     const { ethers, getNamedAccounts, deployments } = hre;
//     const { deploy } = deployments;
//     const { deployer } = await getNamedAccounts(); // lookup from hardhat.config

//     // Get previously deployed contracts
//     const TraitsContract = await ethers.getContract("Traits", deployer);
//     const WoolContract = await ethers.getContract("WOOL", deployer);
    
//     await deploy('Woolf', {
//         from: deployer,
//         args: [
//           WoolContract.address,
//           TraitsContract.address,
//           50000
//         ],
//         log: true,
//     });
// };
// export default func;
// func.tags = ['Woolf'];
