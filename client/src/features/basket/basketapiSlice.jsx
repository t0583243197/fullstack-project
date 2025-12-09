import apiSlice from "../../App/apiSlice";

const basketApiSlice = apiSlice.injectEndpoints({//סיומת של הנתיב
    endpoints: (build) => ({
        getAllbasket: build.query({
            query: () => ({
                url: "/api/basket",
                method: "GET"
            }),
            providesTags:["basket"]

        }),
        addToBasket: build.mutation({
            query: (data) => ({
                url: "/api/basket",
                method: "POST",
                body:data
            }),
            invalidatesTags:["basket"]
        }),
        deleteProductsFromBasket: build.mutation({
            query: (id) => ({
                url: `/api/product/${id}`,
                method: "DELETE",
            }),
            invalidatesTags:["product"]
        }) ,

    })
})
export const  { useAddToBasketMutation,useGetAllbasketQuery,useDeleteProductsFromBasketMutation} = basketApiSlice;
 

