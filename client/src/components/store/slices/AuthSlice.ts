import api from "@/config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import Cookies from "universal-cookie";


interface AuthState {
    user: null // Define your user object type
    error: string | null | undefined;
}

interface CustomError extends Error {
    response?: AxiosResponse
}

const initialState: AuthState = {
    user: null,
    error: null,
};

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (credentials: { email: string; password: string }) => {
        try {
            const cookies = new Cookies()
            const res: AxiosResponse = await axios.post("http://localhost:8080/api/signin", credentials)
            cookies.set("token", res.data.token)
            return res.data;
        } catch (error) {
            const err = error as CustomError
            throw Error(err.response?.data["message"])



        }
    }
);
export const signUp = createAsyncThunk(
    'auth/signUp',
    async (credentials: { email: string; password: string, username: string }) => {
        try {
            const cookies = new Cookies()
            const res: AxiosResponse = await axios.post("http://localhost:8080/api/signup", credentials)
            cookies.set("token", res.data.token)
            return res.data;
        } catch (error) {
            const err = error as CustomError
            console.log(err.response?.data)
            if (err.response?.data["username"]) {
                throw Error(err.response?.data["username"])
            }
            else if (err.response?.data["email"]) {
                throw Error(err.response?.data["email"])
            }
            else if (err.response?.data["password"]) {
                throw Error(err.response?.data["password"])
            } else {
                throw Error(err.response?.data["message"])
            }

        }
    }
);
export const getUser = createAsyncThunk(
    'auth/getUser',
    async () => {
        try {
            const res: AxiosResponse = await api.get(`/api/getUser`)
            console.log(res)
            return res.data;


        } catch (error) {
            const err = error as CustomError
            throw Error(err.response?.data);
        }
    }
);
export const logOut = createAsyncThunk(
    'auth/logOut',
    async () => {
        try {
            const cookies = new Cookies()
            await api.get(`/api/logout`);
            cookies.remove("token")
        } catch (error) {
            const err = error as CustomError

            throw Error(err.response?.data);
        }
    }
);





const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null
            return state
        }
    },
    extraReducers(builder) {
        builder
            .addCase(loginUser.pending, (state) => {
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user = action.payload;

            })
            .addCase(loginUser.rejected, (state, action) => {
                state.error = action.error.message;
            })
        builder.addCase(getUser.fulfilled, (state, action) => {
            state.user = action.payload;
        })
            .addCase(getUser.rejected, (state, action) => {
                state.error = action.error.message;
            })
        builder.addCase(logOut.fulfilled, (state) => {
            state.user = null;
        })
            .addCase(logOut.rejected, (state, action) => {
                state.error = action.error.message;
            })
        builder.addCase(signUp.fulfilled, (state, action) => {
            state.user = action.payload;
        })
            .addCase(signUp.rejected, (state, action) => {

                state.error = action.error.message;
            })

    }




})


export const { clearError } = authSlice.actions
export default authSlice.reducer;