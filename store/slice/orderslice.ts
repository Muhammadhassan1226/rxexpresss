import { PRIVATE_API } from "@/config/";
import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Define types
type PharmacyCountType = {
    pharmacy: string;
    totalOrders: number;
    pendingOrders: number;
    readyForPickupOrders: number;
};

export interface OrderState {
    pharmacyCount: PharmacyCountType;
    loading: boolean;
    error: null | string;
    message: string;
}

const initialState: OrderState = {
    pharmacyCount: {
        pharmacy: "",
        totalOrders: 0,
        pendingOrders: 0,
        readyForPickupOrders: 0,
    },
    loading: false,
    error: null,
    message: "",
};

// Get Order Count Thunk
export const getOrderCount = createAsyncThunk<
    PharmacyCountType,
    void,
    { rejectValue: string }
>(
    "Order/pharmacy-order-count",
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const res = await PRIVATE_API.get("api/Order/pharmacy-order-count");
            if (res.status === 200) {
                dispatch(setPharmacygetOrderCount(res.data.pharmacyCount));
                console.log("Pharmacy Count Success", res.data);
                return res.data;
            } else {
                console.log("Pharmacy Count Rejected", res.status);
                return rejectWithValue(res.data.message);
            }
        } catch (error: any) {
            if (error.response?.data?.message) {
                return rejectWithValue(error.response.data.message);
            }
            return rejectWithValue(error.message || "Pharmacy count failed");
        }
    }
);

export const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        setPharmacygetOrderCount: (state, action: PayloadAction<PharmacyCountType>) => {
            state.pharmacyCount = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getOrderCount.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                getOrderCount.fulfilled,
                (state, action: PayloadAction<PharmacyCountType>) => {
                    state.loading = false;
                    state.pharmacyCount = action.payload;
                    state.error = null;
                }
            )
            .addCase(getOrderCount.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { setPharmacygetOrderCount } = orderSlice.actions;
export default orderSlice.reducer;
