import React from 'react';
import { useMutation } from 'urql';
import { WalletContext } from '../../contexts';
import FileUpload from '../../components/FileUpload';
import { CreateImage } from '../../graphql';
import { getApiUrl } from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import './style.scss';

const UploadNFT = () => {
  const { createNFT } = React.useContext(WalletContext);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [file, setFile] = React.useState<FormData | null>(null);
  const [savedId, setId] = React.useState<string>('');
  const [price, setPrice] = React.useState('');
  const [_, createImage] = useMutation(CreateImage);
  const navigate = useNavigate();

  const handleFileUpload = (formData: FormData) => {
    setFile(formData);
  }

  const handleSubmit = async (e: React.SyntheticEvent) => {
      e.preventDefault();
      if (!name || !description || !file || !price) {
        return;
      }
      
      try {  
        const { id } = await fetch(`${getApiUrl()}/image/save`, { method: 'POST', body: file }).then(res => res.json());
        await createNFT(name, description, id, price);
        navigate('/market');
      } catch (error) {
        console.log(error)
      }
  }

  return (
    <div className="page">
      <h1>Create NFT</h1>
      <div className="create-nft-container">
        <FileUpload handleFileUpload={handleFileUpload} />
        <form className="form create-nft-inputs">
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
            <label htmlFor="price">Listing Price (Ξ)</label>
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
      <button type="submit" onClick={handleSubmit}>Create NFT</button>
    </div>
  );
};

export default UploadNFT;
