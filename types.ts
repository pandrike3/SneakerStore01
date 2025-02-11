export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    image: string;
  }
  
  export interface CartItem extends Product {
    quantity: number;
  }
  
  export interface PaymentMethod {
    id: string;
    type: 'credit' | 'debit' | 'paypal';
    lastFourDigits?: string;
    expiryDate?: string;
  }