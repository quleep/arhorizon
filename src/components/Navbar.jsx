import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { styles } from "../styles";
import { navLinks } from "../constants";
import { useStateContext } from "../contexts/ContextProvider";
import { Menu } from "../assets/Menu";
import { Close } from "../assets/Close";
import { Logo } from "../assets/index";

const Navbar = () => {
  const { user, setUser } = useStateContext();
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const logout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };
  const editorPage = () => {
    navigate(`/editor`);
  };
  const handleNavLinkClick = (id, title) => {
    setActive(title);
    navigate(`/${id}`);
  };

  return (
    <nav
      className={`${
        styles.paddingX
      } w-full flex items-center py-7 fixed top-0 z-20 ${
        scrolled ? "bg-primary" : "bg-primary shadow-2xl shadow-cyan-700"
      }`}>
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto mb-1">
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}>
          <img src={Logo} alt="logo" className="w-8 h-8 object-contain" />
          <p className="text-white text-[18px] font-bold cursor-pointer flex ">
            &nbsp;
            <span className="sm:block hidden"> AR Horizon</span>
          </p>
        </Link>

        <ul className="list-none hidden sm:flex flex-row gap-10">
          {user ? (
            <>
              <li
                className={`${
                  active === "Logout" ? "text-white" : "text-secondary"
                } hover:text-white text-[18px] font-medium cursor-pointer`}
                onClick={() => editorPage()}>
                <a>Editor</a>
              </li>
              <li
                className={`${
                  active === "Logout" ? "text-white" : "text-secondary"
                } hover:text-white text-[18px] font-medium cursor-pointer`}
                onClick={() => logout()}>
                <a>Logout</a>
              </li>
            </>
          ) : (
            <ul>
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`${
                    active === nav.title ? "text-white" : "text-secondary"
                  } hover:text-white text-[18px] font-medium cursor-pointer`}
                  onClick={() => handleNavLinkClick(nav.id, nav.title)}>
                  <a>{nav.title}</a>
                </li>
              ))}
            </ul>
          )}
        </ul>

        <div className="sm:hidden flex flex-1 justify-end items-center">
          <div
            alt="menu"
            className="w-[28px] h-[28px] object-contain"
            onClick={() => setToggle(!toggle)}>
            {toggle ? <Close /> : <Menu />}
          </div>
          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}>
            <ul className="list-none flex justify-end items-start flex-1 flex-col gap-4">
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`font-poppins font-medium cursor-pointer text-[16px] ${
                    active === nav.title ? "text-white" : "text-secondary"
                  }`}
                  onClick={() => {
                    setToggle(!toggle);
                    setActive(nav.title);
                  }}>
                  <a href={`#${nav.id}`}>{nav.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
