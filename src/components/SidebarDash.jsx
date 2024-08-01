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
    {
      title: "Tap to Place on Ground",
      src: Folder,
      route: "editorTap",
    },
    {
      title: "Video Based AR",
      src: Folder,
      route: "editorVideo",
    },
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
            <div
              className={`${
                !open && "hidden"
              } origin-left duration-200 text-xs`}>
              {Menu.title}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SidebarDash;
