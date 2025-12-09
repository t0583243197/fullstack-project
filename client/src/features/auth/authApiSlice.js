import apiSlice from "../../App/apiSlice";
const authApiSlice = apiSlice.injectEndpoints({//סיומת של הנתיב
    endpoints: (build) => ({
        registerFunc: build.mutation({
            query: (regsiterUser) => ({
                url: "/api/auth/register",
                method: "POST",
                body: regsiterUser
            })
        }),
        login: build.mutation({
            query: (loginUser) => ({
                url: "/api/auth/login",
                method: "POST",
                body: loginUser
            }),
        })
    })
})

export const { useRegisterFuncMutation, useLoginMutation } = authApiSlice;

