import { PUBLIC_API } from "@/config/";
import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define types
interface AuthState {
  email: string;
  message: string;
  loading: boolean;
  error: string | null;
  user: any | null;
}

const initialState: AuthState = {
  email: "",
  message: "",
  loading: false,
  error: null,
  user: null,
};

// Signup Thunk
export const userSignup = createAsyncThunk<string, any>(
  "user/signup",
  async (data, ThunkApi) => {
    try {
      const res = await PUBLIC_API.post("/api/Auth/register", data);
      if (res.status === 200) {
        console.log("Signup Success");
        await AsyncStorage.setItem("_signup", JSON.stringify(data));
        ThunkApi.dispatch(setEmail(data.email));
        console.log("Email set in Redux:", data.email);
        return res.data.message;
      } else {
        console.log("Signup Rejected", res.status);
        return ThunkApi.rejectWithValue(res.data.message);
      }
    } catch (error: any) {
      if (error.response?.data?.message) {
        return ThunkApi.rejectWithValue(error.response.data.message);
      }
      return ThunkApi.rejectWithValue(error.message || "Signup failed");
    }
  },
);

// Login Thunk
export const userLogin = createAsyncThunk<string, any>(
  "user/login",
  async (data, ThunkApi) => {
    try {
      const res = await PUBLIC_API.post("/api/Auth/login", data);
      if (res.status === 200) {
        ThunkApi.dispatch(setEmail(data.email));
        ThunkApi.dispatch(setUser(res.data));
        await AsyncStorage.setItem("_login", JSON.stringify(data));
        await AsyncStorage.setItem("userEmail", data.email);
        await AsyncStorage.setItem("token", res.data.token);
        console.log("Login Success");
        return res.data.message;
      } else {
        console.log("Login Rejected", res.status);
        return ThunkApi.rejectWithValue(res.data.message);
      }
    } catch (error: any) {
      if (error.response?.data?.message) {
        return ThunkApi.rejectWithValue(error.response.data.message);
      }
      return ThunkApi.rejectWithValue(error.message || "Login failed");
    }
  },
);

// Verify OTP Thunk
export const verifyOtp = createAsyncThunk<
  string,
  { email: string; otp: string }
>("user/verifyOtp", async (data, ThunkApi) => {
  try {
    console.log("Sending OTP data:", data);
    const res = await PUBLIC_API.post("/api/Auth/verify-otp", data);
    if (res.status === 200) {
      console.log("OTP Verification Success");
      return res.data.message;
    } else {
      console.log("OTP Verification Rejected", res.status);
      return ThunkApi.rejectWithValue(res.data.message);
    }
  } catch (error: any) {
    if (error.response?.data?.message) {
      return ThunkApi.rejectWithValue(error.response.data.message);
    }
    return ThunkApi.rejectWithValue(error.message || "OTP verification failed");
  }
});

export const reset_password = createAsyncThunk<string, { email: string }>(
  "user/reset_request",
  async (data, ThunkApi) => {
    try {
      console.log("Sending OTP data:", data);
      const res = await PUBLIC_API.post(
        "/api/Auth/request-password-reset",
        data,
      );
      if (res.status === 200) {
        console.log("Request Success! Code Sent");
        return res.data.message;
      } else {
        console.log("Request Rejected", res.status);
        return ThunkApi.rejectWithValue(res.data.message);
      }
    } catch (error: any) {
      if (error.response?.data?.message) {
        return ThunkApi.rejectWithValue(error.response.data.message);
      }
      return ThunkApi.rejectWithValue(error.message || "request failed");
    }
  },
);
export const new_password = createAsyncThunk<
  string,
  { email: string; code: string; newPassword: string }
>("user/new_password", async ({ email, code, newPassword }, ThunkApi) => {
  try {
    console.log("Sending OTP data:", { email, code, newPassword });
    const res = await PUBLIC_API.post("/api/Auth/reset-password", {
      email,
      code,
      newPassword,
    });
    if (res.status === 200) {
      console.log("new pass Success! ");
      return res.data.message;
    } else {
      console.log("Request Rejected", res.status);
      return ThunkApi.rejectWithValue(res.data.message);
    }
  } catch (error: any) {
    if (error.response?.data?.message) {
      return ThunkApi.rejectWithValue(error.response.data.message);
    }
    return ThunkApi.rejectWithValue(error.message || "request failed");
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetState: (state) => {
      state.message = "";
      state.error = null;
      state.loading = false;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
    clearAuth: (state) => {
      state.email = "";
      state.message = "";
      state.loading = false;
      state.error = null;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    // Signup cases
    builder
      .addCase(userSignup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userSignup.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.message = action.payload ?? "";
        state.error = null;
      })
      .addCase(userSignup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Login cases
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.message = action.payload;
        state.error = null;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // OTP verification cases
    builder
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.message = action.payload;
        state.error = null;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // reset_password
    builder
      .addCase(reset_password.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        reset_password.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.message = action.payload;
          state.error = null;
        },
      )
      .addCase(reset_password.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // new_password
    builder
      .addCase(new_password.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        new_password.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.message = action.payload;
          state.error = null;
        },
      )
      .addCase(new_password.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetState, setEmail, clearAuth, setUser } = authSlice.actions;
export default authSlice.reducer;
