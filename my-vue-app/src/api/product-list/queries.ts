import {useMutation, useQuery, useQueryClient, type UseMutationOptions, type UseQueryOptions } from '@tanstack/vue-query'

import productServices from './services'
import type { CreateProductPayload, DeletProduct, ProductType, UpdateProduct } from './types'
import type { APIResponse } from '../config'



export const fetchProducts = {
    useQuery: (opt?: UseQueryOptions<ProductType[], Error>) =>
        useQuery<ProductType[], Error>({
            queryKey: ['getAllProduct'],
            queryFn: async () => {
                const response: APIResponse<ProductType[]> = await productServices.getAllProduct()
                return response.data
            },
            ...opt
        })
}

export const addProduct = {
    useMutation: (opt?: UseMutationOptions<any, Error, CreateProductPayload, any>) => {
        const queryClient = useQueryClient()
        return useMutation({
            mutationKey: ['addProduct'],
            mutationFn: (product: CreateProductPayload) => productServices.AddProduct(product), 
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['getAllProduct'] })
            },
            ...opt
        })
    }
        
}

export const deletProduct = {
    useMutation: (opt?: UseMutationOptions<any, Error, DeletProduct, any>) => {
        const queryClient = useQueryClient()
        return useMutation({
            mutationKey: ['deleteProduct'],
            mutationFn: (product: DeletProduct) => productServices.DeletProduct(product), 
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['getAllProduct'] })
            },
            ...opt
        })
    }
        
}

export const updateProduct = {
    useMutation: (opt?: UseMutationOptions<any, Error, UpdateProduct, any>) => {
        const queryClient = useQueryClient()
        return useMutation({
            mutationKey: ['deleteProduct'],
            mutationFn: (product: UpdateProduct) => productServices.UpdateProduct(product), 
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['getAllProduct'] })
            },
            ...opt
        })
    }
        
}