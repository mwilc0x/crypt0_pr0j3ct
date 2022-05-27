export async function allAccess(req, res) {
    console.log('Found broker on request', req._broker);

    try {
        const publication = await req._broker.publish('email_publication', { hello: 'world!' });
        publication.on('success', console.warn);
        publication.on('error', console.error);
    } catch (error) {
        console.log('Error publishing message to broker.', error);
    }

    res.status(200).send('Public Content.');
};
  
export function userBoard(req, res) {
    res.status(200).send('User Content.');
};
  
export function adminBoard(req, res) {
    res.status(200).send('Admin Content.');
};
  
export function moderatorBoard(req, res) {
    res.status(200).send('Moderator Content.');
};
