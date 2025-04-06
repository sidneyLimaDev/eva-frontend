import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Home,
  User,
  Menu,
  LogOut,
  PanelLeftIcon,
  PanelLeftCloseIcon,
  BriefcaseBusiness,
} from "lucide-react";
import logoCompacta from "../assets/logo.png";
import logo from "../assets/logo2.png";

const menuItems = [
  { name: "Início", icon: Home, path: "/" },
  { name: "Colaboradores", icon: User, path: "/colaboradores" },
  { name: "Jornadas", icon: BriefcaseBusiness, path: "/jornadas" },
];

const SideMenu = () => {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isOpenMobile, setIsOpenMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const isOpen = isMobile ? isOpenMobile : isPinned || isHovered;
  const toggleMobileMenu = () => setIsOpenMobile((prev) => !prev);
  const togglePin = () => setIsPinned((prev) => !prev);

  return (
    <div className="flex h-screen">
      <div
        className={`
          ${isOpen ? "w-64" : "w-16"}
          bg-[#e8f0fb] text-black transition-all duration-300 ease-in-out p-4 flex flex-col
        `}
        onMouseEnter={() => !isMobile && setIsHovered(true)}
        onMouseLeave={() => !isMobile && setIsHovered(false)}
      >
        {/* TOPO: botão de fixar menu (desktop) e menu (mobile) */}
        <div className="flex items-center justify-between mb-6">
          {!isMobile && (
            <button
              onClick={togglePin}
              className="p-2 rounded-lg hover:bg-blue-100 transition-colors"
            >
              {isPinned ? (
                <PanelLeftCloseIcon className="text-xl" />
              ) : (
                <PanelLeftIcon className="text-xl" />
              )}
            </button>
          )}

          {isMobile && (
            <button onClick={toggleMobileMenu}>
              <Menu className="text-xl" />
            </button>
          )}
        </div>

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src={isOpen ? logo : logoCompacta}
            alt="Logo"
            className="max-h-12 object-contain"
          />
        </div>

        {/* Itens do menu */}
        <ul className="flex flex-col justify-between flex-1">
          <div>
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <li key={item.name} className="mb-6">
                  <NavLink
                    to={item.path}
                    className={`
                      flex items-center text-xl p-2 rounded-lg transition-colors
                      ${isOpen && isActive ? "bg-blue-500 text-white" : ""}
                    `}
                  >
                    <Icon
                      className={`text-xl ${
                        !isOpen && isActive ? "text-blue-500" : ""
                      }`}
                    />
                    {isOpen && <span className="ml-4">{item.name}</span>}
                  </NavLink>
                </li>
              );
            })}
          </div>
        </ul>
      </div>
    </div>
  );
};

export default SideMenu;
