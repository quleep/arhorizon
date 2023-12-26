import React, { createContext, useContext, useState, useEffect } from "react";

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [selectedItem, setSelectedItem] = useState("editor");

  useEffect(() => {
    const userInfo = localStorage.getItem("user");
    console.log(userInfo);

    setUser(userInfo);
  }, []);

  return (
    <StateContext.Provider
      value={{
        user,
        setUser,
        selectedItem,
        setSelectedItem,
      }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
