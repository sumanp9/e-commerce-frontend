export interface PersonInterface{
    name: string,
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
}