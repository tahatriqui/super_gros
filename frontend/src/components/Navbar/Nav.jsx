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
  const [Menus, setMenus] = useState([]); // Initial empty state for Men
  const {ssid,istrue} =useAppContext()
  useEffect(()=>{console.log(ssid)},[ssid])
  
  
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
  }, []);

  // Update Menus after categories are fetched
 useEffect(() => {
  setMenus([
    // Only include "Les categories" if categories.length > 0
    ...(categories.length > 0
      ? [
          {
            name: "Les categories",
            subMenu: categories.map((e) => {
              return {
                name: e.nom_cat,
                desc: "Responsive design",
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
                                link:istrue?"/produit":"/" ,
                                id:ele.id,
                              };
                            }
                          })
                          .filter(Boolean), // Remove undefined entries
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
      link:"/about"
    },
    {
      name: "Support",
      subMenu: [
        {
          name: "Help",
          desc: "Center",
          icon: CircleHelp,
        },
        {
          name: "Community",
          desc: "Project help",
          icon: MessageCircle,
        },
        {
          name: "Emergency",
          desc: "Urgent issues",
          icon: TriangleAlert,
        },
      ],
      gridCols: 1,
    },
    {
      name: "Pricing",
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
