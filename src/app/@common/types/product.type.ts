export type Product = {
  id: number;
  name: string;
  SKU: string;
  description: string;
  price: number;
  stock: number;
  categoryId: number;
  weight: number;
  weightUnit: string;
  productImages: ProductImage[];
  reviews: ProductReview[];
  productAttributes: ProductAttribute[];
  quantity: number;
};

export type ProductImage = {
  id: number;
  productId: number;
  imgUrl: string;
};

export type ProductReview = {
  id: number;
  productId: number;
  customerName: string;
  rate: number;
  title: string;
  comment: string;
  createdDate: string;
};

export type ProductAttribute = {
  discountDueDate: string;
  discountPercent: number;
  discountPrice: number;
  id: number;
  originPrice: number;
  productId: number;
  weight: number;
  weightUnit: string;
};
