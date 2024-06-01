import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs";
import DashboardCard from "./DashboardCard";
import GraphComponent from "./GraphComponent";
import ProductsData from "./ProductsData";
import OrdersData from "./OrdersData";
import ClientsData from "./ClientsData";
import PointsData from "./PointsData";
import FeedbacksData from "./FeedbacksData";
import WaitersData from "./WaitersData";
import GeneralData from "./GeneralData";

const Dashboard = () => {
  const [selectedContent, setSelectedContent] = useState(null);
  const location = useLocation();

  const getBreadcrumbs = () => {
    const paths = [
      { name: "Home", url: "/" },
      { name: "Dashboard", url: "/dashboard" },
    ];
    return paths;
  };

  const handleContentClick = (content) => {
    setSelectedContent(content);
  };

  const getContentComponent = () => {
    switch (selectedContent) {
      case "ProductsData":
        return <ProductsData />;
      case "OrdersData":
        return <OrdersData />;
      case "ClientsData":
        return <ClientsData />;
      case "PointsData":
        return <PointsData />;
      case "WaitersData":
        return <WaitersData />;
      case "FeedbacksData":
        return <FeedbacksData />;
      default:
        return <GeneralData />;
    }
  };

  return (
    <div>
      <Breadcrumbs paths={getBreadcrumbs()} />
      <div className="flex">
        <aside className="flex flex-col w-64 px-5 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700 flex-shrink-0">
          <div className="flex flex-col justify-between flex-1 mt-6">
            <nav className="flex-1 space-y-3">
              <p
                className="flex items-center py-2 px-4 text-gray-600 transition-colors duration-300 transform rounded-lg bg-gray-200 dark:bg-gray-800 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700 shadow-md"
                href="#"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#00ADB5"
                  className="w-10 h-10"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605"
                  />
                </svg>
                <span className="mx-2 text-lg font-semibold">Dashboard</span>
              </p>
              <button
                className="nav-link w-full flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                onClick={() => handleContentClick("ProductsData")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#00ADB5"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 10h16M4 14h16M4 18h16"
                  />
                </svg>
                <span className="mx-2 text-sm font-medium">Products</span>
              </button>
              <button
                className="nav-link w-full flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                onClick={() => handleContentClick("OrdersData")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#00ADB5"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 7h18M3 12h18M3 17h18"
                  />
                </svg>
                <span className="mx-2 text-sm font-medium">Orders</span>
              </button>
              <button
                className="nav-link w-full flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                onClick={() => handleContentClick("WaitersData")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#00ADB5"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 14.25l-4-4m0 0l-4 4m4-4v6.75M21 14.25l-4-4m0 0l-4 4m4-4v6.75"
                  />
                </svg>
                <span className="mx-2 text-sm font-medium">Waiters</span>
              </button>
              <button
                className="nav-link w-full flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                onClick={() => handleContentClick("FeedbacksData")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#00ADB5"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 14l9-5-9-5-9 5 9 5z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 14l6.16-3.422A12.047 12.047 0 0112 19.949 12.047 12.047 0 015.84 10.578L12 14z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 14l-6.16-3.422A12.047 12.047 0 0012 19.949 12.047 12.047 0 0018.16 10.578L12 14z"
                  />
                </svg>
                <span className="mx-2 text-sm font-medium">Feedbacks</span>
              </button>
            </nav>
          </div>
        </aside>

        <div className="flex-1 p-4 shadow-lg bg-tertiary bg-opacity-75">
          <div className="grid grid-cols-1 gap-4">{getContentComponent()}</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
