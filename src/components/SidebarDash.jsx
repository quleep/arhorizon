import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { Control, Logo, Chart, Folder } from "../assets";

function SidebarDash() {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const { selectedItem, setSelectedItem } = useStateContext();

  const Menus = [
    { title: "Image Based AR", src: Folder, route: "editor", gap: true },

    { title: "Analytics", src: Chart, route: "analytics" },
    // { title: "Products", src: "Folder", gap: true },
  ];
  const nextPage = (route) => {
    navigate(`/${route}`);
  };
  return (
    <div
      className={` ${
        open ? "w-72" : "w-20 "
      } bg-dark-purple h-screen p-5 pt-8 relative duration-300 bg-gray-600 rounded-md`}>
      <img
        src={Control}
        className={`absolute cursor-pointer -right-3 top-16 w-7 border-dark-purple
           border-2 rounded-full  ${
             !open && "rotate-180"
           } transition hover:scale-105 ease-in-out duration-300`}
        onClick={() => setOpen(!open)}
      />
      <div className="flex gap-x-4 items-center">
        <h1
          className={`text-white origin-left font-medium text-xl duration-200 ${
            !open && "scale-0"
          }`}>
          AR Horizon
        </h1>
      </div>
      <ul className="pt-6">
        {Menus.map((Menu, index) => (
          <li
            key={index}
            className={`flex rounded-md p-2 py-3 cursor-pointer text-white text-sm items-center gap-x-4
            ${Menu.gap ? "mt-9" : "mt-2"} ${index === 0 && "bg-light-white"} 
            hover:bg-blue-gray-400 hover:text-white ${
              selectedItem === Menu.route
                ? "bg-blue-gray-300 transition hover:scale-105 ease-in-out duration-300"
                : ""
            }`}
            onClick={() => {
              nextPage(Menu.route);
              setSelectedItem(Menu.route);
            }}>
            <img src={Menu.src} />
            <span className={`${!open && "hidden"} origin-left duration-200`}>
              {Menu.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SidebarDash;
