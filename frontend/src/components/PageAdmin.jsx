import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router";

import Page from "./Page";

import { APP_NAME } from "../utils/constants";
import { Auth } from "../utils/auth";

const PageAdmin = ({ title, children = <></> }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // TODO: If not logged-in, redirect to login
    if (!Auth.isLoggedIn()) {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onLogout = (e) => {
    e.preventDefault();

    Auth.logout();

    // TODO: redirect to login
    navigate("/login");
  };

  return (
    <Page title={title}>
      <nav className="flex gap-4 w-full mb-4 bg-white p-4">
        <a href="/" className="mr-12">
          <img src="/logo512.png" className="max-w-8" alt={APP_NAME} />
        </a>

        <div className="flex justify-between gap-4 w-full">
          <NavLink to="/tasks">Tasks</NavLink>
          <a href="/" onClick={onLogout}>
            Logout &rarr;
          </a>
        </div>
      </nav>

      <main className="w-full min-h-screen">{children}</main>
    </Page>
  );
};

export default PageAdmin;
