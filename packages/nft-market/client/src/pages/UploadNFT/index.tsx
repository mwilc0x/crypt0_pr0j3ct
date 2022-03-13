import React from 'react';
import { WalletContext } from '../../contexts';
import './style.scss';

const UploadNFT = () => {
  const { createNFT } = React.useContext(WalletContext);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [tokenURI, setTokenURI] = React.useState('');
  const [price, setPrice] = React.useState('');

  function handleSubmit(e: React.SyntheticEvent) {
      e.preventDefault();

      if (!name || !description || !tokenURI || !price) {
        console.log('Please fill out all information');
        return;
      }

      try {
        createNFT(name, description, tokenURI, Number(price));
      } catch (e) {
        console.error('Error submitting transaction.', e)
      }
  }

  return (
    <div className="page">
      <h1>Create NFT</h1>

      <form className="form create-nft" onSubmit={handleSubmit}>
        <div className="form-section">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)} 
          />
        </div>

        <div className="form-section">
          <label htmlFor="description">Description</label>
          <input
            id="description"
            name="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)} 
          />
        </div>

        <div className="form-section">
          <label htmlFor="token-uri">Token URI</label>
          <input
            id="token-uri"
            name="token-uri"
            type="text"
            value={tokenURI}
            onChange={(e) => setTokenURI(e.target.value)} 
          />
        </div>

        <div className="form-section">
          <label htmlFor="price">Price</label>
          <input
            id="price"
            name="price"
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="small"
          />
        </div>

        <button type="submit">Create NFT</button>
      </form>
    </div>
  );
};

export default UploadNFT;
