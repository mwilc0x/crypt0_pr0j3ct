import React, { ChangeEvent } from 'react';
import { WalletContext } from '../../contexts';
import FileUpload from '../../components/FileUpload';
import { loadImage } from '../../utils/dom';
import { getApiUrl } from '../../utils/api';
import './style.scss';

type FormSubmission = {
  name: string,
  description: string,
  tokenURI: string,
  price: string
};

const UploadNFT = () => {
  const { createNFT } = React.useContext(WalletContext);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [tokenURI, setTokenURI] = React.useState('');
  const [price, setPrice] = React.useState('');

  React.useEffect(() => {
    fetch(`${getApiUrl()}/image`)
      .then(res => res.json())
      .then(res => {
        console.log('fetching from API server', res);
      });
  }, []);

  async function validateInfo({ tokenURI }: FormSubmission) {
    let errors = [];
    try {
      await loadImage(tokenURI);
    } catch(e: any) {
      errors.push({ field: 'tokenURI', message: 'Failed to load image' });
    }
    return errors;
  }

  const handleFileUpload = (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    console.log('ready to upload file', Object.fromEntries(formData));
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

      <div className="create-nft-container">
        <FileUpload handleFileUpload={handleFileUpload} />

        <form className="form create-nft-inputs" onSubmit={handleSubmit}>
          <div className="form-section">
            <label htmlFor="name">NFT Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              pattern="[a-zA-Z][a-zA-Z0-9\s]*"
              placeholder="Name of item"
            />
          </div>

          <div className="form-section">
            <label htmlFor="description">NFT Description</label>
            <textarea
              id="description"
              name="description"
              placeholder="Enter a detailed description of your item."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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

        </form>
      </div>

      <button type="submit">Create NFT</button>
    </div>
  );
};

export default UploadNFT;
