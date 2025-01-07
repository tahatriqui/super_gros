import { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import "./Navbar/Nav.css";

export default function DesktopMenu({ menu }) {
  const [activeMenuState, setActiveMenuState] = useState({
    activeSubMenu: null, // First level
    activeNestedSubMenu: null, // Second level
  });

  const menuRef = useRef(null); // Reference for the entire menu
  const location = useLocation(); // Detect route changes

  const subMenuAnimate = {
    enter: {
      opacity: 1,
      translateY: 0,
      display: "block",
      transition: { duration: 0.4, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      translateY: -10,
      transition: { duration: 0.5, ease: "easeIn" },
      transitionEnd: { display: "none" },
    },
  };

  const handleMenuClick = (name) => {
    setActiveMenuState((prevState) => {
      // Toggle the menu only if it's not already active
      if (prevState.activeSubMenu === name) {
        return {
          activeSubMenu: null,
          activeNestedSubMenu: null,
        };
      }
      return {
        activeSubMenu: name,
        activeNestedSubMenu: null,
      };
    });
  };

  const handleNestedMenuClick = (name) => {
    setActiveMenuState((prevState) => ({
      ...prevState,
      activeNestedSubMenu: prevState.activeNestedSubMenu === name ? null : name,
    }));
  };

  const handleMenuItemClick = () => {
    // Close both menus on click
    setActiveMenuState({
      activeSubMenu: null,
      activeNestedSubMenu: null,
    });
  };

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setTimeout(() => {
          setActiveMenuState({
            activeSubMenu: null,
            activeNestedSubMenu: null,
          });
        }, 300); // Delay to let the animation finish
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close menus when route changes
  useEffect(() => {
    setActiveMenuState({
      activeSubMenu: null,
      activeNestedSubMenu: null,
    });
  }, [location]);

  return (
    <>
      <motion.li className="relative group" key={menu.name} ref={menuRef}>
        {/* Main Menu Item */}
        {menu.link ? (
          <Link
            to={menu.link}
            className="flex text-[18px]  items-center gap-2 px-5 py-2 transition-all duration-300 ease-in-out transform rounded-lg cursor-pointer hover:bg-gray-200 hover:scale-105"
          >
            {menu.name}
            {menu.subMenu?.length > 0 && <ChevronDown />}
          </Link>
        ) : (
          <div
            className="flex items-center text-[19px]  gap-2  px-5 py-2 transition-all duration-300 ease-in-out transform rounded-lg cursor-pointer hover:bg-gray-200 hover:scale-105 "
            onClick={() => handleMenuClick(menu.name)}
          >
            {menu.name}
            {menu.subMenu?.length > 0 && <ChevronDown />}
          </div>
        )}

        {/* First-Level Submenu */}
        {activeMenuState.activeSubMenu === menu.name &&
          menu.subMenu?.length > 0 && (
            <motion.div
              className="z-10 mt-2 bg-white rounded-lg shadow-xl submenu-container"
              initial="exit"
              animate="enter"
              variants={subMenuAnimate}
              style={{ width: menu.width }}
            >
              <div className="p-4 space-y-2">
                {menu.subMenu.map((submenu, i) => (
                  <div key={i} className="relative">
                    <div
                      className="flex items-center justify-between px-2 py-1 transition-all duration-300 ease-in-out transform rounded-md cursor-pointer hover:bg-gray-100 hover:scale-105"
                      onClick={() => handleNestedMenuClick(submenu.name)}
                    >
                      {submenu.link ? (
                        <Link
                          to={submenu.link || "#"}
                          className="text-sm font-semibold"
                          onClick={handleMenuItemClick}
                        >
                          {submenu.name}
                        </Link>
                      ) : (
                        <div className="text-sm font-semibold">
                          {submenu.name}
                        </div>
                      )}
                      {submenu.subMenu?.length > 0 && <ChevronRight />}
                    </div>

                    {/* Second-Level Submenu */}
                    {activeMenuState.activeNestedSubMenu === submenu.name &&
                      submenu.subMenu?.length > 0 && (
                        <motion.div
                          className="z-20 mt-0 ml-2 bg-white rounded-lg shadow-xl submenu-nested"
                          initial="exit"
                          animate="enter"
                          variants={subMenuAnimate}
                        >
                          <div className="p-4 space-y-2">
                            {submenu.subMenu.map((nestedItem, j) => (
                              <Link
                                key={j}
                                to={nestedItem.link || "#"}
                                className="block px-2 py-1 text-sm font-semibold transition-all duration-300 ease-in-out transform rounded-md cursor-pointer hover:bg-gray-100 hover:scale-105"
                                onClick={handleMenuItemClick}
                              >
                                {nestedItem.name}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
      </motion.li>

      
    </>
  );
}