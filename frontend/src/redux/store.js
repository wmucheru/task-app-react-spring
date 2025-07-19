/**
 *
 * https://redux-toolkit.js.org
 *
 */
import { configureStore } from "@reduxjs/toolkit";

import taskReducer from "./slices/task";
import userReducer from "./slices/user";

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
    users: userReducer,
  },
  devTools: true,
});
