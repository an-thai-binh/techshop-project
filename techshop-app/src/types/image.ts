export interface Image {
    id: string;
    imgUrl: string;
}

export interface ProductImage {
    id: string;
    productId: string;
    image: Image;
    first: boolean;
}