export interface Product {
    id: string,
    name: string;
    price: string;
    image: string;
  }
  
  export interface CartItem {
    id: number;
    quantity: number;
    product: Product;
    total: number;
  }
  
  export interface CartDetailsResponse {
    data: CartItem[];
    grandTotal: number;
  }