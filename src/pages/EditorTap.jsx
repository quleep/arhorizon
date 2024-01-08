import React, { useEffect, useState } from "react";
import { Navbar } from "../components";
import { useStateContext } from "../contexts/ContextProvider";
import { useNavigate } from "react-router-dom";
import SidebarDash from "../components/SidebarDash";
import Tilt from "react-tilt";

const EditorTap = () => {
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
    navigate("/upload_tap_to_place");
  };
  useEffect(() => {
    const userInfo = localStorage.getItem("user");
    if (!userInfo) {
      // User is not authenticated, redirect to login
      navigate("/login");
    }
  }, []);
  return (
    <div className="bg-lightdark">
      <Navbar />
      <div className="flex mt-20">
        <SidebarDash />
        <div className="flex justify-center items-center w-full flex-1">
          <div className="md:w-[600px] w-full" onClick={nextPage1}>
            <div className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card cursor-pointer transition hover:scale-105 ease-in-out duration-300">
              <div
                options={{
                  max: 45,
                  scale: 0.1,
                  speed: 850,
                }}
                className="bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col">
                <h3 className="text-white text-[20px] font-bold text-center">
                  Create a new Expereince (Tap to Place)
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorTap;
