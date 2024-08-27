export interface Login {
    id?: number;
    username: string;
    password: string;
}

export interface Product {
    id?: number;
    name: string;
    category: string;
    price: number;
    stock: number;
    image: string;
}

export interface ProductWithDiscount {
    id?: number;
    name: string;
    category: string;
    price: number;
    stock: number;
    discount: number;
}

export interface CartWithDiscount {
    id?: number;
    cart: Cart;
    discount: number;
    quantity: number;
}

//old, do not use
export interface OrderWithDiscount {
    id?: number;
    order: Order;
    discount: Discount;
}

export interface Discount {
    id?: number;
    discount: number;
    product: Product;
}

export interface Order {
    id?: number;
    login: Login;
    product: Product;
    quantity: number;
    totalPrice: number;
}


export interface LoginOrder {
    id?: number;
    username?: string;
    password?: string;
}


export interface Wishlist {
    id?: number;
    login: Login;
    product: Product;
}

export interface Cart {
    id?: number;
    login: Login;
    product: Product;
    
}