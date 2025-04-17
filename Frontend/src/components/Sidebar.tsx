import React, { useState } from "react";
import {
  Box,
  LayoutDashboard,
  LogOut,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
} from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Sidebar: React.FC = () => {
  const [expanded, setExpanded] = useState(true);

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };
  const { user } = useAuth();
  const navItems = [
    { Icon: LayoutDashboard, label: "Dashboard", path: "/Dashboard" },
    { Icon: AlertTriangle, label: "Issue Tracker", path: "/issue-tracker" },

    ...(user?.role === "Admin"
      ? [{ Icon: Box, label: "Assets Management", path: "/asset-management" }]
      : []),
  ];

  return (
    <div className={`flex min-h-screen sticky`}>
      <div
        className={`flex flex-col h-screen bg-white border-r border-gray-200 transition-all duration-300 ${
          expanded ? "w-64" : "w-16"
        }`}
      >
        <div className="flex h-16 items-center px-4 border-b border-gray-200">
          {expanded ? (
            <h2 className="text-lg font-semibold">Easy Assets</h2>
          ) : (
            <div className="mx-auto">
              <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                M
              </div>
            </div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto">
          <nav className="flex flex-col gap-1 p-2">
            {navItems.map(({ Icon, label, path }, index) => (
              <NavLink to={path} key={index}>
                <button
                  className={`flex items-center rounded-md px-3 py-2 text-gray-700 active:bg-blue-100 hover:bg-blue-200 w-full text-left`}
                  title={!expanded ? label : undefined}
                >
                  <Icon size={20} className="flex-shrink-0" />
                  {expanded && <span className="ml-3">{label}</span>}
                </button>
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="border-t border-gray-200 p-2">
          <button
            className="flex items-center rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
            title={!expanded ? "Settings" : undefined}
          >
            <LogOut size={20} className="flex-shrink-0" />
            {expanded && <span className="ml-3">Log out</span>}
          </button>

          <div className="h-px bg-gray-200 my-2"></div>

          <button
            className="flex items-center justify-center p-2 text-gray-500 hover:text-gray-700 w-full rounded-md hover:bg-gray-100"
            onClick={toggleSidebar}
            aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
          >
            {expanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
        </div>
      </div>
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default Sidebar;
