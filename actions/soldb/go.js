const fs = require('fs');
require('dotenv/config');

async function main() {
    console.log('howdy from nodejs land');
    console.log(process.env);

    const eventData = await readfile(process.env.GITHUB_EVENT_PATH);
    console.log(eventData);
}

function readFile(path) {
    return new Promise((resolve) => {
        try {
            fs.readFile(path, {}, (err, data) => {
                if (err) {
                    console.log(err);
                    resolve([]);
                    return;
                }
                const json = JSON.parse(data.toString());
                resolve(json);
            });
        } catch (error) {
            console.log(error);
            resolve([]);
        }
    });
}

main();
