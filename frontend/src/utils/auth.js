// https://www.npmjs.com/package/js-cookie

import Cookies from "js-cookie";

const COOKIE_USER = "user";

const COOKIE_PARAMS = { expires: 7 };

export const Auth = {
  /**
   *
   * Get stored user token
   *
   */
  getUserToken: function () {
    return "";
  },

  /**
   *
   * Check if JWT token is valid and/or expired
   *
   */
  validateToken: function () {},

  /**
   *
   * Check if user is logged in. Check if token is valid
   *
   */
  isLoggedIn: function () {
    return this.getUser()?.email !== undefined;
  },

  /**
   *
   * Get user
   *
   */
  getUser: function () {
    try {
      const user = Cookies.get(COOKIE_USER);

      if (!user) {
        return {};
      } else {
        return JSON.parse(user);
      }
    } catch (error) {
      return {};
    }
  },

  /**
   *
   * Authorize user and store session
   *
   */
  login: function (user) {
    Cookies.set(COOKIE_USER, JSON.stringify(user), COOKIE_PARAMS);
  },

  /**
   *
   * Logout user. Remove user session
   *
   */
  logout: function () {
    Cookies.remove(COOKIE_USER, COOKIE_PARAMS);
  },
};
