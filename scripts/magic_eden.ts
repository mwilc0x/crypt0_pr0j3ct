const mainnet_url = 'https://api-mainnet.magiceden.dev/v2';

const api = {
    collections: {
        '/collections': '/collections?offset=${offset}&limit=${limit}',
        '/collections/:symbol/listings': '/collections/:symbol/listings?offset=0&limit=20',
        '/collections/:symbol/activities': '/collections/:symbol/activities?offset=0&limit=100',
        '/collections/:symbol/stats': '/collections/:symbol/stats'
    }
};

function getCollections(total = 1000) {
    let promises = [];
    let offset = 0;
    let limit = 500;
    let max = 500;

    for (; limit <= total; offset+=max, limit+=max) {
        console.log('yo', offset, limit);
        let url = `${mainnet_url}${api.collections['/collections']}`;
        url = url.replace('${offset}', offset).replace('${limit}', limit);
        promises.push(fetch(url).then(res => res.json()));
    }

    Promise.all(promises).then(res => {
        console.log('results', res);
        // TODO: write to file
    });
}

getCollections();