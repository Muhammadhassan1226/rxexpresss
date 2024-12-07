import { PRIVATE_API } from "@/config/";
import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { OrderResponse } from "@/types/admin";
import { OrderDetailsType } from "@/types/orderslice";

type DahboardCounts = {
    totalOrders: number
}

export interface admindashboard {
    DashboardCount: DahboardCounts;
    loading: boolean;
    error: null | string;
    message: string;
    orders: OrderResponse;
    signatureOrders: OrderResponse;
    orderAssignDetails: OrderDetailsType;

}

const initialState: admindashboard = {
    DashboardCount: {
        totalOrders: 0
    },
    loading: false,
    error: null,
    message: "",
    orders: {
        totalOrders: 0,
        orders: [],
    },
    signatureOrders: {
        totalOrders: 0,
        orders: [],
    },
    orderAssignDetails: {

        id: 0,
        recipientName: "",
        phone: "",
        address: "",
        deliveryMethods: "",
        dateToDeliver: "",
        instructions: "",
        status: "",
        paymentStatus: "",
        userId: 0,
        user: null,
        deliverySubtypeId: 0,
        isNew: false,
        signatureImagePath: "",
        deliverySubtype: {
            id: 0,
            name: "",
            rate: 0,
            orders: []
        },
        registerId: 0,
        register: null
    }
};

export const getTotalAssignedOrdersCount = createAsyncThunk<
    DahboardCounts,
    void,
    { rejectValue: string }
>(
    "api/Delivery/GetTotalAssignedOrdersCount",
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const res = await PRIVATE_API.get("api/Delivery/GetTotalAssignedOrdersCount");
            if (res.status === 200) {
                dispatch(setDashboardCount(res.data.DashboardCount));
                console.log("Dashboard Counts Success", res.data);
                return res.data;
            } else {
                console.log("Dashboard Counts Rejected", res.status);
                return rejectWithValue(res.data.message);
            }
        } catch (error: any) {
            if (error.response?.data?.message) {
                return rejectWithValue(error.response.data.message);
            }
            return rejectWithValue(error.message || "Pharmacy count failed");
        }
    },
);

// get getAssignedOrder
export const getAssignedOrder = createAsyncThunk<
    OrderResponse,
    { page?: number; pageSize?: number; search?: string },
    { rejectValue: string }
>(
    "Delivery/GetAssignedOrders",
    async (
        { page = 1, pageSize = 15, search },
        { dispatch, rejectWithValue },
    ) => {
        try {
            // Build query parameters dynamically
            const params = new URLSearchParams();
            if (page) params.append("page", page.toString());
            if (pageSize) params.append("pageSize", pageSize.toString());
            if (search) params.append("search", search.toString());
            const res = await PRIVATE_API.get(
                `api/Delivery/GetAssignedOrders?${params.toString()}`,
            );

            if (res.status === 200) {
                console.log("Delivery/GetAssignedOrders Success", res.data);
                return res.data;
            } else {
                console.log("Delivery/GetAssignedOrders Rejected", res.status);
                return rejectWithValue(res.data.message);
            }
        } catch (error: any) {
            if (error.response?.data?.message) {
                return rejectWithValue(error.response.data.message);
            }
            return rejectWithValue(
                error.message || "Delivery/GetAssignedOrders failed",
            );
        }
    },
);


// get UpdateOrderStatusDelivery
export const updateOrderStatusDelivery = createAsyncThunk<
    any,
    { orderId?: number; newStatus?: string },
    { rejectValue: string }
>(
    "Delivery/UpdateOrderStatusDelivery",
    async (
        { orderId, newStatus, },
        { dispatch, rejectWithValue },
    ) => {
        try {
            // Build query parameters dynamically
            const params = new URLSearchParams();
            if (orderId) params.append("orderId", orderId.toString());
            if (newStatus) params.append("newStatus", newStatus.toString());
            const res = await PRIVATE_API.post(
                `api/Delivery/UpdateOrderStatusDelivery?${params.toString()}`,
            );

            if (res.status === 200) {
                console.log("Delivery/UpdateOrderStatusDelivery Success", res.data);
                return res.data;
            } else {
                console.log("Delivery/UpdateOrderStatusDelivery Rejected", res.status);
                return rejectWithValue(res.data.message);
            }
        } catch (error: any) {
            if (error.response?.data?.message) {
                return rejectWithValue(error.response.data.message);
            }
            return rejectWithValue(
                error.message || "Delivery/UpdateOrderStatusDelivery failed",
            );
        }
    },
);

