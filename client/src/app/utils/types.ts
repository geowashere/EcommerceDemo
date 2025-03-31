export interface ProductType {
  id: number;
  name: string;
  description: string;
  price: number;
  position: number;
  categoryId: number;
  categoryName: string;
}

export interface CreateProductType {
  name: string;
  description: string;
  price: number;
  categoryId: number;
}

export interface CreateCategoryType {
  name: string;
  description: string;
}

export interface UpdateProductType {
  id: number;
  name: string;
  description: string;
  price: number;
  categoryId: number;
}

export interface UpdateCategoryType {
  id: number;
  name: string;
  description: string;
}

export interface CategoryType {
  id: number;
  name: string;
  description: string;
  position: number;
}

export const ItemTypes = {
  CATEGORY: "category",
  PRODUCT: "product",
};

export interface DragItem {
  index: number;
  id: string;
  type: string;
}

export interface CartItemType {
  id: number;
  productCategory: string;
  productDescription: string;
  productName: string;
  productPrice: number;
  quantity: number;
}

export interface CreateCartItemType {
  cartId: number;
  productId: number;
  quantity: number;
}
