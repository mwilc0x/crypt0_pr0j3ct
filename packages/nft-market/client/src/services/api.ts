import { getApiUrl } from '../utils/api';

export async function saveImageForURL(data: NFTForSave) {
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
