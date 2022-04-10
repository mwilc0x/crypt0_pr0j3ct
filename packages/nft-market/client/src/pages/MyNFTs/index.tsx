import React, { useMemo } from 'react';
import { useQuery } from 'urql';
import EthLogo from '../../components/Logos/Eth';
import ListingButton from '../../components/ListingButton';
import { NetworkContext, WalletContext } from '../../contexts';
import { getNetworkErrorStatus } from '../../services/network';
import './style.scss';

const UsersQuery = `
  query ($id: String!) {
    user (id: $id) {
      username
    }
  }
`;

const MyNFTs = () => {
  const { addresses, getMyNftListings, myNftListings } = React.useContext(WalletContext);
  const { appNetwork, userNetwork, networkError } = React.useContext(NetworkContext);
  const [localNetworkErrorState, setLocalNetworkErrorState] = React.useState<boolean|null>(null);

  const [result, reexecuteQuery] = useQuery({
    query: UsersQuery,
    variables: { id: addresses[0] },
    context: useMemo(() => ({
      pause: !addresses[0],
      clientName: 'fe-server'
    }), []),
  });

  const { data, fetching, error } = result;
  console.log('UsersQuery GraphQL:', data, fetching, error);

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

  if (localNetworkErrorState) {
    return (
      <div className="page">
        <h1>{userNetwork.name} network is not currently supported.</h1>
        <h1>Please switch to {appNetwork.name} network.</h1>
      </div>
    );
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
                <ListingButton listing={listing} />
              </div>
            </li>
          ))}
        </ul>
    </div>
  );
};

export default MyNFTs;
