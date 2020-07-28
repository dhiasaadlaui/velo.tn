export interface Category {
    id: number;
    name: string;
    description: string;
    image: string;
}
export interface Product {
    id: number;
    owner: number;
    creationDate: string;
    name: string;
    description: string;
    images: string;
    price: number;
    startingBid: number;
    available: boolean;
    category: number;
}
export interface MarketService {
    id: number;
    type: string;
    name: string;
    description: string;
    price: string;
}
export interface Bid {
    id: number;
    bid: number;
    owner: number;
    targetType: string;
    targetIdentifier: number;
    status: string;
}
export interface Auction {
    id: number;
    creationDate: string;
    targetType: string;
    targetIdentifier: number;
    status: string;
    holderConfirmation: true;
    clientConfirmation: true;
}
export interface Trade {
    id: number;
    owner: number;
    tradeType: string;
    tradeIdentifier: number;
    requestedType: string;
    requestDescription: string;
}