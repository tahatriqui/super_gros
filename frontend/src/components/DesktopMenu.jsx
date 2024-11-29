import { useState, useRef } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import './Navbar/Nav.css'

export default function DesktopMenu({ menu }) {
  const [activeSubMenu, setActiveSubMenu] = useState(null); // First level
  const [activeNestedSubMenu, setActiveNestedSubMenu] = useState(null); // Second level

  const subMenuRef = useRef(null);
  const nestedSubMenuRef = useRef(null);

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
      transition: { duration: 0.3, ease: "easeIn" },
      transitionEnd: { display: "none" },
    },
  };

  const handleMenuClick = (name, ref) => {
    setActiveSubMenu((prev) => (prev === name ? null : name));

    // Adjust the position of the submenu
    if (ref && ref.current) {
      const menuHeight = ref.current.offsetHeight;
      ref.current.style.top = `-${menuHeight}px`; // Position the menu at the top
    }
  };

  const handleNestedMenuClick = (name, ref) => {
    setActiveNestedSubMenu((prev) => (prev === name ? null : name));

    if (ref && ref.current) {
      const menuHeight = ref.current.offsetHeight;
      ref.current.style.top = `-${menuHeight}px`;
    }
  };

  return (
    <motion.li className="relative group" key={menu.name}>
      {/* Main Menu Item */}
      <a
        href={menu.link || "#"}
        className="flex items-center gap-2 px-4 py-2 transition-all duration-300 ease-in-out transform rounded-lg cursor-pointer hover:bg-gray-200 hover:scale-105"
        onClick={() => handleMenuClick(menu.name, subMenuRef)} // Pass the ref
      >
        {menu.name}
        {menu.subMenu?.length > 0 && <ChevronDown />}
      </a>

      {/* First-Level Submenu */}
      {activeSubMenu === menu.name && menu.subMenu?.length > 0 && (
        <motion.div
          className="z-10 mt-2 bg-white rounded-lg shadow-xl submenu-container"
          initial="exit"
          animate="enter"
          variants={subMenuAnimate}
          ref={subMenuRef} // Add the ref
        >
          <div className="p-4 space-y-2">
            {menu.subMenu.map((submenu, i) => (
              <div key={i} className="relative">
                <div
                  className="flex items-center justify-between px-2 py-1 transition-all duration-300 ease-in-out transform rounded-md cursor-pointer hover:bg-gray-100 hover:scale-105"
                  onClick={() => handleNestedMenuClick(submenu.name, nestedSubMenuRef)} // Pass the ref
                >
                  <Link
                    to={submenu.link || "#"}
                    className="text-sm font-semibold"
                  >
                    {submenu.name}
                  </Link>
                  {submenu.subMenu?.length > 0 && <ChevronRight />}
                </div>

                {/* Second-Level Submenu */}
                {activeNestedSubMenu === submenu.name && submenu.subMenu?.length > 0 && (
                  <motion.div
                    className="z-20 mt-0 ml-2 bg-white rounded-lg shadow-xl submenu-nested"
                    initial="exit"
                    animate="enter"
                    variants={subMenuAnimate}
                    ref={nestedSubMenuRef} // Add the ref
                  >
                    <div className="p-4 space-y-2">
                      {submenu.subMenu.map((nestedItem, j) => (
                        <div key={j} className="relative">
                          <div className="flex items-center justify-between px-2 py-1 transition-all duration-300 ease-in-out transform rounded-md cursor-pointer hover:bg-gray-100 hover:scale-105">
                            <Link
                              to={nestedItem.link || "#"}
                              className="text-sm font-semibold"
                            >
                              {nestedItem.name}
                            </Link>
                          </div>
                        </div>
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
  );
}
