import { Outlet } from "react-router-dom";

const DashBoardLayout = () => {
  return (
    <div>
      {/* Your Sidebar / Header here */}
      <Outlet />
    </div>
  );
};

export default DashBoardLayout;
