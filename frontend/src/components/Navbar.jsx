import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { BellIcon, LogOutIcon, ShipWheelIcon, MenuIcon } from "lucide-react";
import ThemeSelector from "./ThemeSelector";
import useLogout from "../hooks/useLogout";
import { useNotificationStore } from "../store/notifications.store";

const Navbar = ({ showSidebar }) => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const isChatPage = location.pathname?.startsWith("/chat");
  const unreadCount = useNotificationStore(
    (s) => Object.keys(s.unreadMessages).length
  );

  const { logoutMutation } = useLogout();

  return (
    <nav className="bg-base-200 border-b border-base-300 sticky top-0 z-50 h-16 flex items-center">
      <div className="container mx-auto px-2 sm:px-4 lg:px-8 flex items-center justify-between w-full max-w-screen-xl">
 
        {showSidebar && (
          <label
            htmlFor="sidebar-drawer"
            className="btn btn-ghost btn-circle lg:hidden flex items-center justify-center"
            aria-label="Toggle sidebar"
          >
            <MenuIcon className="h-5 w-5 sm:h-6 sm:w-6 text-base-content opacity-70" />
          </label>
        )}

        {isChatPage && (
          <div className="flex items-center pl-1 sm:pl-2 lg:pl-5">
            <Link to="/" className="flex items-center gap-1.5 sm:gap-2.5">
              <ShipWheelIcon className="size-7 sm:size-9 text-primary" />
              <span className="text-xl sm:text-2xl lg:text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
                callix
              </span>
            </Link>
          </div>
        )}

        <div className="flex items-center gap-1 sm:gap-2 lg:gap-3 ml-auto flex-shrink-0">
          <Link to="/notifications">
            <button className="btn btn-ghost btn-circle relative">
              <BellIcon className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-base-content opacity-70" />
              {unreadCount > 0 && (
                <span className="absolute top-[-2px] right-[-2px] sm:top-[-3px] sm:right-[-3px] bg-red-500 text-white text-[10px] sm:text-xs w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
          </Link>

          <ThemeSelector />

          <div className="avatar flex-shrink-0">
            <div className="w-6 sm:w-8 lg:w-9 rounded-full">
              <img
                src={authUser?.profilePic}
                alt="User Avatar"
                rel="noreferrer"
              />
            </div>
          </div>

          <button className="btn btn-ghost btn-circle" onClick={logoutMutation}>
            <LogOutIcon className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-base-content opacity-70" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
