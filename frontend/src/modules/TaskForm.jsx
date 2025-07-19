import React, { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../redux/hooks";

const TaskForm = ({ data = {} }) => {
  const dispatch = useAppDispatch();

  const { users } = useAppSelector((state) => state.users);

  const [form, setForm] = useState({});

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
  };

  console.log(form);

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
        >
          {["TODO", "IN_PROGRESS", "DONE"].map((s, index) => {
            return (
              <option key={index} value={s}>
                {s}
              </option>
            );
          })}
        </select>
      </div>

      <div className="mb-2">
        <label>Status</label>
        <br />
        <select
          name="priority"
          className="form-control max-w-32"
          onChange={onChange}
          value={form?.priority}
        >
          {[...Array.from(Array(10))].map((s, index) => {
            return (
              <option key={index} value={index + 1}>
                {index + 1}
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
          value={form?.priority}
        >
          <option value="">Select user to assign</option>

          {users?.map((user, index) => {
            return (
              <option key={index} value={user?.id}>
                {user?.email}
              </option>
            );
          })}
        </select>
      </div>

      <div className="mb-2">
        <button className="w-full">Login</button>
      </div>
    </form>
  );
};

export default TaskForm;
