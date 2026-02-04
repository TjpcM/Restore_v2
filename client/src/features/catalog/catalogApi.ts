import { createApi} from "@reduxjs/toolkit/query/react";
import type { Product } from "../../app/models/products";
import { baseQueryWithErrorHandling } from "../../app/api/baseApi";

 // createApi function to define endpoints - react hook are generated based on these endpoints 
 // and can be used in components
export const catalogApi = createApi({
    reducerPath: 'catalogApi',
    baseQuery: baseQueryWithErrorHandling,
    endpoints: (builder) => ({
        fetchProducts: builder.query<Product[], void>({
            query: () => ({ url:'products'})
        }),
        fetchProductDetails: builder.query<Product, number>({
            query:(productId) => `products/${productId}`
        })
    })
})

// export hooks for usage in functional components
export const { useFetchProductDetailsQuery, useFetchProductsQuery } = catalogApi;