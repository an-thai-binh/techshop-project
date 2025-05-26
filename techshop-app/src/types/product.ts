import { ProductImage } from "./image";

export interface Category {
    id: string;
    categoryName: string;
    categoryImgUrl: string;
}

export interface Product {
    id: string;
    categoryId: string;
    productName: string;
    productDescription: string;
    productBasePrice: number;
}

export interface ProductVariation {
    id: string;
    sku: string;
    variationPriceChange: number;
    imageId: string;
    quantity: number;
    choiceValueIds: string;
}

export interface ProductDetail {
    id: string;
    category: Category;
    productName: string;
    productDescription: string;
    productBasePrice: number;
    productVariationList: ProductVariation[];
    productImageList: ProductImage[];
}