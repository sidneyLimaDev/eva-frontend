import { useState } from "react";
import { NavLink } from "react-router-dom"; // Importando o NavLink
import { Home, User, Settings, Menu, LogOut } from "lucide-react";
import logoCompacta from "../assets/logo.png";
import logo from "../assets/logo2.png";

// Definindo os itens do menu
const menuItems = [
  { name: "Início", icon: <Home className="text-xl" />, path: "/" },
  {
    name: "Colaboradores",
    icon: <User className="text-xl" />,
    path: "/colaboradores",
  },
  {
    name: "Jornadas",
    icon: <Settings className="text-xl" />,
    path: "/jornadas",
  },
  { name: "Sair", icon: <LogOut className="text-xl" />, path: "/logout" },
];

const SideMenu = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleMenu = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <div className="flex h-screen">
      <div
        className={`${
          isOpen ? "w-64" : "w-16"
        } bg-[#e8f0fb] text-black transition-all duration-300 ease-in-out p-4`}
      >
        <div className="flex items-center justify-center mb-6">
          <img
            src={isOpen ? `${logo}` : `${logoCompacta}`}
            alt="Logo"
            className="w-full"
          />
        </div>

        <div className="cursor-pointer text-2xl mb-6" onClick={toggleMenu}>
          <Menu />
        </div>

        <ul>
          {menuItems.map((item) => (
            <li key={item.name} className="mb-6">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center text-xl p-2 rounded-lg ${
                    isActive ? "bg-blue-500 text-white" : "text-black"
                  }`
                }
              >
                {item.icon}
                {isOpen && <span className="ml-4">{item.name}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SideMenu;
