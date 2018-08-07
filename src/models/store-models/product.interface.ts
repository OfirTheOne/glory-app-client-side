export interface Product {
    _id: string,
    pCode: string,
    price: number,
    category: string,
    description: string,
    measurement: string[],
    createDate: number,
    onSale: boolean,
    newIn: boolean,
    imagePath: string[]
    season?: string,
    brand?: string,
} 