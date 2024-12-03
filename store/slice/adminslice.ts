import { PRIVATE_API } from "@/config/";
import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setUser } from "./authslice";

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
  orders: OrderResponse[];
  ManhattanOrders: OrderResponse[];
  QueensOrders: OrderResponse[];
  NassuOrders: OrderResponse[];
  BrooklynOrders: OrderResponse[];
  users: User[];
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
  orders: [],
  users: [],
  ManhattanOrders: [],
  QueensOrders: [],
  NassuOrders: [],
  BrooklynOrders: [],
};

export const getCount = createAsyncThunk<
  DahboardCounts,
  void,
  { rejectValue: string }
>("admin/pharmacy-order-count", async (_, { dispatch, rejectWithValue }) => {
  try {
    const res = await PRIVATE_API.get("api/SuperAdmin/DashboardCounts");
    if (res.status === 200) {
      dispatch(setDashboardCount(res.data.DashboardCount));
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
});
export const getUsers = createAsyncThunk<User[], void, { rejectValue: string }>(
  "admin/users-count",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const res = await PRIVATE_API.get("api/SuperAdmin/AllRegisterUser");
      if (res.status === 200) {
        dispatch(setUser(res.data.users));
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
  },
});

export const { setDashboardCount, setUsers } = adminSlice.actions;
export default adminSlice.reducer;
