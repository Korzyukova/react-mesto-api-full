import React from "react";

export const currentUser = {
  name: "",
  about: "",
  avatar: "",
  id: null,
};

export const CurrentUserContext = React.createContext(currentUser);
