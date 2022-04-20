import fs from 'fs';
import path from 'path';
import { stat } from 'fs/promises';

const mainnet_url = 'https://api-mainnet.magiceden.dev/v2';

const api = {
    collections: {
        '/collections': '/collections?offset=${offset}&limit=${limit}',
        '/collections/:symbol/listings': '/collections/:symbol/listings?offset=0&limit=20',
        '/collections/:symbol/activities': '/collections/:symbol/activities?offset=0&limit=100',
        '/collections/:symbol/stats': '/collections/:symbol/stats'
    }
};

async function writeDataToFile(data) {
    const date = new Date().toISOString().split('T').join('-');
    const pathName = path.join(path.resolve(), 'data', 'magic-eden');
    const exists = await stat(pathName)
        .then(() => console.log('true'))
        .catch(async () => {
            await fs.promises.mkdir(pathName, { recursive: true });
        });

    try {
        const stringified = JSON.stringify(data);
        const prettified = JSON.stringify(JSON.parse(stringified), null, 2);
        fs.writeFile(
            path.join(path.resolve(), 'data', 'magic-eden', `${date}.json`), 
            prettified, 
        (err,res) => {
            if(err) console.log(err);
            console.log(res);
        });
    } catch (e) {
        console.log('error', e);
    }
}

function getCollections(total = 1000) {
    let promises = [];
    let offset = 0;
    let counter = 500;
    let limit = 500;

    for (; counter <= total; offset+=limit, counter+=limit) {
        let url = `${mainnet_url}${api.collections['/collections']}`;
        url = url.replace('${offset}', offset).replace('${limit}', limit);
        promises.push(fetch(url).then(res => res.json()));
    }

    Promise.all(promises).then(res => {
        console.log('results', res);
        // TODO: write to file
        writeDataToFile(res);
    });
}

getCollections(5000);
