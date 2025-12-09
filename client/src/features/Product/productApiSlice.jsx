import apiSlice from "../../App/apiSlice";

const productApiSlice = apiSlice.injectEndpoints({//סיומת של הנתיב
    endpoints: (build) => ({
        getAllProducts: build.query({
            query: () => ({
                url: "/api/product",
                method: "GET"
            }),
            providesTags:["product"]

        }),
        addProducts: build.mutation({
            query: (data) => ({
                url: "/api/product",
                method: "POST",
                body:data
            }),
            invalidatesTags:["product"]
        }),
        deleteProducts: build.mutation({
            query: (id) => ({
                url: `/api/product/${id}`,
                method: "DELETE",
            }),
            invalidatesTags:["product"]
        }) ,
       updateProducts: build.mutation({
            query: (data) => ({
                url: "/api/product",
                method: "PUT",
                body:data
            }),
            invalidatesTags:["product"]
        })
    })
})
export const  { useGetAllProductsQuery, useAddProductsMutation ,useDeleteProductsMutation,useUpdateProductsMutation} = productApiSlice;
 