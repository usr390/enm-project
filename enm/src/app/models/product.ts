export interface Product {
    id?: string;
    code?: string;
    name?: string;
    description?: string;
    price?: number;
    quantity?: number;
    inventoryStatus?: string;
    category?: string;
    image?: string;
    rating?: number;
}

export interface RarelygroovyPlusCard {
    title?: string;
    subtitle?: string;
    overviewHeader?: string;
    allAccessFeature?: string;
    linksFeature?: number;
    filterFeature?: number;
    extraInfo?: string;
}

export interface RarelygroovyPlusFeatures {
    name?: string;
    description?: string;
    image?: string;
}

export type CarouselStuff = Product | RarelygroovyPlusCard | RarelygroovyPlusFeatures