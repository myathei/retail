export type ProductType = {
    productID:string,
    productName:string,
    stock:number,
    sellingPrice:number,
    activeFlag: boolean,
    createdDate:Date,
    updateDate:Date,
    createdBy:string,
    updatedBy:string,
    profitPerItem:number
}

export type CreateProductPayload = {
    productName: string,
    stock : number,
    sellingPrice: number,
    profitPerItem: number
}

export type DeletProduct = {
    productID: string
}

export type UpdateProduct = {
    productID:string,
    productName:string,
    stock:number,
    sellingPrice:number,
    profitPerItem:number,
    updatedBy:string,
    activeFlag: boolean
    
}