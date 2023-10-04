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
