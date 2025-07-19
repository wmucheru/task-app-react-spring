import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { useAPI } from "../../utils/api";

import * as types from "../actions/actionTypes";

const initialState = {
  users: [],
  user: {},
  userStatus: {
    message: "",
    error: false,
    loading: false,
    deleted: false,
  },
};

export const fetchUsers = createAsyncThunk(
  types.FETCH_USERS,
  async (filter, { rejectWithValue }) => {
    try {
      let response = await useAPI({
        type: "GET",
        url: "/users",
        params: filter,
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const fetchUser = createAsyncThunk(
  types.FETCH_USER,
  async (id, { rejectWithValue }) => {
    try {
      let response = await useAPI({
        type: "GET",
        url: `/users/${id}`,
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const addUser = createAsyncThunk(
  types.ADD_USER,
  async (obj, { rejectWithValue }) => {
    try {
      let response = await useAPI({
        type: "POST",
        url: "/users",
        data: obj,
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const updateUser = createAsyncThunk(
  types.UPDATE_USER,
  async (obj, { rejectWithValue }) => {
    try {
      let response = await useAPI({
        type: "PUT",
        url: "/users",
        data: obj,
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const deleteUser = createAsyncThunk(
  types.DELETE_USER,
  async (id, { rejectWithValue }) => {
    try {
      let response = await useAPI({
        type: "DELETE",
        url: `/users/${id}`,
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setActiveUser: (state, action) => {
      state.user = action.payload;
      state.userStatus = initialState.userStatus;
    },
  },
  extraReducers: (builder) => {
    /**
     *
     * Fetch users
     *
     */
    builder.addCase(fetchUsers.pending, (state) => {
      state.users = [];
      state.user = {};
      state.userStatus.loading = true;
      state.userStatus.message = "";
    });

    builder.addCase(fetchUsers.rejected, (state, action) => {
      const { message, error } = action?.payload || {};

      state.userStatus.message = message;
      state.userStatus.error = error;
      state.userStatus.loading = false;
    });

    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload || [];
      state.userStatus.loading = false;
    });

    /**
     *
     * Fetch single user
     *
     */
    builder.addCase(fetchUser.pending, (state) => {
      state.users = [];
      state.user = {};
      state.userStatus.loading = true;
      state.userStatus.message = "";
    });

    builder.addCase(fetchUser.rejected, (state, action) => {
      const { message, error } = action?.payload || {};

      state.userStatus.message = message;
      state.userStatus.error = error;
      state.userStatus.loading = false;
    });

    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.userStatus.loading = false;
    });

    /**
     *
     * Add user
     *
     */
    builder.addCase(addUser.pending, (state) => {
      state.user = {};
      state.userStatus.loading = true;
    });

    builder.addCase(addUser.rejected, (state, action) => {
      const { message, error } = action?.payload || {};

      state.userStatus.message = message;
      state.userStatus.error = error;
      state.userStatus.loading = false;
    });

    builder.addCase(addUser.fulfilled, (state, action) => {
      const { user, message, error } = action.payload;

      state.user = user;
      state.users = [...state.users, user];
      state.userStatus = {
        message,
        error,
        loading: false,
        deleted: false,
      };
    });

    /**
     *
     * Update user
     *
     */
    builder.addCase(updateUser.pending, (state) => {
      state.user = {};
      state.userStatus.loading = true;
    });

    builder.addCase(updateUser.rejected, (state, action) => {
      const { message, error } = action?.payload || {};

      state.userStatus.message = message;
      state.userStatus.error = error;
      state.userStatus.loading = false;
    });

    builder.addCase(updateUser.fulfilled, (state, action) => {
      const { user, message, error } = action.payload;

      state.users = [...state.users].map((s, i) =>
        s.id === user.id ? user : s
      );
      state.userStatus = {
        message,
        error,
        loading: false,
        deleted: false,
      };
    });

    /**
     *
     * Delete user
     *
     */
    builder.addCase(deleteUser.pending, (state) => {
      state.user = {};
      state.userStatus.message = "";
      state.userStatus.loading = true;
      state.userStatus.deleted = false;
    });

    builder.addCase(deleteUser.rejected, (state, action) => {
      const { message, error } = action?.payload || {};

      state.userStatus.message = message;
      state.userStatus.error = error;
      state.userStatus.loading = false;
    });

    builder.addCase(deleteUser.fulfilled, (state, action) => {
      const { id, message, error } = action.payload;

      if (id) {
        state.users = [...state.users].filter((s) => s.id !== id);
      }

      state.userStatus.deleted = true;
      state.userStatus.message = message;
      state.userStatus.error = error;
      state.userStatus.loading = false;
    });
  },
});

export const { setActiveUser } = userSlice.actions;

export default userSlice.reducer;
