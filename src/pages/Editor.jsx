import React, { useEffect, useState } from "react";
import { Navbar } from "../components";
import { useNavigate } from "react-router-dom";

const Editor = () => {
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
  return (
    <>
      <Navbar />
      <div className="flex mt-20">
        <div
          className={` ${
            open ? "w-72" : "w-20 "
          } bg-dark-purple h-screen p-5 pt-8 relative duration-300 bg-gray-600`}>
          <img
            src="./src/assets/control.png"
            className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
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
                className={`flex  rounded-md p-2 cursor-pointer hover:bg-slate-800 text-gray-300 text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${
                  index === 0 && "bg-light-white"
                } `}
                onClick={() => nextPage(Menu.route)}>
                <img src={`./src/assets/${Menu.src}.png`} />
                <span
                  className={`${!open && "hidden"} origin-left duration-200`}>
                  {Menu.title}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="h-screen flex-1 p-7 flex justify-end">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded h-16 sm:h-11"
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
