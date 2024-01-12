import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <div className="md:w-[680px] md:m-auto">
      <div className="h-dvh grid grid-cols-1 py-10 px-6 md:gap-6 relative">
        <Outlet />
      </div>
    </div>
  );
}

export default AppLayout;
