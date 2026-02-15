import { createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { LoginInput } from "@/types/AuthType";
import { AxiosError } from 'axios';
import Api from "@/config/apiCall";




export const loginUserActions = createAsyncThunk<
    
>(
    'users/loginUser',
    async (credentials, { rejectWithValue }) => {
        try {
            const request = await Api.post('auth/login', credentials);
            toast.success(request.data.message || "Logged in successfully!");
            return request.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                const errorMessage = error.response?.data?.message || "An unexpected error occurred.";
                toast.error(errorMessage);
                return rejectWithValue({ message: errorMessage });
            }
            const errorMessage = "An unexpected error occurred.";
            toast.error(errorMessage);
            return rejectWithValue({ message: errorMessage });
        }
    },
);