import { useEffect, useState } from "react";
import axios from "axios";
import DesktopMenu from "../DesktopMenu";
import MobMenu from "../MobMenu";
import Logo from "../../assets/Transparent.png";
import { ShoppingBag, MapPin, BellDot, Play, BookOpenText, Figma, BriefcaseBusiness, Images, CircleHelp, MessageCircle, TriangleAlert, ShieldPlus, Users, Dessert, Lock, PanelsTopLeft } from "lucide-react";

function Nav() {
  const [categories, setCategories] = useState([]);
  const [scategories, setSCategories] = useState([]);
  const [sscategories, setSSCategories] = useState([]);
  const [Menus, setMenus] = useState([]); // Initial empty state for Menus

  // Fetch categories on component mount

  const getCategory = async () => {
  try {
    const res = await axios.get("http://localhost:8000/api/cat");
    setCategories(res.data); // Store categories in state
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};


  const getSCategory = async () => {
  try {
    const res = await axios.get("http://localhost:8000/api/scat");
    setSCategories(res.data); // Store categories in state
  } catch (error) {
    console.error("Error fetching scategories:", error);
  }
};

  const getSSCategory = async () => {
  try {
    const res = await axios.get("http://localhost:8000/api/sscat");
    console.log(res.data);
    
    setSSCategories(res.data); // Store categories in state
  } catch (error) {
    console.error("Error fetching sscategories:", error);
  }
};
  useEffect(() => {
    getCategory()
    getSCategory()
    getSSCategory()
  }, []);

  // Update Menus after categories are fetched
useEffect(() => {
  if (categories.length > 0) {
    setMenus([
        {
          name: "Les categories",
          subMenu: categories.map((e) => {
            return {
              name: e.nom_cat,
              desc: "Responsive design",
              icon: PanelsTopLeft,
              subMenu: scategories
                .map((el) => {
                  // Check if the subcategory belongs to the current category
                  if (el.categorie_id === e.id) {
                    return {
                      name: el.nom_scat,
                      link: "/electronics/laptops",
                       subMenu: sscategories
                    .map((ele) => {
                      // Check if the subcategory belongs to the current category
                      if (ele.sscat_id === el.id) {
                        return {
                          name: ele.nom_scat,
                          link: "/electronics/laptops",
                          
                        };
                      }
                    }).filter(Boolean), // Remove undefined entries from the map
                    };
                  }
                })
                .filter(Boolean), // Remove undefined entries from the map
            };
          }),
          gridCols: 1,
        },

      //fin de category
       {
        name: "À propos de nous",
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
  }
}, [categories]); 

  return (
    <>
      <div>
        <header className="h-16 text-[15px] fixed inset-0 flex-center bg-[#ffff]">
          <nav className="px-3.5 flex-center-between w-full max-w-7xl mx-auto">
            <div className="flex-center gap-x-3 z-[999] relative">
              <img src={Logo} alt="Logo" className="size-10 w-[90px]" />
            </div>

            <ul className="hidden gap-x-1 lg:flex-center">
              {Menus.map((menu) => (
                <DesktopMenu menu={menu} key={menu.name} />
              ))}
            </ul>

            <div className="flex-center gap-x-5">
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
