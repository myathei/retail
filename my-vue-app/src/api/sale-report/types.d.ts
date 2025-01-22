export type SaleType = {
    saleID: string,
    productID: string,
    productName: string,
    totalQuantity: number,
    totalPrice: number,
    totalProfit: number
}

export type CreateSale = {
    productID: string,
    quantity: number
}