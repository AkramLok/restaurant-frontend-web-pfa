import React from "react";
import { Link } from "react-router-dom";

const Breadcrumbs = ({ paths }) => {
  return (
    <div class="bg-gray-200 dark:bg-gray-800">
      <div class="container flex items-center px-6 py-4 mx-auto overflow-x-auto whitespace-nowrap">
        <a href="#" class="text-gray-600 dark:text-gray-200 mr-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
        </a>
        {paths.map((path, index) => (
          <span className="flex items-center" key={index}>
            {index > 0 && (
              <span className="mr-2 text-gray-500 dark:text-gray-300 rtl:-scale-x-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            )}
            {index !== paths.length - 1 ? (
              <Link
                className="text-gray-600 dark:text-gray-200 hover:underline mr-2"
                to={path.url}
              >
                {path.name}
              </Link>
            ) : (
              <span className="text-black dark:text-gray-100 mr-2">
                {path.name}
              </span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Breadcrumbs;
