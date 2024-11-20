import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { OrderServices } from '../services/orderServices';
import { OfferServices } from '../services/offerServices';

const initialState = {
    gitMyOrdersWithOffers: { loading: false, success: false, error: '', data: null },
   
    progress: 0,
};

export const gitMyOrdersWithOffers = createAsyncThunk('offer/gitMyOrdersWithOffers', async () => {
    return await OfferServices.getMyOrdersWithOffers();
});



export const OfferSlice = createSlice({
    name: 'offer',
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

        handleAsyncCases(gitMyOrdersWithOffers, 'gitMyOrdersWithOffers');
    },
});

export const { uploadProgress } = OfferSlice.actions;
export default OfferSlice.reducer;