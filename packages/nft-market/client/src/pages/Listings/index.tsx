import React from 'react';
import EthLogo from '../../components/Logos/Eth';
import ListingButton from '../../components/ListingButton';
import { NetworkContext, WalletContext } from '../../contexts';
import { getNetworkErrorStatus } from '../../services/network';
import './style.scss';

const Listings = () => {
  const { getNftListings, nftListings } = React.useContext(WalletContext);
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
      }
    }
    setup();
  }, []);

  if (localNetworkErrorState) {
    return (
      <div className="page">
        <h1>Network not supported</h1>
      </div>
    );
  }

  return (
    <div className="page">
      { !nftListings.length && <h1>Nothing to see here yet!</h1> }
   
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
                <ListingButton listing={listing} />
              </div>
            </li>
          ))}
        </ul>
    </div>
  );
};

export default Listings;
