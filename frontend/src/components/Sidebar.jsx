import { Link, useLocation } from "react-router"; 
import useAuthUser from "../hooks/useAuthUser";
import { BellIcon, HomeIcon, ShipWheelIcon, UsersIcon } from "lucide-react";

const Sidebar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <aside className="w-64 bg-base-200 border-r border-base-300 flex flex-col h-screen sticky top-0">
      <div className="p-4 sm:p-5 border-b border-base-300">
        <Link to="/" className="flex items-center gap-2.5">
          <ShipWheelIcon className="size-8 sm:size-9 text-primary" />
          <span className="text-2xl sm:text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
            Callix
          </span>
        </Link>
      </div>

      <nav className="flex-1 p-3 sm:p-4 space-y-1">
        <Link
          to="/"
          className={`btn btn-ghost justify-start w-full gap-2 sm:gap-3 px-2 sm:px-3 normal-case text-sm sm:text-base ${
            currentPath === "/" ? "btn-active" : ""
          }`}
        >
          <HomeIcon className="size-4 sm:size-5 text-base-content opacity-70" />
          <span>Home</span>
        </Link>

        <Link
          to="/friends"
          className={`btn btn-ghost justify-start w-full gap-2 sm:gap-3 px-2 sm:px-3 normal-case text-sm sm:text-base ${
            currentPath === "/friends" ? "btn-active" : ""
          }`}
        >
          <UsersIcon className="size-4 sm:size-5 text-base-content opacity-70" />
          <span>Friends</span>
        </Link>

        <Link
          to="/notifications"
          className={`btn btn-ghost justify-start w-full gap-2 sm:gap-3 px-2 sm:px-3 normal-case text-sm sm:text-base ${
            currentPath === "/notifications" ? "btn-active" : ""
          }`}
        >
          <BellIcon className="size-4 sm:size-5 text-base-content opacity-70" />
          <span>Notifications</span>
        </Link>
      </nav>

      <div className="p-3 sm:p-4 border-t border-base-300 mt-auto">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="avatar">
            <div className="w-8 sm:w-10 rounded-full">
              <img src={authUser?.profilePic} alt="User Avatar" />
            </div>
          </div>
          <div className="flex-1">
            <p className="font-semibold text-sm">{authUser?.fullName}</p>
            <p className="text-xs text-success flex items-center gap-1">
              <span className="size-2 rounded-full bg-success inline-block" />
              Online
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
