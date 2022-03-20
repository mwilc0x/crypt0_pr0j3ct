import React from 'react';

type Props = {
    addresses: String[];
    listing: any;
};
const ListingButton = ({ addresses, listing }: Props) => {
    let user = addresses[0] || '';
    let { owner = '', seller = '', forSale } = listing;

    user = user.toLowerCase();
    owner = owner.toLowerCase();
    seller = seller.toLowerCase();

    if (!forSale && user !== owner && user !== seller) {
        return (<button onClick={() => {}}>Make offer</button>);
    }

    if (!forSale && user === owner) {
        return (<button onClick={() => {}}>Sell</button>);
    }

    if (forSale && user === seller) {
        return (<button onClick={() => {}}>Cancel</button>);
    }

    if (forSale && user !== owner && user !== seller) {
        return (<button onClick={() => {}}>Buy now</button>);
    }

    return null;
}

export default ListingButton;
