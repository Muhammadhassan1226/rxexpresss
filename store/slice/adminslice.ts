import { PRIVATE_API } from "@/config/";
import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setUser } from "./authslice";
import { OrderResponse } from "@/types/admin";

type DahboardCounts = {
  registerUserCount: string;
  deliveryUserCount: string;
  pharmacyUserCount: string;
  allOrdersCount: string;
  ordersReadyForPickup: string;
  ordersOutForDelivery: string;
  ordersDelivered: string;
};

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  businessName: string;
  doingBusinessAs: string;
  addrress: string;
  city: string;
  state: string;
  zipcode: number;
  apt: string;
  facility: null | string;
  role: null | string;
  createdAt: string;
}

export interface admindashboard {
  DashboardCount: DahboardCounts;
  loading: boolean;
  error: null | string;
  message: string;
  orders: OrderResponse;
  ManhattanOrders: OrderResponse;
  QueensOrders: OrderResponse;
  NassuOrders: OrderResponse;
  BrooklynOrders: OrderResponse;
  users: User[];
  AllOrdersWithoutDelivered: OrderResponse;
  Deliveryusers: User[];
  AssignedOrders: OrderResponse;
  SignatureOrders: OrderResponse;
}

const initialState: admindashboard = {
  DashboardCount: {
    registerUserCount: "0",
    deliveryUserCount: "0",
    pharmacyUserCount: "0",
    allOrdersCount: "0",
    ordersReadyForPickup: "0",
    ordersOutForDelivery: "0",
    ordersDelivered: "0",
  },
  loading: false,
  error: null,
  message: "",
  orders: {
    totalOrders: 0,
    orders: [],
  },
  users: [],
  Deliveryusers: [],
  ManhattanOrders: {
    totalOrders: 0,
    orders: [],
  },
  QueensOrders: {
    totalOrders: 0,
    orders: [],
  },
  NassuOrders: {
    totalOrders: 0,
    orders: [],
  },
  BrooklynOrders: {
    totalOrders: 0,
    orders: [],
  },
  AllOrdersWithoutDelivered: {
    totalOrders: 0,
    orders: [],
  },
  AssignedOrders: {
    totalOrders: 0,
    orders: [],
  },
  SignatureOrders: {
    totalOrders: 0,
    orders: [],
  },
};

export const getCount = createAsyncThunk<
  DahboardCounts,
  void,
  { rejectValue: string }
>(
  "api/SuperAdmin/DashboardCounts",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const res = await PRIVATE_API.get("api/SuperAdmin/DashboardCounts");
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

export const getUsers = createAsyncThunk<User[], void, { rejectValue: string }>(
  "admin/users-count",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const res = await PRIVATE_API.get("api/SuperAdmin/AllRegisterUser");
      if (res.status === 200) {
        dispatch(setUser(res.data.users));
        console.log("All Register User Success", res.data);
        return res.data;
      } else {
        console.log("All Register User Rejected", res.status);
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

// get Order
export const getOrder = createAsyncThunk<
  OrderResponse,
  { page?: number; pageSize?: number; search?: string },
  { rejectValue: string }
>(
  "SuperAdmin/GetAllPharamacyOrders",
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
        `api/SuperAdmin/GetAllPharamacyOrders?${params.toString()}`,
      );

      if (res.status === 200) {
        console.log("SuperAdmin/GetAllPharamacyOrders Success", res.data);
        return res.data;
      } else {
        console.log("SuperAdmin/GetAllPharamacyOrders Rejected", res.status);
        return rejectWithValue(res.data.message);
      }
    } catch (error: any) {
      if (error.response?.data?.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(
        error.message || "SuperAdmin/GetAllPharamacyOrders failed",
      );
    }
  },
);

// get ManhattanOrders
export const manhattanOrders = createAsyncThunk<
  OrderResponse,
  { page?: number; pageSize?: number; search?: string },
  { rejectValue: string }
>(
  "SuperAdmin/GetManhattanOrders",
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
        `api/SuperAdmin/GetManhattanOrders?${params.toString()}`,
      );

      if (res.status === 200) {
        console.log("SuperAdmin/GetManhattanOrders Success", res.data);
        return res.data;
      } else {
        console.log("SuperAdmin/GetManhattanOrders Rejected", res.status);
        return rejectWithValue(res.data.message);
      }
    } catch (error: any) {
      if (error.response?.data?.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(
        error.message || "SuperAdmin/GetManhattanOrders failed",
      );
    }
  },
);

