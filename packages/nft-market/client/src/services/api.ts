import { getApiUrl } from '../utils/api';

type nftForSave = {
    name: string;
    description: string;
    file: FormData;
    price: number;
}

export async function saveImageForURL(data: nftForSave) {
    try {
        const result = await fetch(
            `${getApiUrl()}/image/save`,
            { 
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data) 
            }
        ).then(res => res.json());
        return result;
    } catch (error) {
        console.log(error);
    }
}
