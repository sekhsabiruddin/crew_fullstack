import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../../server";
// Async thunk for fetching all tasks

// Async thunk for fetching all tasks
export const fetchTodos = createAsyncThunk(
  "todoTask/fetchTodos",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${server}/task/all-tasks`, {
        withCredentials: true,
      });
      console.log("fetch the task", response.data.tasks);
      return response.data.tasks;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
// Async thunk for creating a todo
export const createTodo = createAsyncThunk(
  "todoTask/createTodo",
  async (todoData, thunkAPI) => {
    try {
      const response = await axios.post(
        `${server}/task/create-task`,
        todoData,
        { withCredentials: true }
      );
      return response.data.task;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for deleting a todo
export const deleteTodo = createAsyncThunk(
  "todoTask/deleteTodo",
  async (taskId, thunkAPI) => {
    try {
      await axios.delete(`${server}/task/delete-task/${taskId}`, {
        withCredentials: true,
      });
      return taskId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateTodo = createAsyncThunk(
  "todoTask/updateTodo",
  async ({ taskId, updates }, thunkAPI) => {
    try {
      const response = await axios.put(
        `${server}/task/update-task/${taskId}`,
        updates,
        { withCredentials: true }
      );
      console.log(" response.data", response.data);
      return response.data.updatedTask;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const todoTask = createSlice({
  name: "todoTask",
  initialState: {
    todoData: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todoData = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.todoData.push(action.payload);
      })
      .addCase(createTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.todoData = state.todoData.filter(
          (todo) => todo._id !== action.payload
        );
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.loading = false;
        const updatedTodo = action.payload;
        const index = state.todoData.findIndex(
          (todo) => todo._id === updatedTodo._id
        );
        if (index !== -1) {
          state.todoData[index] = updatedTodo;
        }
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default todoTask.reducer;
