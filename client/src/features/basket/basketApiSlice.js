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
        addProductToBasket: build.mutation({
            query: (data) => ({
                url: "/api/basket",
                method: "POST",
                body:data
            }),
            invalidatesTags:["basket"]
        }),
        deleteProductsFromBasket: build.mutation({
            query: (id) => ({
                url: `/api/basket/${id}`,
                method: "DELETE",
            }),
            invalidatesTags:["basket"]
        }) ,
    })
})
export const  {useAddProductToBasketMutation,useDeleteProductsFromBasketMutation,useGetAllbasketQuery} = basketApiSlice;
 


