import React, { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { TaskPriority, TaskStatus } from "../utils/constants";
import { addTask, updateTask } from "../redux/slices/task";

const TaskForm = ({ data = {} }) => {
  const dispatch = useAppDispatch();

  const { users } = useAppSelector((state) => state.users);

  const [form, setForm] = useState({
    status: TaskStatus.TODO,
    priority: TaskPriority.MEDIUM,
  });

  useEffect(() => {
    if (data?.id) {
      setForm(data);
    }
  }, [data]);

  const onChange = (e) => {
    const { name, value } = e.target;

    setForm((prevForm) => {
      return {
        ...prevForm,
        [name]: value,
      };
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    delete form?.createdAt;
    delete form?.updatedAt;

    if (form?.id) {
      dispatch(updateTask(form));
    } else {
      dispatch(
        addTask({
          ...form,
          creatorId: 1,
        })
      );
    }
  };

  console.log(users);

  return (
    <form className="p-4 max-w-sm" onSubmit={onSubmit}>
      <div className="mb-2">
        <label>Title</label>
        <input
          type="text"
          name="title"
          className="form-control"
          onChange={onChange}
          value={form?.title}
          required
        />
      </div>

      <div className="mb-2">
        <label>Description</label>
        <textarea
          name="description"
          className="form-control"
          rows={5}
          onChange={onChange}
          value={form?.description}
          required
        ></textarea>
      </div>

      <div className="mb-2">
        <label>Status</label>
        <br />
        <select
          name="status"
          className="form-control max-w-32"
          onChange={onChange}
          value={form?.status}
          required
        >
          {[
            { label: "TODO", value: TaskStatus.TODO },
            { label: "IN PROGRESS", value: TaskStatus.IN_PROGRESS },
            { label: "COMPLETED", value: TaskStatus.COMPLETED },
          ].map((s, index) => {
            return (
              <option key={index} value={s?.value}>
                {s?.label}
              </option>
            );
          })}
        </select>
      </div>

      <div className="mb-2">
        <label>Priority</label>
        <br />
        <select
          name="priority"
          className="form-control max-w-32"
          onChange={onChange}
          value={form?.priority}
          required
        >
          {[
            { label: "HIGH", value: TaskPriority.HIGH },
            { label: "MEDIUM", value: TaskPriority.MEDIUM },
            { label: "COMPLETED", value: TaskPriority.COMPLETED },
          ].map((p, index) => {
            return (
              <option key={index} value={p?.value}>
                {p?.label}
              </option>
            );
          })}
        </select>
      </div>

      <div className="mb-2">
        <label>Assignee</label>
        <br />
        <select
          name="assigneeId"
          className="form-control"
          onChange={onChange}
          value={form?.assigneeId}
          required
        >
          <option value="">Select user to assign</option>

          {users?.map((user, index) => {
            return (
              <option key={index} value={user?.id}>
                {user?.username}
              </option>
            );
          })}
        </select>
      </div>

      <div className="mb-2">
        <button className="w-full">
          {form?.id ? "Update" : "Create"} Task
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
