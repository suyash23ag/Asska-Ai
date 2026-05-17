import { Outlet, useNavigate } from "react-router-dom";
import "./dashboardLayout.css";
import { useAuth } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import ChatList from "../../components/chatList/ChatList";

const DashboardLayout = () => {
  const { userId, isLoaded } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && !userId) {
      navigate("/sign-in");
    }
  }, [isLoaded, userId, navigate]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (!isLoaded) return "Loading...";

  return (
    <div className="dashboardLayout">
      <button 
        className={`sidebarToggle ${isSidebarOpen ? 'open' : ''}`}
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      
      <div className={`menu ${isSidebarOpen ? 'open' : 'closed'}`}>
        <ChatList/>
      </div>
      
      <div className={`content ${isSidebarOpen ? 'shifted' : ''}`}>
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