// get getAssignedOrder
export const getAssignedOrderSignaure = createAsyncThunk<
    OrderResponse,
    { page?: number; pageSize?: number; search?: string },
    { rejectValue: string }
>(
    "Delivery/GetAssignedOrdersSignature",
    async (
        { page = 1, pageSize = 15, search },
        { dispatch, rejectWithValue },
    ) => {
        try {
            // Build query parameters dynamically
            const params = new URLSearchParams();
            if (page) params.append("page", page.toString());
            if (pageSize) params.append("pageSize", pageSize.toString());
            if (search) params.append("search", search.toString());
            const res = await PRIVATE_API.get(
                `api/Delivery/GetAssignedOrdersSignature?${params.toString()}`,
            );

            if (res.status === 200) {
                console.log("Delivery/GetAssignedOrdersSignature Success", res.data);
                return res.data;
            } else {
                console.log("Delivery/GetAssignedOrdersSignature Rejected", res.status);
                return rejectWithValue(res.data.message);
            }
        } catch (error: any) {
            if (error.response?.data?.message) {
                return rejectWithValue(error.response.data.message);
            }
            return rejectWithValue(
                error.message || "Delivery/GetAssignedOrdersSignature failed",
            );
        }
    },
);
// GetAssignOrderDetails
export const getAssignOrderDetails = createAsyncThunk<
    OrderDetailsType,
    { id: number },
    { rejectValue: string }
>(
    "api/Delivery/GetAssignOrdersById",
    async ({ id }, { dispatch, rejectWithValue }) => {
        try {
            // Build query parameters dynamically
            const params = new URLSearchParams();
            const res = await PRIVATE_API.get(`api/Delivery/GetAssignOrdersById?id=${id.toString()}`);

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

export const deliverySlice = createSlice({
    name: "delivery",
    initialState,
    reducers: {
        setDashboardCount: (state, action: PayloadAction<DahboardCounts>) => {
            state.DashboardCount = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTotalAssignedOrdersCount.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                getTotalAssignedOrdersCount.fulfilled,
                (state, action: PayloadAction<DahboardCounts>) => {
                    state.loading = false;
                    state.DashboardCount = action.payload;
                    state.error = null;
                },
            )
            .addCase(getTotalAssignedOrdersCount.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
        // Delivery Orders
        builder
            .addCase(getAssignedOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAssignedOrder.fulfilled, (state, action) => {
                const { page } = action.meta.arg;

                state.loading = false;
                state.error = null;

                if (page === 1) {
                    // Replace orders on the first page
                    state.orders.orders = action.payload.orders;
                } else {
                    // Append new orders for subsequent pages
                    state.orders.orders = [
                        ...state.orders.orders,
                        ...action.payload.orders.filter(
                            (newOrder) =>
                                !state.orders.orders.some(
                                    (existingOrder) => existingOrder.id === newOrder.id,
                                ),
                        ),
                    ];
                }

                state.orders.totalOrders = action.payload.totalOrders; // Update total count
            })
            .addCase(getAssignedOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
        // AssignedOrdersSignatuer
        builder
            .addCase(getAssignedOrderSignaure.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAssignedOrderSignaure.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.signatureOrders = action.payload

            })
            .addCase(getAssignedOrderSignaure.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
        // Order Details
        builder
            .addCase(getAssignOrderDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                getAssignOrderDetails.fulfilled,
                (state, action: PayloadAction<OrderDetailsType>) => {
                    state.loading = false;
                    state.orderAssignDetails = action.payload;
                    state.error = null;
                }
            )
            .addCase(getAssignOrderDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // updateOrderStatusDelivery
        builder
            .addCase(updateOrderStatusDelivery.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                updateOrderStatusDelivery.fulfilled,
                (state, action) => {
                    state.loading = false;
                    state.error = null;
                    console.log(action.payload)
                }
            )
            .addCase(updateOrderStatusDelivery.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

    },
});

export const { setDashboardCount } = deliverySlice.actions;
export default deliverySlice.reducer;
