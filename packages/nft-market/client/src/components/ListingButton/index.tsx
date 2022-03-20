import React from 'react';
import { WalletContext } from '../../contexts';

type Props = {
    listing: any;
};
const ListingButton = ({ listing }: Props) => {
    const { addresses, sellNFT, cancelSale } = React.useContext(WalletContext);

    let user = addresses[0] || '';
    let { tokenId, price, owner = '', seller = '', forSale } = listing;

    user = user.toLowerCase();
    owner = owner.toLowerCase();
    seller = seller.toLowerCase();

    const buyNft = function() {
        return function() {
          sellNFT(tokenId, price)
        }
    }

    const cancelNft = function() {
        return function() {
            cancelSale(tokenId);
        }
    }

    if (!forSale && user !== owner && user !== seller) {
        return (<button onClick={() => {}}>Make offer</button>);
    }

    if (!forSale && user === owner) {
        return (<button onClick={() => {}}>Sell</button>);
    }

    if (forSale && user === seller) {
        return (<button onClick={cancelNft()}>Cancel</button>);
    }

    if (forSale && user !== owner && user !== seller) {
        return (<button onClick={buyNft()}>Buy now</button>);
    }

    return null;
}

export default ListingButton;
