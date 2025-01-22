import {useMutation, useQuery, useQueryClient, type UseMutationOptions, type UseQueryOptions } from '@tanstack/vue-query'

import saleServices from './services'
import type { CreateSale, SaleType } from './types'
import type { APIResponse } from '../config'



export const fetchSaleReport = {
    useQuery: (opt?: UseQueryOptions<SaleType[], Error>) =>
        useQuery<SaleType[], Error>({
            queryKey: ['getAllSale'],
            queryFn: async () => {
                const response: APIResponse<SaleType[]> = await saleServices.GetSaleReport()
                return response.data
            },
            ...opt
        })
}

export const addSale = {
    useMutation: (opt?: UseMutationOptions<any, Error, CreateSale[], any>) => {
        const queryClient = useQueryClient()
        return useMutation({
            mutationKey: ['addSaleAll'],
            mutationFn: (product: CreateSale[]) => saleServices.AddSale(product), 
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['getSaleAll'] })
            },
            ...opt
        })
    }
        
}