type FileUpload = {
    name: string;
    data: any;
};

type NFTForSave = {
    name: string;
    description: string;
    file: FileUpload;
    price: number;
}

interface FullContract {
    [key: string]: {
        [key: string]: { contracts: {
            [key: string]: { address: string, abi: Object[] }
        }}
    }
}

interface User {
    username: string;
    ethereum_key: string;
}

interface PartialContract {
    address: string,
    abi: Object[]
}

type Listing = {
    name: string;
    description: string;
    tokenId: number;
    tokenUri: string;
    seller: string;
    owner: string;
    price: number|string;
    forSale: boolean;
}

type FormSubmission = {
    name: string,
    description: string,
    file: FileUpload,
    price: string
};
