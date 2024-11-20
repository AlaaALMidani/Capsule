import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { OrderServices } from '../services/orderServices';

const initialState = {
    addOrder: { loading: false, success: false, error: '', data: null },
    getCurrentOrders: { loading: false, success: false, error: '', data: null },
    getPreviousOrders: { loading: false, success: false, error: '', data: null },
    getCustomersOrders: { loading: false, success: false, error: '', data: null },
    progress: 0,
};

export const addOrderAsync = createAsyncThunk('order/addOrder', async (data, { rejectWithValue, dispatch }) => {
    try {
        return await OrderServices.addOrder(data, dispatch); // Pass dispatch function
    } catch (error) {
        return rejectWithValue(error.message); // Reject with error message
    }
});

export const getCurrentOrdersAsync = createAsyncThunk('order/getCurrentOrders', async () => {
    return await OrderServices.getOrdersByStatus('pending');
});

export const getPreviousOrdersAsync = createAsyncThunk('order/getPreviousOrders', async () => {
    return await OrderServices.getOrdersByStatus('complete');
});

export const getCustomersOrdersAsync = createAsyncThunk('order/getCustomersOrders', async () => {
    return await OrderServices.getAllOrders();
});


export const OrderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        uploadProgress: (state, action) => {
            state.progress = action.payload;
        },
    },
    extraReducers: (builder) => {
        const handleAsyncCases = (actionType, targetKey) => {
            builder
                .addCase(actionType.pending, (state) => {
                    state[targetKey].loading = true;
                    state[targetKey].error = '';
                })
                .addCase(actionType.fulfilled, (state, action) => {
                    state[targetKey].loading = false;
                    state[targetKey].success = true;
                    state[targetKey].data = action.payload;
                })
                .addCase(actionType.rejected, (state, action) => {
                    state[targetKey].loading = false;
                    state[targetKey].success = false;
                    state[targetKey].error = action.payload;
                    state[targetKey].data = null;
                });
        };

        handleAsyncCases(addOrderAsync, 'addOrder');
        handleAsyncCases(getCurrentOrdersAsync, 'getCurrentOrders');
        handleAsyncCases(getPreviousOrdersAsync, 'getPreviousOrders');
        handleAsyncCases(getCustomersOrdersAsync,'getCustomersOrders')
    },
});

export const { uploadProgress } = OrderSlice.actions;
export default OrderSlice.reducer;