export class Category {
    id: number;
    name: string;
    description: string;
    image: string;
}
export class Product {
    id: number;
    owner: number;
    creation_date: string;
    name: string;
    description: string;
    images: string;
    price: number;
    starting_bid: number;
    available: boolean;
    category: number;
}
export class MarketService {
    id: number;
    type: string;
    name: string;
    description: string;
    price: string;
}
export class Bid {
    id: number;
    bid: number;
    owner: number;
    target_type: string;
    target_identifier: number;
    status: string;
}
export class Auction {
    id: number;
    creation_date: string;
    target_type: string;
    target_identifier: number;
    status: string;
    holder_confirmation: true;
    client_confirmation: true;
}
export class Trade {
    id: number;
    owner: number;
    trade_type: string;
    trade_identifier: number;
    requested_type: string;
    request_description: string;
}