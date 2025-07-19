import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { useAPI } from "../../utils/api";

import * as types from "../actions/actionTypes";

const initialState = {
  tasks: [],
  task: {},
  taskStatus: {
    message: "",
    error: false,
    loading: false,
    deleted: false,
  },
};

export const fetchTasks = createAsyncThunk(
  types.FETCH_TASKS,
  async (filter, { rejectWithValue }) => {
    try {
      let response = await useAPI({
        type: "GET",
        url: "/tasks",
        params: filter,
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const fetchTask = createAsyncThunk(
  types.FETCH_TASK,
  async (id, { rejectWithValue }) => {
    try {
      let response = await useAPI({
        type: "GET",
        url: `/tasks/${id}`,
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const addTask = createAsyncThunk(
  types.ADD_TASK,
  async (obj, { rejectWithValue }) => {
    try {
      let response = await useAPI({
        type: "POST",
        url: "/tasks",
        data: obj,
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const updateTask = createAsyncThunk(
  types.UPDATE_TASK,
  async (obj, { rejectWithValue }) => {
    try {
      let response = await useAPI({
        type: "PUT",
        url: "/tasks",
        data: obj,
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const deleteTask = createAsyncThunk(
  types.DELETE_TASK,
  async (id, { rejectWithValue }) => {
    try {
      let response = await useAPI({
        type: "DELETE",
        url: `/tasks/${id}`,
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setActiveTask: (state, action) => {
      state.task = action.payload;
      state.taskStatus = initialState.taskStatus;
    },
  },
  extraReducers: (builder) => {
    /**
     *
     * Fetch tasks
     *
     */
    builder.addCase(fetchTasks.pending, (state) => {
      state.tasks = [];
      state.task = {};
      state.taskStatus.loading = true;
      state.taskStatus.message = "";
    });

    builder.addCase(fetchTasks.rejected, (state, action) => {
      const { message, error } = action?.payload || {};

      state.taskStatus.message = message;
      state.taskStatus.error = error;
      state.taskStatus.loading = false;
    });

    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      const { _embedded = {} } = action.payload;

      state.tasks = _embedded?.tasks || [];
      state.taskStatus.loading = false;
    });

    /**
     *
     * Fetch single task
     *
     */
    builder.addCase(fetchTask.pending, (state) => {
      state.tasks = [];
      state.task = {};
      state.taskStatus.loading = true;
      state.taskStatus.message = "";
    });

    builder.addCase(fetchTask.rejected, (state, action) => {
      const { message, error } = action?.payload || {};

      state.taskStatus.message = message;
      state.taskStatus.error = error;
      state.taskStatus.loading = false;
    });

    builder.addCase(fetchTask.fulfilled, (state, action) => {
      state.task = action.payload;
      state.taskStatus.loading = false;
    });

    /**
     *
     * Add task
     *
     */
    builder.addCase(addTask.pending, (state) => {
      state.task = {};
      state.taskStatus.loading = true;
    });

    builder.addCase(addTask.rejected, (state, action) => {
      const { message, error } = action?.payload || {};

      state.taskStatus.message = message;
      state.taskStatus.error = error;
      state.taskStatus.loading = false;
    });

    builder.addCase(addTask.fulfilled, (state, action) => {
      const { task, message, error } = action.payload;

      state.task = task;
      state.tasks = [...state.tasks, task];
      state.taskStatus = {
        message,
        error,
        loading: false,
        deleted: false,
      };
    });

    /**
     *
     * Update task
     *
     */
    builder.addCase(updateTask.pending, (state) => {
      state.task = {};
      state.taskStatus.loading = true;
    });

    builder.addCase(updateTask.rejected, (state, action) => {
      const { message, error } = action?.payload || {};

      state.taskStatus.message = message;
      state.taskStatus.error = error;
      state.taskStatus.loading = false;
    });

    builder.addCase(updateTask.fulfilled, (state, action) => {
      const { task, message, error } = action.payload;

      state.tasks = [...state.tasks].map((s, i) =>
        s.id === task.id ? task : s
      );
      state.taskStatus = {
        message,
        error,
        loading: false,
        deleted: false,
      };
    });

    /**
     *
     * Delete task
     *
     */
    builder.addCase(deleteTask.pending, (state) => {
      state.task = {};
      state.taskStatus.message = "";
      state.taskStatus.loading = true;
      state.taskStatus.deleted = false;
    });

    builder.addCase(deleteTask.rejected, (state, action) => {
      const { message, error } = action?.payload || {};

      state.taskStatus.message = message;
      state.taskStatus.error = error;
      state.taskStatus.loading = false;
    });

    builder.addCase(deleteTask.fulfilled, (state, action) => {
      const { id, message, error } = action.payload;

      if (id) {
        state.tasks = [...state.tasks].filter((s) => s.id !== id);
      }

      state.taskStatus.deleted = true;
      state.taskStatus.message = message;
      state.taskStatus.error = error;
      state.taskStatus.loading = false;
    });
  },
});

export const { setActiveTask } = taskSlice.actions;

export default taskSlice.reducer;
