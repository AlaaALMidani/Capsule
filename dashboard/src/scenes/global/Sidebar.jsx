import { BarChart2, Menu, Settings, Users, ClipboardList, FileText, PieChart, UserPlus, User, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";

const SIDEBAR_ITEMS = [
  { name: "Dashboard", icon: BarChart2, color: "#6366f1", href: "/" },
  {
    name: "Account Management",
    icon: Users,
    color: "#EC4899",
    children: [
      { name: "All Users", icon: User, href: "/account/all-users" },
      { name: "Add New User", icon: UserPlus, href: "/account/add-user" },
    ],
  },
  { name: "Orders Management", icon: ClipboardList, color: "#10B981", href: "/orders-management" },
  { name: "Offer Management", icon: ClipboardList, color: "#F59E0B", href: "/offer-management" },
  { name: "Invoice Management", icon: FileText, color: "#8B5CF6", href: "/invoice-management" },
  { name: "Posts Management", icon: FileText, color: "#3B82F6", href: "/posts-management" },
  { name: "Analytics", icon: PieChart, color: "#06B6D4", href: "/analytics" },
  { name: "Settings", icon: Settings, color: "#6EE7B7", href: "/settings" },
];

const Sidebar = ({ isSidebar }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(isSidebar);
  const [isAccountManagementOpen, setIsAccountManagementOpen] = useState(false); // State to toggle Account Management

  return (
    <motion.div
      className={`relative z-10 transition-all duration-200 ease-in-out flex-shrink-0 ${isSidebarOpen ? "w-64" : "w-20"}`}
      animate={{ width: isSidebarOpen ? 256 : 80 }}
    >
      <div className="h-full bg-gray-800 bg-opacity-50 backdrop-blur-md p-4 flex flex-col border-r border-gray-700">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-full hover:bg-gray-700 transition-colors max-w-fit"
        >
          <Menu size={24} />
        </motion.button>

        <nav className="mt-8 flex-grow">
          {SIDEBAR_ITEMS.map((item) => (
            <div key={item.name}>
              {/* Display "Account Management" only if it's the expanded section */}
              {item.name === "Account Management" ? (
                <motion.div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsAccountManagementOpen(!isAccountManagementOpen)}
                    className="flex items-center p-4 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors mb-2"
                  >
                    <Users size={20} style={{ color: item.color, minWidth: "20px" }} />
                    <AnimatePresence>
                      {isSidebarOpen && (
                        <motion.span
                          className="ml-4 whitespace-nowrap"
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: "auto" }}
                          exit={{ opacity: 0, width: 0 }}
                          transition={{ duration: 0.2, delay: 0.3 }}
                        >
                          {item.name}
                        </motion.span>
                      )}
                    </AnimatePresence>
                    {/* Only show Chevron icon when the sidebar is open */}
                    {isSidebarOpen && (
                      isAccountManagementOpen ? (
                        <ChevronUp size={20} className="ml-auto text-gray-300" />
                      ) : (
                        <ChevronDown size={20} className="ml-auto text-gray-300" />
                      )
                    )}
                  </motion.button>
                  {/* Render children of Account Management if expanded */}
                  <AnimatePresence>
                    {isAccountManagementOpen && isSidebarOpen && (
                      <motion.div
                        className="ml-6"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {item.children.map((child) => (
                          <Link key={child.name} to={child.href}>
                            <motion.div className="flex items-center ml-8 p-2 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors mb-1">
                              <child.icon size={20} style={{ color: item.color, minWidth: "20px" }} />
                              <span className="ml-4 text-gray-400">{child.name}</span>
                            </motion.div>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ) : (
                <Link to={item.href || "#"}>
                  <motion.div className="flex items-center p-4 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors mb-2">
                    <item.icon size={20} style={{ color: item.color, minWidth: "20px" }} />
                    <AnimatePresence>
                      {isSidebarOpen && (
                        <motion.span
                          className="ml-4 whitespace-nowrap"
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: "auto" }}
                          exit={{ opacity: 0, width: 0 }}
                          transition={{ duration: 0.2, delay: 0.3 }}
                        >
                          {item.name}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </Link>
              )}
            </div>
          ))}
        </nav>
      </div>
    </motion.div>
  );
};

export default Sidebar;
