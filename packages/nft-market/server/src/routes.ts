import express from 'express';
import { getNetworkForChainId } from './util';
import contractJson from './generated/hardhat_contracts.json';


// TODO: split out route services
import { getUsers } from './db';


interface ContractsJson {
  [key: string]: {
    address: string,
    abi: Object
  }
}

const routes = {
  contract: '/contract/:chainId/:name'
  users: '/users'
}

const router = express.Router();
router.use(express.json());
if (process.env.NODE_ENV == 'development') {
  router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:1337");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
}

router.get(routes.contract, (req, res) => {
  const { chainId, name } = req.params;

  try {
    const network = getNetworkForChainId(chainId).toLowerCase();
    const contract = contractJson[chainId][network]['contracts'][name];
    res.status(200).json(contract);
  } catch (error: any) {
    console.error('contract error');
    res.status(500);
  }
});

router.get(routes.users, async (req, res) => {
  try {
    const users = await getUsers();
    res.status(200).json(users);
  } catch (error: any) {
    console.error('users error');
    res.status(500);
  }
})

export default router;
