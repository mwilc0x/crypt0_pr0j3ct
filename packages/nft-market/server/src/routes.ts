import express from 'express';
import { mintToken, readContracts } from './util';

interface ContractsJson {
  [key: string]: {
    address: string,
    abi: Object
  }
}

const routes = {
  mint: '/api/mint'
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

router.post(routes.mint, async (req, res) => {
    const { amount, chainId, contract, to } = req.body;
    let network, abi, mintResponse;

    try {
      const networkLookup = JSON.parse(process.env.NETWORK_CHAIN_ID_LOOKUP);
      network = networkLookup[chainId];
      const networkData = await readContracts();
      const contracts: ContractsJson = networkData[chainId][network].contracts;

      for (const c in contracts) {
        let { address } = contracts[c];
    
        if (address == contract) {
          abi = contracts[c].abi;
        }
      }

      mintResponse = await mintToken({ network, contract, abi, amount, to });
    } catch (e) {
      console.error(e);
      return res.status(400).json({status: 400, message: "mint failed"});
    }

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(mintResponse));
});

export default router;
