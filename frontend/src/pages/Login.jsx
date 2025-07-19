import { useState } from "react";
import { useNavigate } from "react-router";

import PageSite from "../components/PageSite";

import { Auth } from "../utils/auth";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({});

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

    console.log(form);

    // TODO: Get user from API
    // Login and add cookie
    // Redirect to /tasks
    Auth.login(form);
    navigate("/");
  };

  return (
    <PageSite title="Login">
      <div className="w-full max-w-sm mx-auto bg-white p-8">
        <h1>Login</h1>

        <form action="" onSubmit={onSubmit}>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            name="email"
            id="email"
            className="form-control"
            autoFocus={true}
            required
            onChange={onChange}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            className="form-control"
            required
            onChange={onChange}
          />

          <button>Login</button>
        </form>
      </div>
    </PageSite>
  );
};

export default Login;
