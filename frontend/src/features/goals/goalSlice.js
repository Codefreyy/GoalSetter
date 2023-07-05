import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import goalService from "./ goalService";

const initialState = {
  goals: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

// create new goal
export const createGoal = createAsyncThunk(
  "goal/create",
  async (goalData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await goalService.createGoal(goalData, token);
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toSting();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// get goals
export const getGoals = createAsyncThunk("goal/getAll", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return goalService.getGoals(token);
  } catch (err) {
    const message =
      (err.response && err.response.data && err.response.data.message) ||
      err.message ||
      err.toSting();
    return thunkAPI.rejectWithValue(message);
  }
});

//delete goal
export const deleteGoal = createAsyncThunk(
  "goal/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await goalService.deleteGoal(id, token);
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toSting();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const goalSlice = createSlice({
  name: "goal",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createGoal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createGoal.fulfilled, (state, actions) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.goals.push(actions.payload);
      })
      .addCase(createGoal.rejected, (state, actions) => {
        state.isLoading = false;
        state.isError = true;
        state.message = actions.payload;
      })
      .addCase(getGoals.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getGoals.fulfilled, (state, actions) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.goals = actions.payload;
      })
      .addCase(getGoals.rejected, (state, actions) => {
        state.isLoading = false;
        state.isError = true;
        state.message = actions.payload;
      })
      .addCase(deleteGoal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteGoal.fulfilled, (state, actions) => {
        state.isLoading = false;
        state.isSuccess = true;
        console.log("actions.payload", actions.payload.id);
        state.goals = state.goals.filter(
          (goal) => goal._id !== actions.payload.id
        );
      })
      .addCase(deleteGoal.rejected, (state, actions) => {
        state.isLoading = false;
        state.isError = true;
        state.message = actions.payload;
      });
  },
});

export const { reset } = goalSlice.actions;
export default goalSlice.reducer;