// get NassauOrders
export const nassauOrders = createAsyncThunk<
  OrderResponse,
  { page?: number; pageSize?: number; search?: string },
  { rejectValue: string }
>(
  "SuperAdmin/GetNassauOrders",
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
        `api/SuperAdmin/GetNassauOrders?${params.toString()}`,
      );

      if (res.status === 200) {
        console.log("SuperAdmin/GetNassauOrders Success", res.data);
        return res.data;
      } else {
        console.log("SuperAdmin/GetNassauOrders Rejected", res.status);
        return rejectWithValue(res.data.message);
      }
    } catch (error: any) {
      if (error.response?.data?.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(
        error.message || "SuperAdmin/GetNassauOrders failed",
      );
    }
  },
);
// get QueensOrders
export const queensOrders = createAsyncThunk<
  OrderResponse,
  { page?: number; pageSize?: number; search?: string },
  { rejectValue: string }
>(
  "SuperAdmin/GetQueensOrders",
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
        `api/SuperAdmin/GetQueensOrders?${params.toString()}`,
      );

      if (res.status === 200) {
        console.log("SuperAdmin/GetQueensOrders Success", res.data);
        return res.data;
      } else {
        console.log("SuperAdmin/GetQueensOrders Rejected", res.status);
        return rejectWithValue(res.data.message);
      }
    } catch (error: any) {
      if (error.response?.data?.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(
        error.message || "SuperAdmin/GetQueensOrders failed",
      );
    }
  },
);

// get BrooklynOrders
export const brooklynOrders = createAsyncThunk<
  OrderResponse,
  { page?: number; pageSize?: number; search?: string },
  { rejectValue: string }
>(
  "SuperAdmin/GetBrooklynOrders",
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
        `api/SuperAdmin/GetBrooklynOrders?${params.toString()}`,
      );

      if (res.status === 200) {
        console.log("SuperAdmin/GetBrooklynOrders Success", res.data);
        return res.data;
      } else {
        console.log("SuperAdmin/GetBrooklynOrders Rejected", res.status);
        return rejectWithValue(res.data.message);
      }
    } catch (error: any) {
      if (error.response?.data?.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(
        error.message || "SuperAdmin/GetBrooklynOrders failed",
      );
    }
  },
);

// get all orders without deleieverd
export const AllOrdersWithoutDelivered = createAsyncThunk<
  OrderResponse,
  { page?: number; pageSize?: number; search?: string },
  { rejectValue: string }
>(
  "SuperAdmin/OrdersWithoutDelivered",
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
        `api/SuperAdmin/GetAllPharmacyOrdersWithoutDelivered?${params.toString()}`,
      );

      if (res.status === 200) {
        console.log(
          "SuperAdmin/GetAllPharmacyOrdersWithoutDelivered Success",
          res.data,
        );
        return res.data;
      } else {
        console.log(
          "SuperAdmin/GetAllPharmacyOrdersWithoutDelivered Rejected",
          res.status,
        );
        return rejectWithValue(res.data.message);
      }
    } catch (error: any) {
      if (error.response?.data?.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(
        error.message ||
          "SuperAdmin/GetAllPharmacyOrdersWithoutDelivered failed",
      );
    }
  },
);

// Delivery users
export const Deliveryusers = createAsyncThunk<
  User[],
  void,
  { rejectValue: string }
>("admin/Delivery-users", async (_, { dispatch, rejectWithValue }) => {
  try {
    const res = await PRIVATE_API.get("api/SuperAdmin/AllDeliveryUsers");
    if (res.status === 200) {
      dispatch(setUser(res.data.users));
      console.log("All Register User Success", res.data);
      return res.data;
    } else {
      console.log("All Register User Rejected", res.status);
      return rejectWithValue(res.data.message);
    }
  } catch (error: any) {
    if (error.response?.data?.message) {
      return rejectWithValue(error.response.data.message);
    }
    return rejectWithValue(error.message || "Pharmacy count failed");
  }
});

