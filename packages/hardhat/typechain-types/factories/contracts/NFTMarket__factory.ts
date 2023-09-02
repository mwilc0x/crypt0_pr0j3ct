/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { NFTMarket, NFTMarketInterface } from "../../contracts/NFTMarket";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "_fromTokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_toTokenId",
        type: "uint256",
      },
    ],
    name: "BatchMetadataUpdate",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "description",
        type: "string",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "seller",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "forSale",
        type: "bool",
      },
    ],
    name: "MarketItemCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
    ],
    name: "MetadataUpdate",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "cancelMarketSale",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "createMarketSale",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "description",
        type: "string",
      },
      {
        internalType: "string",
        name: "tokenURI",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
    ],
    name: "createToken",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "fetchMarketItems",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "description",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
          {
            internalType: "address payable",
            name: "seller",
            type: "address",
          },
          {
            internalType: "address payable",
            name: "owner",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "price",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "forSale",
            type: "bool",
          },
        ],
        internalType: "struct NFTMarket.MarketItem[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "fetchMyNFTs",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "description",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
          {
            internalType: "address payable",
            name: "seller",
            type: "address",
          },
          {
            internalType: "address payable",
            name: "owner",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "price",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "forSale",
            type: "bool",
          },
        ],
        internalType: "struct NFTMarket.MarketItem[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getListingPrice",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
    ],
    name: "resell",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_listingPrice",
        type: "uint256",
      },
    ],
    name: "updateListingPrice",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
    ],
    name: "updatePrice",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60806040526658d15e17628000600a553480156200001c57600080fd5b506040805180820182526007815266466f616d69657360c81b602080830191825283518085019094526004845263464f414d60e01b908401528151919291620000689160009162000099565b5080516200007e90600190602084019062000099565b5050600980546001600160a01b03191633179055506200017c565b828054620000a7906200013f565b90600052602060002090601f016020900481019282620000cb576000855562000116565b82601f10620000e657805160ff191683800117855562000116565b8280016001018555821562000116579182015b8281111562000116578251825591602001919060010190620000f9565b506200012492915062000128565b5090565b5b8082111562000124576000815560010162000129565b600181811c908216806200015457607f821691505b602082108114156200017657634e487b7160e01b600052602260045260246000fd5b50919050565b612722806200018c6000396000f3fe6080604052600436106101355760003560e01c806370a08231116100ab578063b88d4fde1161006f578063b88d4fde14610349578063be9af53614610369578063c87b56dd1461037c578063cfd825a21461039c578063e985e9c5146103bc578063efbe8fd11461040557600080fd5b806370a08231146102b457806382367b2d146102d457806395d89b41146102f4578063a22cb46514610309578063ae677aa31461032957600080fd5b806312e85585116100fd57806312e855851461020d578063202e37401461022c57806323b872dd1461024157806328cfac8a1461026157806342842e0e146102745780636352211e1461029457600080fd5b806301ffc9a71461013a57806306fdde031461016f578063081812fc14610191578063095ea7b3146101c95780630f08efe0146101eb575b600080fd5b34801561014657600080fd5b5061015a610155366004612232565b610418565b60405190151581526020015b60405180910390f35b34801561017b57600080fd5b50610184610443565b6040516101669190612492565b34801561019d57600080fd5b506101b16101ac3660046122f6565b6104d5565b6040516001600160a01b039091168152602001610166565b3480156101d557600080fd5b506101e96101e4366004612209565b6104fc565b005b3480156101f757600080fd5b50610200610617565b60405161016691906123c7565b34801561021957600080fd5b50600a545b604051908152602001610166565b34801561023857600080fd5b50610200610869565b34801561024d57600080fd5b506101e961025c36600461211b565b610b7d565b6101e961026f36600461230e565b610bae565b34801561028057600080fd5b506101e961028f36600461211b565b610d2e565b3480156102a057600080fd5b506101b16102af3660046122f6565b610d49565b3480156102c057600080fd5b5061021e6102cf3660046120cf565b610da9565b3480156102e057600080fd5b506101e96102ef36600461230e565b610e2f565b34801561030057600080fd5b50610184610edb565b34801561031557600080fd5b506101e96103243660046121cf565b610eea565b34801561033557600080fd5b506101e96103443660046122f6565b610ef9565b34801561035557600080fd5b506101e9610364366004612156565b610f64565b6101e96103773660046122f6565b610f9c565b34801561038857600080fd5b506101846103973660046122f6565b6111c7565b3480156103a857600080fd5b506101e96103b73660046122f6565b6112d8565b3480156103c857600080fd5b5061015a6103d73660046120e9565b6001600160a01b03918216600090815260056020908152604080832093909416825291909152205460ff1690565b61021e61041336600461226a565b6113ae565b60006001600160e01b03198216632483248360e11b148061043d575061043d8261143e565b92915050565b6060600080546104529061265a565b80601f016020809104026020016040519081016040528092919081815260200182805461047e9061265a565b80156104cb5780601f106104a0576101008083540402835291602001916104cb565b820191906000526020600020905b8154815290600101906020018083116104ae57829003601f168201915b5050505050905090565b60006104e08261148e565b506000908152600460205260409020546001600160a01b031690565b600061050782610d49565b9050806001600160a01b0316836001600160a01b0316141561057a5760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e656044820152603960f91b60648201526084015b60405180910390fd5b336001600160a01b0382161480610596575061059681336103d7565b6106085760405162461bcd60e51b815260206004820152603d60248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f7420746f60448201527f6b656e206f776e6572206f7220617070726f76656420666f7220616c6c0000006064820152608401610571565b61061283836114f0565b505050565b6060600061062460075490565b67ffffffffffffffff81111561064a57634e487b7160e01b600052604160045260246000fd5b60405190808252806020026020018201604052801561068357816020015b610670611f34565b8152602001906001900390816106685790505b50905060005b60075481101561086357600b60006106a2836001612616565b81526020019081526020016000206040518060e00160405290816000820180546106cb9061265a565b80601f01602080910402602001604051908101604052809291908181526020018280546106f79061265a565b80156107445780601f1061071957610100808354040283529160200191610744565b820191906000526020600020905b81548152906001019060200180831161072757829003601f168201915b5050505050815260200160018201805461075d9061265a565b80601f01602080910402602001604051908101604052809291908181526020018280546107899061265a565b80156107d65780601f106107ab576101008083540402835291602001916107d6565b820191906000526020600020905b8154815290600101906020018083116107b957829003601f168201915b50505091835250506002820154602082015260038201546001600160a01b03908116604083015260048301541660608201526005820154608082015260069091015460ff16151560a090910152825183908390811061084557634e487b7160e01b600052603260045260246000fd5b6020026020010181905250808061085b9061268f565b915050610689565b50919050565b6060600061087660075490565b905060008060015b8381116108eb576000818152600b60205260409020600401546001600160a01b03163314806108c657506000818152600b60205260409020600301546001600160a01b031633145b156108d9576108d6600184612616565b92505b806108e38161268f565b91505061087e565b5060008267ffffffffffffffff81111561091557634e487b7160e01b600052604160045260246000fd5b60405190808252806020026020018201604052801561094e57816020015b61093b611f34565b8152602001906001900390816109335790505b50905060015b848111610b74576000818152600b60205260409020600401546001600160a01b031633148061099c57506000818152600b60205260409020600301546001600160a01b031633145b15610b62576000818152600b602052604090819020815160e0810190925280549091908290829082906109ce9061265a565b80601f01602080910402602001604051908101604052809291908181526020018280546109fa9061265a565b8015610a475780601f10610a1c57610100808354040283529160200191610a47565b820191906000526020600020905b815481529060010190602001808311610a2a57829003601f168201915b50505050508152602001600182018054610a609061265a565b80601f0160208091040260200160405190810160405280929190818152602001828054610a8c9061265a565b8015610ad95780601f10610aae57610100808354040283529160200191610ad9565b820191906000526020600020905b815481529060010190602001808311610abc57829003601f168201915b50505091835250506002820154602082015260038201546001600160a01b03908116604083015260048301541660608201526005820154608082015260069091015460ff16151560a0909101528351849086908110610b4857634e487b7160e01b600052603260045260246000fd5b6020908102919091010152610b5e600185612616565b9350505b80610b6c8161268f565b915050610954565b50949350505050565b610b87338261155e565b610ba35760405162461bcd60e51b8152600401610571906124fb565b6106128383836115dc565b6000828152600b6020526040902060020154610bdc5760405162461bcd60e51b8152600401610571906125df565b6000828152600b60205260409020600401546001600160a01b03163314610c3e5760405162461bcd60e51b815260206004820152601660248201527527b7363c9037bbb732b91031b0b7103932b9b2b6361760511b6044820152606401610571565b6000828152600b602052604090206006015460ff1615610c995760405162461bcd60e51b815260206004820152601660248201527524ba32b69030b63932b0b23c903337b91039b0b6329760511b6044820152606401610571565b600a543414610ce35760405162461bcd60e51b815260206004820152601660248201527526b4b9b9b4b733903634b9ba34b73390383934b1b29760511b6044820152606401610571565b6000918252600b60205260409091206003810180546001600160a01b03199081163317909155600482018054909116301790556005810191909155600601805460ff19166001179055565b61061283838360405180602001604052806000815250610f64565b6000818152600260205260408120546001600160a01b03168061043d5760405162461bcd60e51b8152602060048201526018602482015277115490cdcc8c4e881a5b9d985b1a59081d1bdad95b88125160421b6044820152606401610571565b60006001600160a01b038216610e135760405162461bcd60e51b815260206004820152602960248201527f4552433732313a2061646472657373207a65726f206973206e6f7420612076616044820152683634b21037bbb732b960b91b6064820152608401610571565b506001600160a01b031660009081526003602052604090205490565b6000828152600b6020526040902060020154610e5d5760405162461bcd60e51b8152600401610571906125df565b6000828152600b60205260409020600301546001600160a01b03163314610ec65760405162461bcd60e51b815260206004820152601d60248201527f4f6e6c792073656c6c65722063616e207570646174652070726963652e0000006044820152606401610571565b6000918252600b602052604090912060050155565b6060600180546104529061265a565b610ef5338383611740565b5050565b6009546001600160a01b03163314610f5f5760405162461bcd60e51b8152602060048201526024808201527f4f6e6c79206f776e65722063616e20757064617465206c697374696e6720707260448201526334b1b29760e11b6064820152608401610571565b600a55565b610f6e338361155e565b610f8a5760405162461bcd60e51b8152600401610571906124fb565b610f968484848461180f565b50505050565b6000818152600b6020526040902060020154610fca5760405162461bcd60e51b8152600401610571906125df565b6000818152600b602052604090206006015460ff1615156001146110305760405162461bcd60e51b815260206004820152601860248201527f546f6b656e4964206973206e6f7420666f722073616c652e00000000000000006044820152606401610571565b6000818152600b60205260409020600301546001600160a01b031633141561109a5760405162461bcd60e51b815260206004820152601860248201527f43616e6e6f74207075726368617365206f776e204e46542e00000000000000006044820152606401610571565b6000818152600b602052604090206005015434146110fa5760405162461bcd60e51b815260206004820152601b60248201527f57726f6e672073616c6520616d6f756e742070726f76696465642e00000000006044820152606401610571565b6000818152600b602052604090206003810180546004830180546001600160a01b031990811633179091556006909301805460ff1916905591821690556001600160a01b031661114a6008611842565b6111553033846115dc565b600954600a546040516001600160a01b039092169181156108fc0291906000818181858888f19350505050158015611191573d6000803e3d6000fd5b506040516001600160a01b038216903480156108fc02916000818181858888f19350505050158015610612573d6000803e3d6000fd5b60606111d28261148e565b600082815260066020526040812080546111eb9061265a565b80601f01602080910402602001604051908101604052809291908181526020018280546112179061265a565b80156112645780601f1061123957610100808354040283529160200191611264565b820191906000526020600020905b81548152906001019060200180831161124757829003601f168201915b50505050509050600061128260408051602081019091526000815290565b9050805160001415611295575092915050565b8151156112c75780826040516020016112af92919061235b565b60405160208183030381529060405292505050919050565b6112d084611899565b949350505050565b6000818152600b60205260409020600201546113065760405162461bcd60e51b8152600401610571906125df565b6000818152600b60205260409020600301546001600160a01b0316331461136f5760405162461bcd60e51b815260206004820152601760248201527f4f6e6c792073656c6c65722063616e2063616e63656c2e0000000000000000006044820152606401610571565b6000908152600b602052604090206004810180546001600160a01b0319908116331790915560068201805460ff19169055600390910180549091169055565b6000600a5434146113fa5760405162461bcd60e51b815260206004820152601660248201527526b4b9b9b4b733903634b9ba34b73390383934b1b29760511b6044820152606401610571565b611408600780546001019055565b600061141360075490565b905061141f338261190d565b6114298185611a98565b61143586868386611b6a565b95945050505050565b60006001600160e01b031982166380ac58cd60e01b148061146f57506001600160e01b03198216635b5e139f60e01b145b8061043d57506301ffc9a760e01b6001600160e01b031983161461043d565b6000818152600260205260409020546001600160a01b03166114ed5760405162461bcd60e51b8152602060048201526018602482015277115490cdcc8c4e881a5b9d985b1a59081d1bdad95b88125160421b6044820152606401610571565b50565b600081815260046020526040902080546001600160a01b0319166001600160a01b038416908117909155819061152582610d49565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b60008061156a83610d49565b9050806001600160a01b0316846001600160a01b031614806115b157506001600160a01b0380821660009081526005602090815260408083209388168352929052205460ff165b806112d05750836001600160a01b03166115ca846104d5565b6001600160a01b031614949350505050565b826001600160a01b03166115ef82610d49565b6001600160a01b0316146116155760405162461bcd60e51b81526004016105719061259a565b6001600160a01b0382166116775760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f206164646044820152637265737360e01b6064820152608401610571565b826001600160a01b031661168a82610d49565b6001600160a01b0316146116b05760405162461bcd60e51b81526004016105719061259a565b600081815260046020908152604080832080546001600160a01b03199081169091556001600160a01b0387811680865260038552838620805460001901905590871680865283862080546001019055868652600290945282852080549092168417909155905184937fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b816001600160a01b0316836001600160a01b031614156117a25760405162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c6572000000000000006044820152606401610571565b6001600160a01b03838116600081815260056020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b61181a8484846115dc565b61182684848484611ca7565b610f965760405162461bcd60e51b815260040161057190612548565b8054806118915760405162461bcd60e51b815260206004820152601b60248201527f436f756e7465723a2064656372656d656e74206f766572666c6f7700000000006044820152606401610571565b600019019055565b60606118a48261148e565b60006118bb60408051602081019091526000815290565b905060008151116118db5760405180602001604052806000815250611906565b806118e584611db1565b6040516020016118f692919061235b565b6040516020818303038152906040525b9392505050565b6001600160a01b0382166119635760405162461bcd60e51b815260206004820181905260248201527f4552433732313a206d696e7420746f20746865207a65726f20616464726573736044820152606401610571565b6000818152600260205260409020546001600160a01b0316156119c85760405162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e746564000000006044820152606401610571565b6000818152600260205260409020546001600160a01b031615611a2d5760405162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e746564000000006044820152606401610571565b6001600160a01b038216600081815260036020908152604080832080546001019055848352600290915280822080546001600160a01b0319168417905551839291907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a45050565b6000828152600260205260409020546001600160a01b0316611b135760405162461bcd60e51b815260206004820152602e60248201527f45524337323155524953746f726167653a2055524920736574206f66206e6f6e60448201526d32bc34b9ba32b73a103a37b5b2b760911b6064820152608401610571565b60008281526006602090815260409091208251611b3292840190611f85565b506040518281527ff8e1a15aba9398e019f0b49df1a4fde98ee17ae345cb5f6b5e2c27f5033e8ce79060200160405180910390a15050565b6040805160e081018252858152602080820186905281830185905233606083015230608083015260a08201849052600160c08301526000858152600b8252929092208151805192939192611bc19284920190611f85565b506020828101518051611bda9260018501920190611f85565b506040820151600282015560608201516003820180546001600160a01b039283166001600160a01b031991821617909155608084015160048401805491909316911617905560a0820151600582015560c0909101516006909101805491151560ff19909216919091179055611c503330846115dc565b611c5e600880546001019055565b817f2e79ba74cd623b0364c4662c854da6c009f2eea3e839476e8c6038ba9234a36d85853330866001604051611c99969594939291906124a5565b60405180910390a250505050565b60006001600160a01b0384163b15611da957604051630a85bd0160e11b81526001600160a01b0385169063150b7a0290611ceb90339089908890889060040161238a565b602060405180830381600087803b158015611d0557600080fd5b505af1925050508015611d35575060408051601f3d908101601f19168201909252611d329181019061224e565b60015b611d8f573d808015611d63576040519150601f19603f3d011682016040523d82523d6000602084013e611d68565b606091505b508051611d875760405162461bcd60e51b815260040161057190612548565b805181602001fd5b6001600160e01b031916630a85bd0160e11b1490506112d0565b5060016112d0565b60606000611dbe83611e5c565b600101905060008167ffffffffffffffff811115611dec57634e487b7160e01b600052604160045260246000fd5b6040519080825280601f01601f191660200182016040528015611e16576020820181803683370190505b5090508181016020015b600019016f181899199a1a9b1b9c1cb0b131b232b360811b600a86061a8153600a8504945084611e4f57611e54565b611e20565b509392505050565b60008072184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b8310611e9b5772184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b830492506040015b6d04ee2d6d415b85acef81000000008310611ec7576d04ee2d6d415b85acef8100000000830492506020015b662386f26fc100008310611ee557662386f26fc10000830492506010015b6305f5e1008310611efd576305f5e100830492506008015b6127108310611f1157612710830492506004015b60648310611f23576064830492506002015b600a831061043d5760010192915050565b6040518060e0016040528060608152602001606081526020016000815260200160006001600160a01b0316815260200160006001600160a01b03168152602001600081526020016000151581525090565b828054611f919061265a565b90600052602060002090601f016020900481019282611fb35760008555611ff9565b82601f10611fcc57805160ff1916838001178555611ff9565b82800160010185558215611ff9579182015b82811115611ff9578251825591602001919060010190611fde565b50612005929150612009565b5090565b5b80821115612005576000815560010161200a565b600067ffffffffffffffff80841115612039576120396126c0565b604051601f8501601f19908116603f01168101908282118183101715612061576120616126c0565b8160405280935085815286868601111561207a57600080fd5b858560208301376000602087830101525050509392505050565b80356001600160a01b03811681146120ab57600080fd5b919050565b600082601f8301126120c0578081fd5b6119068383356020850161201e565b6000602082840312156120e0578081fd5b61190682612094565b600080604083850312156120fb578081fd5b61210483612094565b915061211260208401612094565b90509250929050565b60008060006060848603121561212f578081fd5b61213884612094565b925061214660208501612094565b9150604084013590509250925092565b6000806000806080858703121561216b578081fd5b61217485612094565b935061218260208601612094565b925060408501359150606085013567ffffffffffffffff8111156121a4578182fd5b8501601f810187136121b4578182fd5b6121c38782356020840161201e565b91505092959194509250565b600080604083850312156121e1578182fd5b6121ea83612094565b9150602083013580151581146121fe578182fd5b809150509250929050565b6000806040838503121561221b578182fd5b61222483612094565b946020939093013593505050565b600060208284031215612243578081fd5b8135611906816126d6565b60006020828403121561225f578081fd5b8151611906816126d6565b6000806000806080858703121561227f578384fd5b843567ffffffffffffffff80821115612296578586fd5b6122a2888389016120b0565b955060208701359150808211156122b7578485fd5b6122c3888389016120b0565b945060408701359150808211156122d8578384fd5b506122e5878288016120b0565b949793965093946060013593505050565b600060208284031215612307578081fd5b5035919050565b60008060408385031215612320578182fd5b50508035926020909101359150565b6000815180845261234781602086016020860161262e565b601f01601f19169290920160200192915050565b6000835161236d81846020880161262e565b83519083019061238181836020880161262e565b01949350505050565b6001600160a01b03858116825284166020820152604081018390526080606082018190526000906123bd9083018461232f565b9695505050505050565b60006020808301818452808551808352604092508286019150828160051b870101848801865b8381101561248457603f19898403018552815160e081518186526124138287018261232f565b915050888201518582038a87015261242b828261232f565b838a0151878b01526060808501516001600160a01b03908116918901919091526080808601519091169088015260a0808501519088015260c09384015115159390960192909252505093860193908601906001016123ed565b509098975050505050505050565b602081526000611906602083018461232f565b60c0815260006124b860c083018961232f565b82810360208401526124ca818961232f565b6001600160a01b039788166040850152959096166060830152506080810192909252151560a0909101529392505050565b6020808252602d908201527f4552433732313a2063616c6c6572206973206e6f7420746f6b656e206f776e6560408201526c1c881bdc88185c1c1c9bdd9959609a1b606082015260800190565b60208082526032908201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560408201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b606082015260800190565b60208082526025908201527f4552433732313a207472616e736665722066726f6d20696e636f72726563742060408201526437bbb732b960d91b606082015260800190565b60208082526017908201527f546f6b656e496420646f6573206e6f742065786973742e000000000000000000604082015260600190565b60008219821115612629576126296126aa565b500190565b60005b83811015612649578181015183820152602001612631565b83811115610f965750506000910152565b600181811c9082168061266e57607f821691505b6020821081141561086357634e487b7160e01b600052602260045260246000fd5b60006000198214156126a3576126a36126aa565b5060010190565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160e01b0319811681146114ed57600080fdfea2646970667358221220850ee7564fc9c22d8cba9610511aa81f2a9043e67b13932f802e0202ba5074aa64736f6c63430008040033";

type NFTMarketConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: NFTMarketConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class NFTMarket__factory extends ContractFactory {
  constructor(...args: NFTMarketConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: string }
  ): Promise<NFTMarket> {
    return super.deploy(overrides || {}) as Promise<NFTMarket>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: string }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): NFTMarket {
    return super.attach(address) as NFTMarket;
  }
  override connect(signer: Signer): NFTMarket__factory {
    return super.connect(signer) as NFTMarket__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): NFTMarketInterface {
    return new utils.Interface(_abi) as NFTMarketInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): NFTMarket {
    return new Contract(address, _abi, signerOrProvider) as NFTMarket;
  }
}
