import { PRIVATE_API } from "@/config/";
import { OrderListType } from "@/types/orderslice";
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
    orders: OrderListType[],
    manhattanOrders: OrderListType[],
    nasauOrders: OrderListType[],
    queensOrders: OrderListType[],
    brooklynOrders: OrderListType[],
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
    orders: [],
    manhattanOrders: [],
    nasauOrders: [],
    queensOrders: [],
    brooklynOrders: [],
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
// Create Order Thunk
export const createOrder = createAsyncThunk<string, any>(
    "/api/Order/create",
    async (data, ThunkApi) => {
        try {
            const res = await PRIVATE_API.post("/api/Order/create", data);
            if (res.status === 200) {
                console.log("Create Order Success");
                return res.data.message;
            } else {
                console.log("Create Order Rejected", res.status);
                return ThunkApi.rejectWithValue(res.data.message);
            }
        } catch (error: any) {
            if (error.response?.data?.message) {
                return ThunkApi.rejectWithValue(error.response.data.message);
            }
            return ThunkApi.rejectWithValue(error.message || "Create Order failed");
        }
    },
);
export const getMyOrder = createAsyncThunk<
    OrderListType[],
    { page?: number; pageSize?: number, search?: string },
    { rejectValue: string }
>(
    "api/Order/my-orders",
    async ({ page = 1, pageSize = 15, search }, { dispatch, rejectWithValue }) => {
        try {
            // Build query parameters dynamically
            const params = new URLSearchParams();
            if (page) params.append("page", page.toString());
            if (pageSize) params.append("pageSize", pageSize.toString());
            if (search) params.append("search", search.toString());
            const res = await PRIVATE_API.get(`api/Order/my-orders?${params.toString()}`);

            if (res.status === 200) {
                console.log("OrderList Count Success", res.data);
                return res.data.orders;
            } else {
                console.log("OrderList Count Rejected", res.status);
                return rejectWithValue(res.data.message);
            }
        } catch (error: any) {
            if (error.response?.data?.message) {
                return rejectWithValue(error.response.data.message);
            }
            return rejectWithValue(error.message || "OrderList count failed");
        }
    }
);
// Manhattan Order
export const getManhattanOrders = createAsyncThunk<
    OrderListType[],
    { page?: number; pageSize?: number; search?: string },
    { rejectValue: string }
>(
    "api/Order/manhattan",
    async ({ page = 1, pageSize = 15, search }, { rejectWithValue }) => {
        try {
            // Dynamically construct query parameters
            const params = new URLSearchParams();
            if (page) params.append("page", page.toString());
            if (pageSize) params.append("pageSize", pageSize.toString());
            if (search) params.append("search", search.toString());
            const res = await PRIVATE_API.get(`api/Order/manhattan?${params.toString()}`);

            if (res.status === 200) {
                console.log("Manhattan Orders Success", res.data);
                return res.data.orders;
            } else {
                console.log("Manhattan Orders Rejected", res.status);
                return rejectWithValue(res.data.message);
            }
        } catch (error: any) {
            if (error.response?.data?.message) {
                return rejectWithValue(error.response.data.message);
            }
            return rejectWithValue(error.message || "Manhattan orders retrieval failed");
        }
    }
);

// Get Nasaua Order
export const getNasauOrders = createAsyncThunk<
    OrderListType[],
    { page?: number; pageSize?: number, search?: string },
    { rejectValue: string }
>(
    "api/Order/Nasau",
    async ({ page = 1, pageSize = 15, search }, { rejectWithValue }) => {
        try {
            // Dynamically construct query parameters
            const params = new URLSearchParams();
            if (page) params.append("page", page.toString());
            if (pageSize) params.append("pageSize", pageSize.toString());
            if (search) params.append("search", search.toString());
            const res = await PRIVATE_API.get(`api/Order/Nasau?${params.toString()}`);

            if (res.status === 200) {
                console.log("Nasau Order Success", res.data);
                return res.data.orders;
            } else {
                console.log("Nasau Order Rejected", res.status);
                return rejectWithValue(res.data.message);
            }
        } catch (error: any) {
            if (error.response?.data?.message) {
                return rejectWithValue(error.response.data.message);
            }
            return rejectWithValue(error.message || "Nasau Order failed");
        }
    }
);

