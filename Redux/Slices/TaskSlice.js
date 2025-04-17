import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

import axiosInstance from "../../helpers/axiosInstance";
import toast from "react-hot-toast";
const initialState = {
    tasks: [],
    loading: false,
    error: null,
  };
export const createTask  = createAsyncThunk("/task/create",async (data)=>{
    try {
        const res = axiosInstance.post("/task/create-task",data)
        console.log("response is ",res)
        toast.promise(res,{
            loading:'Wait, creating your task',
            success:(data)=>{
                return data?.data?.message || 'Task created successfully'
            },
            error:"failed to create account"
        })
        return (await res).data
    } catch (error) {
        
    }
})

export const getTask = createAsyncThunk("/task/all-task",async ()=>{
    const res = axiosInstance.get("/task/all-task");
    toast.promise(res,{
        loading:"Wait Your task is loading",
        success:(data)=>{
            return data?.data?.message || "Task is loaded successfully"
        },
        error:"failed to get task"
    })
    return (await res).data
})

const taskSlice = createSlice({
    name:"task",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getTask.fulfilled,(state,action)=>{
            state.tasks = action.payload;
            
        })
    }
})

export default taskSlice.reducer