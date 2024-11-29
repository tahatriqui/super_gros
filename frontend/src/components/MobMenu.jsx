import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";

export default function MobMenu({ Menus }) {
  const [isOpen, setIsOpen] = useState(false);
  const [clicked, setClicked] = useState({}); // Object to track expanded menus

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
      [key]: !prev[key], // Toggle the current menu's state
    }));
  };

  const renderMenu = (menuItems, level = 0) => {
    return (
      <ul className={`ml-${level * 5}`}>
        {menuItems.map(({ name, subMenu, icon: Icon }, i) => {
          const key = `${level}-${i}`; // Unique key for this level and index
          const isClicked = clicked[key];
          const hasSubMenu = Array.isArray(subMenu) && subMenu.length > 0; // Ensure valid submenu

          return (
            <li key={name} className="mt-2">
              <span
                className="relative p-4 rounded-md cursor-pointer flex-center-between hover:bg-white/5"
                onClick={() => {
                  if (hasSubMenu) {
                    handleSubMenuClick(level, i);
                  }
                }}
              >
                {Icon && <Icon size={17} />}
                <span>{name}</span>
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
                  {renderMenu(subMenu, level + 1)} {/* Recursive rendering */}
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
        className="fixed left-0 right-0 top-16 overflow-y-auto h-full bg-[#bab9b9] backdrop-blur text-white p-6 pb-20"
        style={{ zIndex: "900000" }}
        initial={{ x: "-100%" }}
        animate={{ x: isOpen ? "0%" : "-100%" }}
      >
        {renderMenu(Menus)}
      </motion.div>
    </div>
  );
}