// Get Queen Order
export const getQueensOrders = createAsyncThunk<
    OrderListType[],
    { page?: number; pageSize?: number, search?: string },
    { rejectValue: string }
>(
    "api/Order/Queens",
    async ({ page = 1, pageSize = 15, search }, { rejectWithValue }) => {
        try {
            // Dynamically build query parameters
            const params = new URLSearchParams();
            if (page) params.append("page", page.toString());
            if (pageSize) params.append("pageSize", pageSize.toString());
            if (search) params.append("search", search.toString());

            const res = await PRIVATE_API.get(`api/Order/Queens?${params.toString()}`);

            if (res.status === 200) {
                console.log("Queens Order Success", res.data);
                return res.data.orders;
            } else {
                console.log("Queens Order Rejected", res.status);
                return rejectWithValue(res.data.message);
            }
        } catch (error: any) {
            if (error.response?.data?.message) {
                return rejectWithValue(error.response.data.message);
            }
            return rejectWithValue(error.message || "Queens Order failed");
        }
    }
);
// Brooklyn Orders
export const getBrooklynOrders = createAsyncThunk<
    OrderListType[],
    { page?: number; pageSize?: number, search?: string },
    { rejectValue: string }
>(
    "api/Order/Brooklyn",
    async ({ page = 1, pageSize = 15, search }, { rejectWithValue }) => {
        try {
            // Dynamically build query parameters
            const params = new URLSearchParams();
            if (page) params.append("page", page.toString());
            if (pageSize) params.append("pageSize", pageSize.toString());
            if (search) params.append("search", search.toString());

            const res = await PRIVATE_API.get(`api/Order/Brooklyn?${params.toString()}`);

            if (res.status === 200) {
                console.log("Brooklyn Order Success", res.data);
                return res.data.orders;
            } else {
                console.log("Brooklyn Order Rejected", res.status);
                return rejectWithValue(res.data.message);
            }
        } catch (error: any) {
            if (error.response?.data?.message) {
                return rejectWithValue(error.response.data.message);
            }
            return rejectWithValue(error.message || "Brooklyn Order failed");
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
        // Get My Order
        builder
            .addCase(getMyOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                getMyOrder.fulfilled,
                (state, action: PayloadAction<OrderListType[]>) => {
                    state.loading = false;
                    state.orders = action.payload;
                    state.error = null;
                }
            )
            .addCase(getMyOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
        // Manhattan Order
        builder
            .addCase(getManhattanOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                getManhattanOrders.fulfilled,
                (state, action: PayloadAction<OrderListType[]>) => {
                    state.loading = false;
                    state.manhattanOrders = action.payload;
                    state.error = null;
                }
            )
            .addCase(getManhattanOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
        // Nasau Order
        builder
            .addCase(getNasauOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                getNasauOrders.fulfilled,
                (state, action: PayloadAction<OrderListType[]>) => {
                    state.loading = false;
                    state.nasauOrders = action.payload;
                    state.error = null;
                }
            )
            .addCase(getNasauOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
        // Queens Order
        builder
            .addCase(getQueensOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                getQueensOrders.fulfilled,
                (state, action: PayloadAction<OrderListType[]>) => {
                    state.loading = false;
                    state.queensOrders = action.payload;
                    state.error = null;
                }
            )
            .addCase(getQueensOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
        // Brooklyn Order
        builder
            .addCase(getBrooklynOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                getBrooklynOrders.fulfilled,
                (state, action: PayloadAction<OrderListType[]>) => {
                    state.loading = false;
                    state.brooklynOrders = action.payload;
                    state.error = null;
                }
            )
            .addCase(getBrooklynOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

    },
});

export const { setPharmacygetOrderCount } = orderSlice.actions;
export default orderSlice.reducer;
