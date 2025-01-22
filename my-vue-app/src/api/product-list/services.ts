import type { APIResponse } from "../config"
import axiosInstance from "../config"
import type { CreateProductPayload, DeletProduct, ProductType, UpdateProduct } from "./types"

const baseURL='/Product'
const getAllProduct=async():Promise<APIResponse<ProductType[]>>=>{
    const response=await axiosInstance.get<APIResponse<ProductType[]>>(`${baseURL}/GetAllProduct`)
    return response.data
}


const AddProduct = async (product: CreateProductPayload): Promise<APIResponse<ProductType>> => {
    const response = await axiosInstance.post<APIResponse<ProductType>>(`${baseURL}/AddProduct`, product)

    return response.data
}

const DeletProduct = async (product: DeletProduct): Promise<APIResponse<ProductType>> => {
    const response = await axiosInstance.post<APIResponse<ProductType>>(`${baseURL}/DeleteProduct`, product)

    return response.data
}

const UpdateProduct = async (product: UpdateProduct): Promise<APIResponse<ProductType>> => {
    const response = await axiosInstance.post<APIResponse<ProductType>>(`${baseURL}/UpdateProduct`, product)

    return response.data
}

export default { getAllProduct,AddProduct,DeletProduct, UpdateProduct}