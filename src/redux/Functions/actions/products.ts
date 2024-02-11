import {createAsyncThunk} from '@reduxjs/toolkit';
const HOST: string = (import.meta.env.VITE_BACKEND_URL);

let user = { token: '' }; // Initialize with an empty token
try {
    const userData = localStorage.getItem('user');
    if (userData) {
        user = JSON.parse(userData);
    }
} catch (error) {
    console.error('Error parsing user data from localStorage:', error);
}


export const fetchProducts = createAsyncThunk(
    'products/fetchproducts',
    async (data, thunkAPI) => { 
        const response = await fetch(`${HOST}/api/books`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        });
        const result = await response.json();
   
        if (response.status === 200) {
            return result.data;
        } else {
            return thunkAPI.rejectWithValue(result);
        }
    }
);




export const createOrder = createAsyncThunk(
    'products/createOrder',
    async (data, thunkAPI) => {
        const response = await fetch(`${HOST}/api/order`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify(data),
        });
        const result = await response.json();
        if (response.status === 201) {
            return result;
        } else {
            return thunkAPI.rejectWithValue(result);
        }
    }
);


export const fetchOrders = createAsyncThunk(
    'products/fetchOrders',
    async (data, thunkAPI) => {
        const response = await fetch(`${HOST}/api/orders`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
        });
        const result = await response.json();
        if (response.status === 200) {
            return result.data;
        } else {
            return thunkAPI.rejectWithValue(result);
        }
    }
);