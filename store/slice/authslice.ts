import Api from "@/config/publicApi";
import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const userSignup = createAsyncThunk<string, any>(
  "user/signup",
  async (data, ThunkApi) => {
    try {
      const res = await Api.post("/api/Auth/register", data);
      if (res.data.success) {
        console.log("Success");
        await AsyncStorage.setItem("_signup", JSON.stringify(data));
        return res.data.message; // Ensure returning a string message
      } else {
        // Return the custom error message sent by the server
        return ThunkApi.rejectWithValue(res.data.message);
      }
    } catch (error: any) {
      // Check if error response contains custom error message
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        return ThunkApi.rejectWithValue(error.response.data.message);
      } else {
        // Fallback to a generic error message if the above does not exist
        return ThunkApi.rejectWithValue(error.message);
      }
    }
  },
);

export type Signup = {
  message: string;
};

const initialState: Signup = {
  message: "",
};

export const SignupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    resetState: (state) => {
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      userSignup.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.message = action.payload;
      },
    );
    builder.addCase(
      userSignup.rejected,
      (state, action: PayloadAction<any>) => {
        state.message = action.payload as string;
      },
    );
  },
});

export const { resetState } = SignupSlice.actions;
export default SignupSlice.reducer;
