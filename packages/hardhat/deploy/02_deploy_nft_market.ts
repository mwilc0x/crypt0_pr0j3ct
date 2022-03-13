import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
require('hardhat-ethernal');

const func: DeployFunction = async function (hre: any) {
  const { getNamedAccounts, deployments } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts(); // lookup from hardhat.config
  const nftMarket = await deploy('NFTMarket', {
    from: deployer,
    args: [],
    log: true,
  });

  // await hre.ethernal.push({
  //   name: 'NFTMarket',
  //   address: nftMarket.address
  // });
};
export default func;
func.tags = ['NFTMarket'];

/*
Tenderly verification
let verification = await tenderly.verify({
  name: contractName,
  address: contractAddress,
  network: targetNetwork,
});
*/