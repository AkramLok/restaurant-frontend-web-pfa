// DashboardCard.js

import React from "react";

const DashboardCard = ({ title, content }) => {
  return (
    <div className="bg-white dark:bg-gray-400 border dark:text-white rounded-lg shadow-md p-6 mb-4">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p>{content}</p>
    </div>
  );
};

export default DashboardCard;
