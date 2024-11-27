import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function DesktopMenu({ menu }) {
  const [isHover, setIsHover] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [activeNestedSubMenu, setActiveNestedSubMenu] = useState(null);
  const [activeFourthLevelSubMenu, setActiveFourthLevelSubMenu] = useState(null); // Fourth-level state

  const subMenuAnimate = {
    enter: {
      opacity: 1,
      translateY: 0,
      display: "block",
      transition: { duration: 0.6 },
    },
    exit: {
      opacity: 0,
      translateY: -10,
      transition: { duration: 0.5 },
      transitionEnd: { display: "none" },
    },
  };

  return (
    <motion.li
      className="relative group/link"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => {
        setIsHover(false);
        setActiveSubMenu(null);
        setActiveNestedSubMenu(null);
        setActiveFourthLevelSubMenu(null);
      }}
      key={menu.name}
    >
      {/* Main Menu Item */}
      <Link
        to={menu.link}
        className="flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-200"
      >
        {menu.name}
        {menu.subMenu?.length > 0 && <ChevronDown />}
      </Link>

      {/* First-Level Dropdown */}
      {menu.subMenu?.length > 0 && (
        <motion.div
          className="absolute left-0 z-10 p-4 mt-2 bg-white rounded-lg shadow-lg w-max"
          initial="exit"
          animate={isHover ? "enter" : "exit"}
          variants={subMenuAnimate}
        >
          <div className="grid gap-4">
            {menu.subMenu.map((submenu, i) => {
              return (
                <div
                  key={i}
                  className="relative group/menubox"
                  onMouseEnter={() => setActiveSubMenu(submenu.name)}
                  onMouseLeave={() => setActiveSubMenu(null)}
                >
                  <div className="flex items-center justify-between gap-4 px-2 py-1 rounded-md cursor-pointer hover:bg-gray-100">
                    <Link to={submenu.link || "#"}>
                      <h6 className="font-semibold">{submenu.name}</h6>
                    </Link>
                    {submenu.subMenu?.length > 0 && <ChevronRight />}
                  </div>

                  {/* Second-Level Dropdown */}
                  {submenu.subMenu?.length > 0 && (
                    <motion.div
                      className="absolute top-0 z-20 p-4 mt-0 ml-2 bg-white rounded-lg shadow-lg left-full w-max"
                      initial="exit"
                      animate={activeSubMenu === submenu.name ? "enter" : "exit"}
                      variants={subMenuAnimate}
                    >
                      <div className="grid gap-4">
                        {submenu.subMenu.map((nestedItem, j) => {
                          return (
                            <div
                              key={j}
                              className="relative"
                              onMouseEnter={() =>
                                setActiveNestedSubMenu(nestedItem.name)
                              }
                              onMouseLeave={() =>
                                setActiveNestedSubMenu(null)
                              }
                            >
                              <div className="flex items-center justify-between gap-4 px-2 py-1 rounded-md cursor-pointer hover:bg-gray-100">
                                <Link to={nestedItem.link || "#"}>
                                  <h6 className="font-medium">
                                    {nestedItem.name}
                                  </h6>
                                </Link>
                                {nestedItem.subMenu?.length > 0 && (
                                  <ChevronRight />
                                )}
                              </div>

                              {/* Third-Level Dropdown */}
                              {nestedItem.subMenu?.length > 0 && (
                                <motion.div
                                  className="absolute top-0 z-30 p-4 mt-0 ml-2 bg-white rounded-lg shadow-lg left-full w-max text-[13px]"
                                  initial="exit"
                                  animate={
                                    activeNestedSubMenu === nestedItem.name
                                      ? "enter"
                                      : "exit"
                                  }
                                  variants={subMenuAnimate}
                                >
                                  <div className="grid gap-4">
                                    {nestedItem.subMenu.map(
                                      (thirdLevelItem, k) => {
                                        return (
                                          <div
                                            key={k}
                                            className="relative"
                                            onMouseEnter={() =>
                                              setActiveFourthLevelSubMenu(
                                                thirdLevelItem.name
                                              )
                                            }
                                            onMouseLeave={() =>
                                              setActiveFourthLevelSubMenu(null)
                                            }
                                          >
                                            <div className="flex items-center justify-between gap-4 px-2 py-1 rounded-md cursor-pointer hover:bg-gray-100">
                                              <Link
                                                to={thirdLevelItem.link || "#"}
                                              >
                                                <h6 className="font-medium">
                                                  {thirdLevelItem.name}
                                                </h6>
                                              </Link>
                                              {thirdLevelItem.subMenu
                                                ?.length > 0 && (
                                                <ChevronRight />
                                              )}
                                            </div>

                                            {/* Fourth-Level Dropdown */}
                                            {thirdLevelItem.subMenu?.length >
                                              0 && (
                                              <motion.div
                                                className="absolute left-0 z-40 p-4 mt-2 bg-white rounded-lg shadow-lg top-full w-max"
                                                initial="exit"
                                                animate={
                                                  activeFourthLevelSubMenu ===
                                                  thirdLevelItem.name
                                                    ? "enter"
                                                    : "exit"
                                                }
                                                variants={subMenuAnimate}
                                              >
                                                <div className="grid gap-4">
                                                  {thirdLevelItem.subMenu.map(
                                                    (fourthLevelItem, l) => (
                                                      <Link
                                                        to={fourthLevelItem.link || "#"}
                                                        key={l}
                                                        className="block px-2 py-1 rounded-md hover:bg-gray-100"
                                                      >
                                                        <h6 className="font-medium">
                                                          {fourthLevelItem.name}
                                                        </h6>
                                                      </Link>
                                                    )
                                                  )}
                                                </div>
                                              </motion.div>
                                            )}
                                          </div>
                                        );
                                      }
                                    )}
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
