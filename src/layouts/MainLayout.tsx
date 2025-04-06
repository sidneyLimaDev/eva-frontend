import { ReactNode } from "react";
import SideMenu from "../components/SideMenu";
import { Outlet } from "react-router";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = () => {
  return (
    <div className="flex h-screen">
      <SideMenu />
      <div className="flex-1">
        <Outlet />{" "}
        {/* Adicione o Outlet aqui para renderizar as rotas filhas */}
      </div>
    </div>
  );
};

export default MainLayout;
