import { useEffect, useState } from "react";
import axios from "axios";
import DesktopMenu from "../DesktopMenu";
import MobMenu from "../MobMenu";
import Logo from "../../assets/Transparent.png";
import { CircleHelp, MessageCircle, TriangleAlert, PanelsTopLeft } from "lucide-react";
import { api } from "../../assets/domain"; 
import { useAppContext } from "../../AppContext";

function Nav() {
  const [categories, setCategories] = useState([]);
  const [scategories, setSCategories] = useState([]);
  const [sscategories, setSSCategories] = useState([]);
  const [ssscategories, setSSsCategories] = useState([]);
  const [Menus, setMenus] = useState([]); // Initial empty state for Men
 
  
  
  // Fetch categories on component mount

  const getCategory = async () => {
    try {
      const res = await axios.get(`${api}/cat`);
      setCategories(res.data); // Store categories in state
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const getSCategory = async () => {
    try {
      const res = await axios.get(`${api}/scat`);
      setSCategories(res.data); // Store categories in state
    } catch (error) {
      console.error("Error fetching scategories:", error);
    }
  };

  const getSSSCategory = async () => {
    try {
      const res = await axios.get(`${api}/ssscat`);
      setSSsCategories(res.data); // Store categories in state
    } catch (error) {
      console.error("Error fetching ssscategories:", error);
    }
  };
  const getSSCategory = async () => {
    try {
      const res = await axios.get(`${api}/sscat`);
      setSSCategories(res.data); // Store categories in state
    } catch (error) {
      console.error("Error fetching sscategories:", error);
    }
  };

  useEffect(() => {
    getCategory();
    getSCategory();
    getSSCategory();
    getSSSCategory();
  }, [scategories]);

  // Update Menus after categories are fetched
 useEffect(() => {
  setMenus([
    {
      name: "Bienvenue",
      link: "/",
    },
    // Only include "Les categories" if categories.length > 0
    ...(categories.length > 0
      ? [
          {
            name: "Les categories",
            subMenu: categories.map((e) => {
              return {
                name: e.nom_cat,
                icon: PanelsTopLeft,
                subMenu: scategories
                  .map((el) => {
                    if (el.categorie_id === e.id) {
                      return {
                        name: el.nom_scat,
                        subMenu: sscategories
                          .map((ele) => {
                            if (ele.sscat_id === el.id) {
                              return {
                                name: ele.nom_scat,
                                id: ele.id,
                               subMenu: ssscategories
                            .map((elem) => {
                              if (elem.sscat_id === ele.id) {
                                return {
                                  name: elem.nom_ssscat,
                                  id: elem.id,
                                  link:`/liste_pro/${elem.id}`
                                };
                              }
                            })
                            .filter(Boolean),
                                };
                              }
                            })
                          .filter(Boolean),
                      };
                    }
                  })
                  .filter(Boolean), // Remove undefined entries
              };
            }),
            gridCols: 1,
          },
        ]
      : []),

    // Static menu items that don't depend on categories
    {
      name: "À propos de nous",
      link: "/about",
    },
    {
      name: "Contact",
    },
  ]);
}, [categories, scategories, sscategories]);

  return (
    <>
      <div>
        <header className="h-16 text-[15px] fixed inset-0 flex-center bg-[#ffff] z-[9999]">
          <nav className="px-3.5 flex-center-between w-full max-w-7xl mx-auto relative z-[10000]">
            <div className="flex-center gap-x-3 z-[10001] relative">
              <img src={Logo} alt="Logo" className="size-10 w-[90px]" />
            </div>

            <ul className="hidden gap-x-1 lg:flex-center relative z-[10000]">
              {Menus.map((menu) => (
                <DesktopMenu menu={menu} key={menu.name} />
              ))}
            </ul>

            <div className="flex-center gap-x-5 relative z-[10001]">
              <div className="lg:hidden">
                <MobMenu Menus={Menus} />
              </div>
            </div>
          </nav>
        </header>
      </div>
    </>
  );
}

export default Nav;
