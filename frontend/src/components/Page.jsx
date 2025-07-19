import { useEffect } from "react";

import { APP_NAME } from "../utils/constants";
import { Auth } from "../utils/auth";

const Page = ({ title = APP_NAME, children = <></> }) => {
  useEffect(() => {
    // console.log("USER: ", Auth.getUser());
    // console.log("IS_LOGGED_IN: ", Auth.isLoggedIn());
  });

  return (
    <>
      <>
        <meta name="author" content={APP_NAME} />
        <meta
          name="description"
          content="API reference for the <meta> component in React DOM"
        />
        <title>{title || "My App"}</title>
      </>

      <main className="p-4 max-w-6xl w-full mx-auto">{children}</main>

      <footer className="p-4 text-white text-center">
        &copy; 2025 {APP_NAME}
      </footer>
    </>
  );
};

export default Page;
