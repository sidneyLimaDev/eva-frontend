import SideMenu from "../components/SideMenu";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <div className="flex h-screen">
      <SideMenu />
      <div className="flex-1">
        <Outlet />{" "}
      </div>
    </div>
  );
};

export default MainLayout;
