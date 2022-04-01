import express from 'express';
import { getNetworkForChainId } from './util';
import contractJson from './generated/hardhat_contracts.json';

interface ContractsJson {
  [key: string]: {
    address: string,
    abi: Object
  }
}

const routes = {
  contract: '/contract/:chainId/:name'
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

export default router;
