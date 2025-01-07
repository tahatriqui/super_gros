import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

export default function MobMenu({ Menus }) {
  const [isOpen, setIsOpen] = useState(false);
  const [clicked, setClicked] = useState({});

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
    setClicked({}); // Reset clicked state when closing the drawer
  };

  const subMenuDrawer = {
    enter: {
      height: "auto",
      overflow: "hidden",
      
    },
    exit: {
      height: 0,
      overflow: "hidden",
       
    },
  };

  const handleSubMenuClick = (level, index) => {
    const key = `${level}-${index}`;
    setClicked((prev) => ({
      ...prev,
      [key]: !prev[key], // Toggle the submenu state
    }));
  };

  const handleLinkClick = () => {
    setIsOpen(false); // Close the menu when a link is clicked
  };

  const renderMenu = (menuItems, level = 0) => {
    return (
      <ul className={`ml-${level * 5}`} >
        {menuItems.map(({ name, subMenu, link }, i) => {
          const key = `${level}-${i}`;
          const isClicked = clicked[key];
          const hasSubMenu = Array.isArray(subMenu) && subMenu.length > 0;

          return (
            <li key={name} className="mt-2">
              <span
                className="relative w-full p-4 rounded-md cursor-pointer flex-center-between hover:bg-white/5"  
                onClick={() => hasSubMenu && handleSubMenuClick(level, i)} // Handle submenu click
              >
                {link ? (
                  <Link
                    to={link}
                    className="block w-full text-sm font-semibold" // Ensure Link takes full width
                    onClick={handleLinkClick}
                  >
                    {name}
                  </Link>
                ) : (
                  <span className="text-sm font-semibold">{name}</span>
                )}
                {hasSubMenu && (
                  <ChevronDown
                    className={`ml-auto transition-transform ${
                      isClicked ? "rotate-180" : ""
                    }`}
                  />
                )}
              </span>
              {hasSubMenu && (
                <motion.ul
                  initial="exit"
                  animate={isClicked ? "enter" : "exit"}
                  variants={subMenuDrawer}
                  className="ml-5"
                >
                  {renderMenu(subMenu, level + 1)}{" "}
                  {/* Recursive rendering of submenus */}
                </motion.ul>
              )}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div>
      <button className="lg:hidden z-[999] relative" onClick={toggleDrawer}>
        {isOpen ? <X /> : <Menu />}
      </button>

      <motion.div
        className="fixed left-0 mt-[2rem] right-0 overflow-y-auto h-full bg-[#bab9b9] backdrop-blur text-white p-6 pb-20"
        style={{ zIndex: "900000" }}
        initial={{ x: "-100%" }}
        animate={{ x: isOpen ? "0%" : "-100%" }}
      >
        {renderMenu(Menus)}
      </motion.div>
    </div>
  );
}
