import { configureStore } from "@reduxjs/toolkit";
import todoTaskReducer from "./reducer/Taskslice";
import authReducer from "./reducer/auth";
const store = configureStore({
  reducer: {
    auth: authReducer,
    todoTask: todoTaskReducer,
  },
});

export default store;
