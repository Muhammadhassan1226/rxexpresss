import { PRIVATE_API } from "@/config/";
import { OrderListType, DeliverySubtype } from "@/types/orderslice";
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
    NassauOrders: OrderListType[],
    deliverySubtypes: DeliverySubtype[],
    queensOrders: OrderListType[],
    brooklynOrders: OrderListType[],
    orderDetails: OrderListType,
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
    NassauOrders: [],
    deliverySubtypes: [],
    queensOrders: [],
    brooklynOrders: [],
    orderDetails: {
        id: 0,
        recipientName: "",
        phone: "",
        address: "",
        deliveryMethods: "",
        dateToDeliver: "",
        instructions: "",
        status: "",
        paymentStatus: "",
        deliverySubtypeId: 0,
        name: "",
        rate: 0,
        businessName: ""
    }
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
        console.log("data", data);
        try {
            const res = await PRIVATE_API.post("/api/Order/CreateOrderMob", data);
            if (res.status === 200) {
                console.log("Create Order Success");
                return res.data;
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
export const getOrderDetails = createAsyncThunk<
    OrderListType,
    { id: number },
    { rejectValue: string }
>(
    "api/Order/order-details",
    async ({ id }, { dispatch, rejectWithValue }) => {
        try {
            // Build query parameters dynamically
            const params = new URLSearchParams();


            const res = await PRIVATE_API.get(`api/Order/order-details/${id.toString()}`);

            if (res.status === 200) {
                console.log("order-details Success", res.data);
                return res.data;
            } else {
                console.log("order-details Rejected", res.status);
                return rejectWithValue(res.data.message);
            }
        } catch (error: any) {
            if (error.response?.data?.message) {
                return rejectWithValue(error.response.data.message);
            }
            return rejectWithValue(error.message || "order-details failed");
        }
    }
);
// get My Order
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

// Get Nassaua Order
export const getNassauOrders = createAsyncThunk<
    OrderListType[],
    { page?: number; pageSize?: number, search?: string },
    { rejectValue: string }
>(
    "api/Order/Nassau",
    async ({ page = 1, pageSize = 15, search }, { rejectWithValue }) => {
        try {
            // Dynamically construct query parameters
            const params = new URLSearchParams();
            if (page) params.append("page", page.toString());
            if (pageSize) params.append("pageSize", pageSize.toString());
            if (search) params.append("search", search.toString());
            const res = await PRIVATE_API.get(`api/Order/Nassau?${params.toString()}`);

            if (res.status === 200) {
                console.log("Nassau Order Success", res.data);
                return res.data.orders;
            } else {
                console.log("Nassau Order Rejected", res.status);
                return rejectWithValue(res.data.message);
            }
        } catch (error: any) {
            if (error.response?.data?.message) {
                return rejectWithValue(error.response.data.message);
            }
            return rejectWithValue(error.message || "Nassau Order failed");
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

// get delivery subtype
export const getDeliverySubtype = createAsyncThunk<
    DeliverySubtype[],
    { page?: number; pageSize?: number, search?: string },
    { rejectValue: string }
>(
    "api/DeliverySubtype/GetDeliverySubtypes",
    async ({ }, { rejectWithValue }) => {
        try {

            const res = await PRIVATE_API.get("/api/DeliverySubtype/GetDeliverySubtypes");

            if (res.status === 200) {
                console.log("Delivery Subtype Success", res.data);
                return res.data;
            } else {
                console.log("Delivery Subtype Rejected", res.status);
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
        // Nassau Order
        builder
            .addCase(getNassauOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                getNassauOrders.fulfilled,
                (state, action: PayloadAction<OrderListType[]>) => {
                    state.loading = false;
                    state.NassauOrders = action.payload;
                    state.error = null;
                }
            )
            .addCase(getNassauOrders.rejected, (state, action) => {
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
        // Order Details
        builder
            .addCase(getOrderDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                getOrderDetails.fulfilled,
                (state, action: PayloadAction<OrderListType>) => {
                    state.loading = false;
                    state.orderDetails = action.payload;
                    state.error = null;
                }
            )
            .addCase(getOrderDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
        // Get Delivery Subtype
        builder
            .addCase(getDeliverySubtype.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                getDeliverySubtype.fulfilled,
                (state, action: PayloadAction<DeliverySubtype[]>) => {
                    state.loading = false;
                    state.deliverySubtypes = action.payload;
                    state.error = null;
                }
            )
            .addCase(getDeliverySubtype.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

    },
});

export const { setPharmacygetOrderCount } = orderSlice.actions;
export default orderSlice.reducer;
