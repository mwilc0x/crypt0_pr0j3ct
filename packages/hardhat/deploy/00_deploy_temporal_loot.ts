import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
require('hardhat-ethernal');


const func: DeployFunction = async function (hre: any) {
  const { getNamedAccounts, deployments } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts(); // lookup from hardhat.config
  const loot = await deploy('TemporalLoot', {
    from: deployer,
    args: [],
    log: true,
  });

  // await hre.ethernal.push({
  //   name: 'TemporalLoot',
  //   address: loot.address
  // });
};
export default func;
func.tags = ['TemporalLoot'];

/*
Tenderly verification
let verification = await tenderly.verify({
  name: contractName,
  address: contractAddress,
  network: targetNetwork,
});
*/