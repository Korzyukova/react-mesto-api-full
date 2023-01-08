import React from "react";
import { Redirect } from "react-router-dom";

export default function Logout(props) {
  if (localStorage.getItem("token") !== null) {
    localStorage.removeItem("token");
    props.handleLogout();
    return <Redirect to="/sign-in" />;
  } else {
    props.handleLogout();
    return <Redirect to="/sign-in" />;
  }
}
