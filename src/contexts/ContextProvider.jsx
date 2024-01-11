import React, { createContext, useContext, useState, useEffect } from "react";

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [selectedItem, setSelectedItem] = useState("editor");
  const [productId, setProductId] = useState(null);

  useEffect(() => {
    const userInfo = localStorage.getItem("user");

    setUser(userInfo);
  }, []);

  return (
    <StateContext.Provider
      value={{
        user,
        setUser,
        selectedItem,
        setSelectedItem,
        productId,
        setProductId,
      }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
