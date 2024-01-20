import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <div className="md:m-auto md:w-[680px]">
      <div className="relative grid h-dvh grid-cols-1 px-6 py-10 md:gap-6">
        <Outlet />
      </div>
    </div>
  );
}

export default AppLayout;
