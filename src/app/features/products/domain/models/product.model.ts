export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  categoryId: string;
  category:string;
}
export interface ProductoCreateRequest {
  name: string;
  description: string;
  price: number;
  quantity: number;
  categoryId: string;
}
export interface ProductoUpdateRequest {
  id:string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  categoryId: string;
}
export interface ProductPaginationRequest {
  page: number;
  size: number;
  name?: string;
  category?: string;
}
