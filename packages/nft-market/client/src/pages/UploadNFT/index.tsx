import React from 'react';
import { WalletContext } from '../../contexts';
import { loadImage } from '../../utils/dom';
import './style.scss';

const UploadNFT = () => {
  const { createNFT } = React.useContext(WalletContext);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [tokenURI, setTokenURI] = React.useState('');
  const [price, setPrice] = React.useState('');

  type FormSubmission = {
    name: string,
    description: string,
    tokenURI: string,
    price: string
  };

  async function validateInfo({ tokenURI }: FormSubmission) {
    let errors = [];
    try {
      await loadImage(tokenURI);
    } catch(e: any) {
      errors.push({ field: 'tokenURI', message: 'Failed to load image' });
    }
    return errors;
  }

  const handleSubmit = async (e: React.SyntheticEvent) => {
      e.preventDefault();

      if (!name || !description || !tokenURI || !price) {
        console.log('Please fill out all information');
        return;
      }

      const errors = await validateInfo({ name, description, tokenURI, price });

      if (errors.length) {
        errors.map(console.log);
        return;
      }

      try {
        const transaction = await createNFT(name, description, tokenURI, Number(price));
        console.log('Created NFT', transaction);
      } catch (e) {
        console.error('Error submitting transaction.', e)
      }
  }

  return (
    <div className="page">
      <h1>Create NFT</h1>

      <form className="form create-nft" onSubmit={handleSubmit}>
        <div className="form-section">
          <label htmlFor="name">NFT Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            pattern="[a-zA-Z][a-zA-Z0-9\s]*"
          />
        </div>

        <div className="form-section">
          <label htmlFor="description">NFT Description</label>
          <input
            id="description"
            name="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            pattern="[a-zA-Z][a-zA-Z0-9\s]*"
          />
        </div>

        <div className="form-section">
          <label htmlFor="token-uri">Valid Image URL</label>
          <input
            id="token-uri"
            name="token-uri"
            type="text"
            value={tokenURI}
            onChange={(e) => setTokenURI(e.target.value)} 
          />
        </div>

        <div className="form-section">
          <label htmlFor="price">Ethereum (Ξ) Listing Price</label>
          <input
            id="price"
            name="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="small"
            min="0"
          />
        </div>

        <button type="submit">Create NFT</button>
      </form>
    </div>
  );
};

export default UploadNFT;
