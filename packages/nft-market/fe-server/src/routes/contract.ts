import { Request, Response, Router } from 'express';
import { getNetworkForChainId } from '../util';
import contractJson from '../generated/hardhat_contracts.json';

const router = Router();

router.get('/:chainId/:name', (req: Request, res: Response) => {
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
