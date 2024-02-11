import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import Cookies from "universal-cookie";


interface AuthState {
    isAuthenticated: boolean;
    user: null // Define your user object type
    status: 'idle' | 'loading' | 'success' | 'error';
    error: string | null | undefined;
}

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    status: 'idle',
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
            throw Error('An error occurred during login');
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
            console.log(credentials)
            console.log(error)
            throw Error('An error occurred during signup');
        }
    }
);
export const getUser = createAsyncThunk(
    'auth/getUser',
    async () => {
        try {
            const cookies = new Cookies()
            const token = cookies.get("token")
            if (token) {
                const res: AxiosResponse = await axios.get(`http://localhost:8080/api/getUser?token=${token}`);
                return res.data;
            }
        } catch (error) {
            throw Error('An error occurred during check user');
        }
    }
);
export const logOut = createAsyncThunk(
    'auth/logOut',
    async () => {
        try {
            const cookies = new Cookies()
            cookies.remove("token")
            // await axios.get(`http://localhost:8080/api/logout`);
        } catch (error) {
            throw Error('An error occurred during check user');
        }
    }
);




const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
    },
    extraReducers(builder) {
        builder
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = 'success';
                state.user = action.payload;
                state.isAuthenticated = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.error.message;
            })
        builder.addCase(getUser.pending, (state) => {
            state.status = 'loading';
        })
            .addCase(getUser.fulfilled, (state, action) => {
                state.status = 'success';
                state.user = action.payload;
            })
            .addCase(getUser.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.error.message;
            })
        builder.addCase(logOut.pending, (state) => {
            state.status = 'loading';
        })
            .addCase(logOut.fulfilled, (state) => {
                state.status = 'success';
                state.user = null;
            })
            .addCase(logOut.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.error.message;
            })
        builder.addCase(signUp.pending, (state) => {
            state.status = 'loading';
        })
            .addCase(signUp.fulfilled, (state, action) => {
                state.status = 'success';
                state.user = action.payload;
            })
            .addCase(signUp.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.error.message;
            })

    }




})



export default authSlice.reducer;