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
        const res = await axiosInstance.post('/register',data)
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
       
        const res = await axiosInstance.post('/login',data)
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
        const res = await axiosInstance.post('/logout');
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
        builder.addCase(login.fulfilled, (state, action) => {
            const user = action?.payload?.user;
            
            if (user) {
                // Save the user data to localStorage
                localStorage.setItem("data", JSON.stringify(user)); // Store user object as JSON string
                localStorage.setItem("isLoggedIn", "true"); // Store 'true' as a string
                localStorage.setItem("role", user.role); // Store role in localStorage as a string
        
                // Update Redux state
                state.isLoggedIn = true; // Set isLoggedIn to true in the state
                state.data = user; // Store user details in state
                state.role = user.role; // Store user role in state
            }
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