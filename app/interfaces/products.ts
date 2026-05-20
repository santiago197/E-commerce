export interface Rating {
    rate: number;
    count: number;
}

export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image?: string;
    rating?: Rating;
    slug?: string; // Optional slug for internal routing
}

export type Products = Product[];

// Add optional slug for internal routing
export interface ProductWithSlug extends Product {
    slug?: string;
}