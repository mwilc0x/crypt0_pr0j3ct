import { TransactionResponse } from "@ethersproject/abstract-provider"

export const getMarketItemCreatedEvent = async (transaction: TransactionResponse) => {
    let receipt: any = await transaction.wait();
    const events = receipt.events?.filter((x: any) => {
        return (x.event == "MarketItemCreated");
    });
    return events[0];     
}

export const getTransferEvents = async (transaction: TransactionResponse) => {
    let receipt: any = await transaction.wait();
    const events = receipt.events?.filter((x: any) => {
        return (
            x.event == "Transfer"
        );
    });
    console.log('Events length:', events.length); 
    console.log(events);        
}

export const getSignersAddresses = (signers: any) => {
    return signers.map((signer: any) => signer.address);
}

export const getOwnerAndSeller = (event: any) => {
    let args = event.args;
    let seller = args[3];
    let owner = args[4];
    return { seller, owner };
}