import React, { useEffect, useState } from "react";
import { Navbar } from "../components";
import { useStateContext } from "../contexts/ContextProvider";
import { useNavigate } from "react-router-dom";
import SidebarDash from "../components/SidebarDash";
const Editor = () => {
  const { user } = useStateContext();
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const Menus = [
    { title: "Image Based AR", src: "Folder", route: "editor", gap: true },

    { title: "Analytics", src: "Chart", route: "analytics" },
    // { title: "Products", src: "Folder", gap: true },
  ];
  const nextPage = (route) => {
    navigate(`/${route}`);
  };
  const nextPage1 = () => {
    window.location.href = "/studio-master/pages/marker/index.html";
  };
  useEffect(() => {
    const userInfo = localStorage.getItem("user");
    if (!userInfo) {
      // User is not authenticated, redirect to login
      navigate("/login");
    }
  }, []);
  return (
    <>
      <Navbar />
      <div className="flex mt-20">
        <SidebarDash />
        <div className="h-screen flex-1 p-7 flex justify-end">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-normal py-2 px-4 rounded h-16 sm:h-11"
            onClick={() => nextPage1()}>
            {" "}
            Create New Experience
          </button>
        </div>
      </div>
    </>
  );
};

export default Editor;
