import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function DesktopMenu({ menu }) {
  const [isHover, setIsHover] = useState(false); // For the main menu hover
  const [activeSubMenu, setActiveSubMenu] = useState(null); // For nested submenus
  const [activeNestedSubMenu, setActiveNestedSubMenu] = useState(null); // For third-level submenus

  const subMenuAnimate = {
    enter: {
      opacity: 1,
      translateY: 0,
      display: "block",
      transition: { duration: 0.3 },
    },
    exit: {
      opacity: 0,
      translateY: -10,
      transition: { duration: 0.3 },
      transitionEnd: { display: "none" },
    },
  };

  const handleSubMenuHover = (submenuName) => {
    setActiveSubMenu(submenuName);
  };

  const handleNestedSubMenuHover = (nestedSubMenuName) => {
    setActiveNestedSubMenu(nestedSubMenuName);
  };

  const hasSubMenu = menu?.subMenu?.length > 0;

  return (
    <motion.li
      className="relative group/link"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => {
        setIsHover(false);
        setActiveSubMenu(null);
        setActiveNestedSubMenu(null);
      }}
      key={menu.name}
    >
      {/* Main Menu Item */}
      <span className="flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-200">
        {menu.name}
        {hasSubMenu && <ChevronDown />}
      </span>

      {/* First-Level Dropdown */}
      {hasSubMenu && (
        <motion.div
          className="absolute left-0 z-10 p-4 mt-2 bg-white rounded-lg shadow-lg w-max"
          initial="exit"
          animate={isHover ? "enter" : "exit"}
          variants={subMenuAnimate}
        >
          <div className="grid gap-4">
            {menu.subMenu.map((submenu, i) => {
              const hasNestedSubMenu = submenu.subMenu?.length > 0;

              return (
                <div
                  key={i}
                  className="relative group/menubox"
                  onMouseEnter={() => handleSubMenuHover(submenu.name)}
                  onMouseLeave={() => setActiveSubMenu(null)}
                >
                  {/* Submenu Item */}
                  <div className="flex items-center justify-between gap-4 px-2 py-1 rounded-md cursor-pointer hover:bg-gray-100">
                    <Link to={submenu.link || "#"}>
                      <h6 className="font-semibold">{submenu.name}</h6>
                    </Link>
                    {hasNestedSubMenu && <ChevronRight />}
                  </div>

                  {/* Nested Dropdown (Second-Level Dropdown) */}
                  {hasNestedSubMenu && (
                    <motion.div
                      className="absolute top-0 z-20 p-4 mt-0 ml-2 bg-white rounded-lg shadow-lg left-full w-max"
                      initial="exit"
                      animate={activeSubMenu === submenu.name ? "enter" : "exit"}
                      variants={subMenuAnimate}
                    >
                      <div className="grid gap-4">
                        {submenu.subMenu.map((nestedItem, j) => {
                          const hasThirdLevelSubMenu = nestedItem.subMenu?.length > 0;

                          return (
                            <div
                              key={j}
                              className="relative"
                              onMouseEnter={() =>
                                handleNestedSubMenuHover(nestedItem.name)
                              }
                              onMouseLeave={() => setActiveNestedSubMenu(null)}
                            >
                              <div className="flex items-center justify-between gap-4 px-2 py-1 rounded-md cursor-pointer hover:bg-gray-100">
                                <Link to={nestedItem.link || "#"}>
                                  <h6 className="font-medium">{nestedItem.name}</h6>
                                  {nestedItem.desc && (
                                    <p className="text-sm text-gray-400">
                                      {nestedItem.desc}
                                    </p>
                                  )}
                                </Link>
                                {hasThirdLevelSubMenu && <ChevronRight />}
                              </div>

                              {/* Third-Level Dropdown */}
                              {hasThirdLevelSubMenu && (
                                <motion.div
                                  className="absolute top-0 z-30 p-4 mt-0 ml-2 bg-white rounded-lg shadow-lg left-full w-max"
                                  initial="exit"
                                  animate={
                                    activeNestedSubMenu === nestedItem.name
                                      ? "enter"
                                      : "exit"
                                  }
                                  variants={subMenuAnimate}
                                >
                                  <div className="grid gap-4">
                                    {nestedItem.subMenu.map((thirdLevelItem, k) => (
                                      <Link
                                        to={thirdLevelItem.link || "#"}
                                        key={k}
                                        className="block px-2 py-1 rounded-md hover:bg-gray-100"
                                      >
                                        <h6 className="font-medium">
                                          {thirdLevelItem.name}
                                        </h6>
                                        {thirdLevelItem.desc && (
                                          <p className="text-sm text-gray-400">
                                            {thirdLevelItem.desc}
                                          </p>
                                        )}
                                      </Link>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>
      )}
    </motion.li>
  );
}
