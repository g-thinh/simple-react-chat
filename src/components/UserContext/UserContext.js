import React from "react";

export const UserContext = React.createContext({ user: null });

const UserProvider = ({ children }) => {
  const [user, setUser] = React.useState();

  return <UserContext.Provider>{children}</UserContext.Provider>;
};

export default UserProvider;
