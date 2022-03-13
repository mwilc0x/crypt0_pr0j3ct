import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
require('hardhat-ethernal');

const func: DeployFunction = async function (hre: any) {
  const { getNamedAccounts, deployments } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts(); // lookup from hardhat.config
  const wool = await deploy('WOOL', {
    from: deployer,
    log: true,
  });

  // await hre.ethernal.push({
  //   name: 'WOOL',
  //   address: wool.address
  // });
};
export default func;
func.tags = ['WOOL'];
