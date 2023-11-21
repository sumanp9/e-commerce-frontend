export interface PersonInterface{
    name: string,
    user_name: string,
    address: string,
    email: string, 
    password: string,
    phone: string
}

export interface UserInfo{
    id: number,
    name: string, 
    email: string, 
    role: string
}

export interface ProductInfo{
    id: number,
    name:string, 
    image: string,
    description:string, 
    details:string, 
    price: number,
    quantity: number
    category_id: number
}

export interface Categories{
    id: number, 
    name: string
}

export interface TotalQuantity{
    totalQuantity: number
}

export interface Transaction{
    id: number,
    charge_id: string, 
    user: string,
    total: number, 

}

export interface TransactionDetails{
    id: number, 
    product_name: string,
    quantity: number,
    price: number, 
    user_id: number
}