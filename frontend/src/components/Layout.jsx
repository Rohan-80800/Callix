import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = ({ children, showSidebar }) => {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="drawer lg:drawer-open">
        <input id="sidebar-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col h-full overflow-auto">
          <Navbar showSidebar={showSidebar} />

          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 relative z-0">
            {children}
          </main>
        </div>
      
        {showSidebar && (
          <div className="drawer-side z-50">
            <label htmlFor="sidebar-drawer" className="drawer-overlay"></label>
            <Sidebar />
          </div>
        )}
      </div>
    </div>
  );
};

export default Layout;
