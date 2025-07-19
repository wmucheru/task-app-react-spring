import { useEffect } from "react";
import { useNavigate } from "react-router";

import Page from "./Page";
import { Auth } from "../utils/auth";

const PageSite = ({ title, children = <></> }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // TODO: If logged-in, redirect to admin
    // Redirect to /tasks
    if (Auth.isLoggedIn()) {
      navigate("/");
    }
  });

  return <Page title={title}>{children}</Page>;
};

export default PageSite;
