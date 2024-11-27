import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function DesktopMenu({ menu }) {
  const [activeSubMenu, setActiveSubMenu] = useState(null); // First level
  const [activeNestedSubMenu, setActiveNestedSubMenu] = useState(null); // Second level
  const [activeThirdLevelSubMenu, setActiveThirdLevelSubMenu] = useState(null); // Third level
  const [activeFourthLevelSubMenu, setActiveFourthLevelSubMenu] = useState(null); // Fourth level

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

  const handleMenuClick = (name) => {
    // Toggles the active submenu for the first level
    setActiveSubMenu((prev) => (prev === name ? null : name));
  };

  const handleNestedMenuClick = (name) => {
    // Toggles the active submenu for the second level
    setActiveNestedSubMenu((prev) => (prev === name ? null : name));
  };

  const handleThirdLevelMenuClick = (name) => {
    // Toggles the active submenu for the third level
    setActiveThirdLevelSubMenu((prev) => (prev === name ? null : name));
  };

  const handleFourthLevelMenuClick = (name) => {
    // Toggles the active submenu for the fourth level
    setActiveFourthLevelSubMenu((prev) => (prev === name ? null : name));
  };

  return (
    <motion.li className="relative group/link" key={menu.name}>
      {/* Main Menu Item */}
      <Link
        to={menu.link}
        className="flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-200"
        onClick={() => handleMenuClick(menu.name)} // Toggle first-level submenu on click
      >
        {menu.name}
        {menu.subMenu?.length > 0 && <ChevronDown />}
      </Link>

      {/* First-Level Dropdown */}
      {activeSubMenu === menu.name && menu.subMenu?.length > 0 && (
        <motion.div
          className="absolute left-0 z-10 p-4 mt-2 bg-white rounded-lg shadow-lg w-max"
          initial="exit"
          animate="enter"
          variants={subMenuAnimate}
        >
          <div className="grid gap-4">
            {menu.subMenu.map((submenu, i) => (
              <div key={i} className="relative group/menubox">
                <div
                  className="flex items-center justify-between gap-4 px-2 py-1 rounded-md cursor-pointer hover:bg-gray-100"
                  onClick={() => handleNestedMenuClick(submenu.name)} // Toggle second-level submenu on click
                >
                  <Link to={submenu.link || "#"}>
                    <h6 className="font-semibold">{submenu.name}</h6>
                  </Link>
                  {submenu.subMenu?.length > 0 && <ChevronRight />}
                </div>

                {/* Second-Level Dropdown */}
                {activeNestedSubMenu === submenu.name && submenu.subMenu?.length > 0 && (
                  <motion.div
                    className="absolute top-0 z-20 p-4 mt-0 ml-2 bg-white rounded-lg shadow-lg left-full w-max"
                    initial="exit"
                    animate="enter"
                    variants={subMenuAnimate}
                  >
                    <div className="grid gap-4">
                      {submenu.subMenu.map((nestedItem, j) => (
                        <div key={j} className="relative">
                          <div
                            className="flex items-center justify-between gap-4 px-2 py-1 rounded-md cursor-pointer hover:bg-gray-100"
                            onClick={() => handleThirdLevelMenuClick(nestedItem.name)} // Toggle third-level submenu on click
                          >
                            <Link to={nestedItem.link || "#"}>
                              <h6 className="font-medium">{nestedItem.name}</h6>
                            </Link>
                            {nestedItem.subMenu?.length > 0 && <ChevronRight />}
                          </div>

                          {/* Third-Level Dropdown */}
                          {activeThirdLevelSubMenu === nestedItem.name && nestedItem.subMenu?.length > 0 && (
                            <motion.div
                              className="absolute top-0 z-30 p-4 mt-0 ml-2 bg-white rounded-lg shadow-lg left-full w-max text-[13px]"
                              initial="exit"
                              animate="enter"
                              variants={subMenuAnimate}
                            >
                              <div className="grid gap-4">
                                {nestedItem.subMenu.map((thirdLevelItem, k) => (
                                  <div key={k} className="relative">
                                     <a href={thirdLevelItem.subMenu?.length > 0 ? '':`/liste2/${thirdLevelItem.id}` }>
                                    <div
                                      className="flex items-center justify-between gap-4 px-2 py-1 rounded-md cursor-pointer hover:bg-gray-100"
                                      onClick={() => handleFourthLevelMenuClick(thirdLevelItem.name)} // Toggle fourth-level submenu on click
                                    >
                                     
                                        <h6 className="font-medium">{thirdLevelItem.name}</h6>
                                     
                                      {thirdLevelItem.subMenu?.length > 0 && <ChevronRight />}
                                    </div>
 </a>
                                    {/* Fourth-Level Dropdown */}
                                    {activeFourthLevelSubMenu === thirdLevelItem.name && thirdLevelItem.subMenu?.length > 0 && (
                                      <motion.div
                                        className="absolute left-0 z-40 p-4 mt-2 bg-white rounded-lg shadow-lg top-full w-max"
                                        initial="exit"
                                        animate="enter"
                                        variants={subMenuAnimate}
                                      >
                                        <div className="grid gap-4">
                                          {thirdLevelItem.subMenu.map((fourthLevelItem, l) => (
                                            <Link
                                              to={fourthLevelItem.link || "#"}
                                              key={l}
                                              className="block px-2 py-1 rounded-md hover:bg-gray-100"
                                            >
                                              <h6 className="font-medium">{fourthLevelItem.name}</h6>
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
