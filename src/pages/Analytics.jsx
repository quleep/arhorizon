import React, { useState } from "react";
import { About, Navbar, Works } from "../components";
import { useNavigate } from "react-router-dom";
import SidebarDash from "../components/SidebarDash";

const Analytics = () => {
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
  return (
    <>
      <Navbar />
      <div className="flex mt-20 ">
        <SidebarDash />
        <div className="h-screen flex-1 p-7 flex justify-end">
          <About />
        </div>
      </div>
    </>
  );
};

export default Analytics;
