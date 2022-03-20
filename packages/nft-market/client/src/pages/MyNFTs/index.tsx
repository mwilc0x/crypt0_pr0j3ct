import React from 'react';
import EthLogo from '../../components/Logos/Eth';
import { NetworkContext, WalletContext } from '../../contexts';
import { getNetworkErrorStatus } from '../../services/network';
import './style.scss';

const MyNFTs = () => {
  const { getMyNftListings, myNftListings, sellNFT } = React.useContext(WalletContext);
  const { networkError } = React.useContext(NetworkContext);
  const [localNetworkErrorState, setLocalNetworkErrorState] = React.useState<boolean|null>(null);

  if (localNetworkErrorState === true && networkError.error === false) {
    getMyNftListings();
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
        getMyNftListings();
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
        { !myNftListings.length && <h1>Nothing to see here yet!</h1> }

        <ul className="listings">
          {myNftListings.map((listing: any, i: number) => (
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

export default MyNFTs;