// get all Assigned orders

export const AssignedOrders = createAsyncThunk<
  OrderResponse,
  { page?: number; pageSize?: number; search?: string },
  { rejectValue: string }
>(
  "SuperAdmin/AssignedOrders",
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
        `api/SuperAdmin/GetALLAssignedOrdersFromAdmin?${params.toString()}`,
      );

      if (res.status === 200) {
        console.log(
          "SuperAdmin/GetALLAssignedOrdersFromAdmin Success",
          res.data,
        );
        return res.data;
      } else {
        console.log(
          "SuperAdmin/GetALLAssignedOrdersFromAdmin Rejected",
          res.status,
        );
        return rejectWithValue(res.data.message);
      }
    } catch (error: any) {
      if (error.response?.data?.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(
        error.message ||
          "SuperAdmin/GetAllPharmacyOrdersWithoutDelivered failed",
      );
    }
  },
);

// get all Signature orders

export const SignatureOrders = createAsyncThunk<
  OrderResponse,
  { page?: number; pageSize?: number; search?: string },
  { rejectValue: string }
>(
  "SuperAdmin/SignatureOrders",
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
        `api/SuperAdmin/GetAssignedOrdersSignatureByAdmin?${params.toString()}`,
      );

      if (res.status === 200) {
        console.log(
          "SuperAdmin/GetAssignedOrdersSignatureByAdmin Success",
          res.data,
        );
        return res.data;
      } else {
        console.log(
          "SuperAdmin/GetALLAssignedOrdersFromAdmin Rejected",
          res.status,
        );
        return rejectWithValue(res.data.message);
      }
    } catch (error: any) {
      if (error.response?.data?.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(
        error.message || "SuperAdmin/GetAssignedOrdersSignatureByAdmin failed",
      );
    }
  },
);

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setDashboardCount: (state, action: PayloadAction<DahboardCounts>) => {
      state.DashboardCount = action.payload;
    },
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getCount.fulfilled,
        (state, action: PayloadAction<DahboardCounts>) => {
          state.loading = false;
          state.DashboardCount = action.payload;
          state.error = null;
        },
      )
      .addCase(getCount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    builder
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.loading = false;
        state.users = action.payload;
        state.error = null;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    builder
      .addCase(getOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrder.fulfilled, (state, action) => {
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
      .addCase(getOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // GetManhattanOrders
    builder
      .addCase(manhattanOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(manhattanOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.ManhattanOrders = action.payload;
      })
      .addCase(manhattanOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // GetNassauOrders
    builder
      .addCase(nassauOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(nassauOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.NassuOrders = action.payload;
      })
      .addCase(nassauOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    // GetQueensOrders
    builder
      .addCase(queensOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(queensOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.QueensOrders = action.payload;
      })
      .addCase(queensOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // GetBrooklynOrders
    builder
      .addCase(brooklynOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(brooklynOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.BrooklynOrders = action.payload;
      })
      .addCase(brooklynOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    // Orderswithoutdelivered
    builder
      .addCase(AllOrdersWithoutDelivered.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(AllOrdersWithoutDelivered.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.AllOrdersWithoutDelivered = action.payload;
      })
      .addCase(AllOrdersWithoutDelivered.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    // Deliveryusers
    builder
      .addCase(Deliveryusers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(Deliveryusers.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.Deliveryusers = action.payload;
      })
      .addCase(Deliveryusers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    // Assignedorders
    builder
      .addCase(AssignedOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(AssignedOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.AssignedOrders = action.payload;
      })
      .addCase(AssignedOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    // SignatureOrders
    builder
      .addCase(SignatureOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(SignatureOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.SignatureOrders = action.payload;
      })
      .addCase(SignatureOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setDashboardCount, setUsers } = adminSlice.actions;
export default adminSlice.reducer;
