import React from 'react';
import EthLogo from '../../components/Logos/Eth';
import { NetworkContext, WalletContext } from '../../contexts';
import { getNetworkErrorStatus } from '../../services/network';
import './style.scss';

const Listings = () => {
  const { getNftListings, nftListings, sellNFT } = React.useContext(WalletContext);
  const { networkError } = React.useContext(NetworkContext);
  const [localNetworkErrorState, setLocalNetworkErrorState] = React.useState<boolean|null>(null);

  if (localNetworkErrorState === true && networkError.error === false) {
    getNftListings();
    setLocalNetworkErrorState(false);
  }

  if (
    (localNetworkErrorState === null || localNetworkErrorState === false) &&
    networkError.error === true
  ) {
    setLocalNetworkErrorState(true);
  }

  console.log(`Listings Local Error: ${localNetworkErrorState}, Network Error: ${networkError.error}`);

  React.useEffect(() => {
    async function setup() {
      const errorStatus = await getNetworkErrorStatus();

      if (!errorStatus.error) {
        getNftListings();
      } else {
        setLocalNetworkErrorState(true);
      }
    }
    setup();
  }, []);

  const buyNft = function(tokenId: number, price: number) {
    return function() {
      sellNFT(tokenId, price)
    }
  }

  return (
    <div className="page">        
        <ul className="listings">
          {nftListings.map((listing: any, i: number) => (
            <li key={i}>
              <div className="listing-image">
                <img src={listing.tokenUri} />
              </div>
              
              <div className="listing-info">
                <p>{listing.name}</p>
                
                <div className="listing-price">
                  <EthLogo />
                  <p>{listing.price}</p>
                </div>
              </div>

              <div className="listing-buy-now">
                <button onClick={buyNft(listing.tokenId, listing.price)}>Buy now</button>
              </div>
            </li>
          ))}
        </ul>
    </div>
  );
};

export default Listings;
