import {createSlice} from "@reduxjs/toolkit"
const authInitState={
    token:localStorage.getItem("token")||"",
    isUserLoggedIn:localStorage.getItem("token")?true:false,
    username:""
}
const authSlice=createSlice({
    name:"auth",
    initialState:authInitState,
    reducers:{
        setToken:(state,action)=>{
            const token=action.payload;
            state.token=token
            state.isUserLoggedIn=true;
            localStorage.setItem("token",token);
        },
        clearToken:(state)=>{
            state.token="";
            state.isUserLoggedIn=false;
            localStorage.removeItem("token")
        }
    }
})
export const {setToken,clearToken} = authSlice.actions
export default authSlice.reducer
