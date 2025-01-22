import type { APIResponse } from "../config"
import axiosInstance from "../config"
import type { CreateSale, SaleType } from "./types"

const baseURL='/Cart'
const GetSaleReport=async():Promise<APIResponse<SaleType[]>>=>{
    const response=await axiosInstance.get<APIResponse<SaleType[]>>(`Manager/GetSaleReport`)
    return response.data
}

const AddSale = async (product: CreateSale[]): Promise<APIResponse<CreateSale[]>> => {
    const response = await axiosInstance.post<APIResponse<CreateSale[]>>(`${baseURL}/AddToCart`, product)

    return response.data
}

export default { GetSaleReport,AddSale}