import { useEffect, useState } from "react";
import axios from "axios";
import DesktopMenu from "../DesktopMenu";
import MobMenu from "../MobMenu";
import Logo from "../../assets/Transparent.png";
import { PanelsTopLeft } from "lucide-react";
import { api } from "../../assets/domain";
import { Link } from "react-router-dom";
import { useAppContext } from "../../AppContext";


function Nav() {
  const {
    sscategories,
    setSSCategories,
    categories,
    setCategories,
    ssscategories,
    setSSsCategories,
  } = useAppContext();

  const [scategories, setSCategories] = useState([]);

  const [Menus, setMenus] = useState([]);

  const getCategory = async () => {
    try {
      const res = await axios.get(`${api}/cat`);
      setCategories(res.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const getSCategory = async () => {
    try {
      const res = await axios.get(`${api}/scat`);
      setSCategories(res.data);
    } catch (error) {
      console.error("Error fetching scategories:", error);
    }
  };

  const getSSSCategory = async () => {
    try {
      const res = await axios.get(`${api}/ssscat`);
      setSSsCategories(res.data);
    } catch (error) {
      console.error("Error fetching ssscategories:", error);
    }
  };

  const getSSCategory = async () => {
    try {
      const res = await axios.get(`${api}/sscat`);
      setSSCategories(res.data);
    } catch (error) {
      console.error("Error fetching sscategories:", error);
    }
  };

  useEffect(() => {
    getCategory();
    getSCategory();
    getSSCategory();
    getSSSCategory();
  }, []);

  useEffect(() => {
    setMenus([
      {
        name: "Accueil",
        link: "/",
      },
      ...(categories.length > 0
        ? [
            {
              name: "Nos Produits",
              width: "350px",
              subMenu: categories.map((e) => {
                return {
                  name: e.nom_cat,
                  icon: PanelsTopLeft,
                  subMenu: scategories
                    .map((el) => {
                      if (el.categorie_id === e.id) {
                        return {
                          name: el.nom_scat,
                          link: `liste_pro/${el.id}`,
                          subMenu: sscategories
                            .map((ele) => {
                              if (ele.scat_id === el.id) {
                                return {
                                  name: ele.nom_scat,
                                  id: ele.id,
                                  subMenu: ssscategories
                                    .map((elem) => {
                                      if (elem.sscat_id === ele.id) {
                                        return {
                                          name: elem.nom_ssscat,
                                          id: elem.id,
                                          link: `/liste_pro/${elem.id}`,
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
                    .filter(Boolean),
                };
              }),
              gridCols: 1,
            },
          ]
        : []),
      {
        name: "Nos services",
        width: "150px",
        subMenu: [
          { name: "Logistique", link: "/Services/0" },
          { name: "Achat", link: "/Services/1" },
          { name: "Transport", link: "/Services/2" },
          { name: "Stockage", link: "/Services/3" },
        ],
      },
      {
        name: "À propos",
        link: "/about",
      },
      {
        name: "Contact",
        link: "/contact",
      },
    ]);
  }, [categories, scategories, sscategories]);

   const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <header className={`text-[25px] font-[600] fixed inset-0 flex-center ${isScrolled? 'bg-[#fcfcfc87]':"bg-[#ffff]"}  z-[9999]`} style={{height: "6rem"}}>
        <nav className="px-3.5 flex-center-between w-full max-w-7xl mx-auto relative z-[10000]" >
          <Link to={"/"} className="flex-center gap-x-3 z-[10020] relative ">
            <img src={Logo}  alt="Logo" className="w-[auto] h-[190px]  logo" />
          </Link>
        
          <ul className="hidden gap-x-1 lg:flex-center">
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
  );
}

export default Nav;
