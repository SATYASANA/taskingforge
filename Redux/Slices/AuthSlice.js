import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axiosInstance";
import toast from "react-hot-toast";
const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    role:localStorage.getItem('role') || "",
    data: localStorage.getItem('data') !=='undefined'? JSON.parse(localStorage.getItem('data')) : {}
}
export const createAccount=createAsyncThunk("/auth/signup",async (data)=>{
    try {
        console.log("data is " ,data)
        const res = axiosInstance.post('/register',data)
        console.log("respoinse is ",res)
        toast.promise(res,{
            loading:'Wait! creating your account',
            success: (data) =>{
                return data?.data?.message;
            },
            error:"failed to create account"
        })
        return (await res).data
    } catch (error) {
       toast.error(error?.response?.data?.message)
    }
})
export const login = createAsyncThunk("/auth/login", async (data)=>{
    try {
       
        const res = axiosInstance.post('/login',data)
        console.log("response is",res)
        
        toast.promise(res,{
            loading:' ⏳ 🙂 wait! logging in',
            success:(data)=>{
                return data?.data?.message
            },
            error:'failed to login'

        })
        return (await res).data;
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }

})

export const logout = createAsyncThunk('/auth/logout',async ()=>{
    try {
        const res = axiosInstance.post('/logout');
        toast.promise(res,{
            loading:"Logging you out...",
            success:(data)=>{
                return data?.data?.message ||"Logged out successfully 👋"
            },
            error:'Failed to logout. Please try again!'
        })
        return (await res).data
    } catch (error) {
        toast.error(error)
    }
})

export const getProfile = createAsyncThunk('/auth/profile',async ()=>{
    try {
        const res = await axiosInstance.get("/me")
        toast.promise(res,{
            loading:"Getting Profile",
            success:(data)=>{
                return data?.data?.message
            },
            error:"failed to get profile"
        })
        return (await res).data
    } catch (error) {
        toast.error(error)
    }
})


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers:(builder)=>{
        builder.addCase(login.fulfilled,(state,action)=>{
            const user = action?.payload?.role
            console.log("user is",user)
            localStorage.setItem("data",JSON.stringify(action?.payload?.user))
            localStorage.setItem("isLoggedIn",true)
            localStorage.setItem("role",action?.payload?.role)
            state.isLoggedIn = true
            state.data = action?.payload
            state.role = action?.payload?.role
        }).addCase(logout.fulfilled,(state,action)=>{
            localStorage.setItem("isLoggedIn", JSON.stringify(false));
            localStorage.removeItem("data");
            localStorage.removeItem("role");
          
            // 🧼 Reset Redux state
            state.isLoggedIn = false;
            state.data = null;
            state.role = null;
        })
    }
   
  });
  
export default authSlice.reducer;