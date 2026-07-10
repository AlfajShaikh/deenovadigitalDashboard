import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    getStaffListAPI,
    addPaymentAPI,
    getPaymentHistoryAPI,
    updatePaymentStatusAPI,
    getPaymentHistoryByStaffAPI,
    updatePaymentAPI,
} from "./sendPaymentsApi";

export const getStaffList = createAsyncThunk(
    "sendPayment/getStaffList",
    async (_, thunkAPI) => {
        try {
            return await getStaffListAPI();
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data || error.message
            );
        }
    }
);

export const addPayment = createAsyncThunk(
    "sendPayment/addPayment",
    async (paymentData, thunkAPI) => {
        try {
            return await addPaymentAPI(paymentData);
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data || error.message
            );
        }
    }
);


export const updatePayment = createAsyncThunk(
    "sendPayment/updatePayment",
    async (paymentData, thunkAPI) => {
        try {
            const response = await updatePaymentAPI(
                paymentData.staffId,
                paymentData
            );

            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data || error.message
            );
        }
    }
);

export const getPaymentHistory = createAsyncThunk(
    "sendPayment/getPaymentHistory",
    async (_, thunkAPI) => {
        const state = thunkAPI.getState();
        const user = state.auth.user;

        let response;

        if (user.role === "MASTER ROLE") {
            response = await getPaymentHistoryAPI();
        } else {
            response = await getPaymentHistoryByStaffAPI(user.staffId);
        }

        console.log(response);

        return response;
    }
);


export const updatePaymentStatus = createAsyncThunk(
    "sendPayment/updatePaymentStatus",
    async ({ staffId, status }, thunkAPI) => {
        try {
            await updatePaymentStatusAPI(staffId, status);

            return {
                staffId,
                status,
            };
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data || error.message
            );
        }
    }
);




const initialState = {
    loading: false,
    paymentLoading: false,
    paymentSuccess: false,
    error: null,

    staffList: [],
    paymentHistory: [],
};

const sendPaymentSlice = createSlice({
    name: "sendPayment",
    initialState,

    reducers: {
        resetPayment(state) {
            state.paymentSuccess = false;
        },
    },

    extraReducers: (builder) => {
        builder

            // Staff List
            .addCase(getStaffList.pending, (state) => {
                state.loading = true;
            })

            .addCase(getStaffList.fulfilled, (state, action) => {
                state.loading = false;
                state.staffList = action.payload.data;
            })

            .addCase(getStaffList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Add Payment
            .addCase(addPayment.pending, (state) => {
                state.paymentLoading = true;
                state.paymentSuccess = false;
            })

            .addCase(addPayment.fulfilled, (state) => {
                state.paymentLoading = false;
                state.paymentSuccess = true;
            })

            .addCase(addPayment.rejected, (state, action) => {
                state.paymentLoading = false;
                state.error = action.payload;
            }).addCase(getPaymentHistory.pending, (state) => {
                state.loading = true;
            })

            .addCase(getPaymentHistory.fulfilled, (state, action) => {
                state.loading = false;

                if (Array.isArray(action.payload.data)) {
                    state.paymentHistory = action.payload.data;
                } else {
                    state.paymentHistory = [action.payload.data];
                }
            })

            .addCase(getPaymentHistory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }).addCase(updatePaymentStatus.fulfilled, (state, action) => {

                const payment = state.paymentHistory.find(
                    item => item.staffId === action.payload.staffId
                );

                if (payment) {
                    payment.status = action.payload.status;
                }

            }).addCase(updatePayment.pending, (state) => {
    state.paymentLoading = true;
})

.addCase(updatePayment.fulfilled, (state, action) => {
    state.paymentLoading = false;

    const index = state.paymentHistory.findIndex(
        item => item.staffId === action.payload.staffId
    );

    if (index !== -1) {
        state.paymentHistory[index] = action.payload;
    }
})

.addCase(updatePayment.rejected, (state, action) => {
    state.paymentLoading = false;
    state.error = action.payload;
});
    },
});

export const { resetPayment } = sendPaymentSlice.actions;

export default sendPaymentSlice.reducer;