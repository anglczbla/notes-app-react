import React from 'react';

function NoteTabs({ currentTab, onTabChange, activeCount, archivedCount }) {
  return (
    <div className="mb-6">
      <div className="border-b border-gray-200 dark:border-gray-700 transition-colors duration-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => onTabChange("active")}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
              currentTab === "active"
                ? "border-purple-500 dark:border-purple-400 text-purple-600 dark:text-purple-400"
                : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
            }`}
          >
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Catatan Aktif ({activeCount})
            </span>
          </button>
          <button
            onClick={() => onTabChange("archived")}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
              currentTab === "archived"
                ? "border-purple-500 dark:border-purple-400 text-purple-600 dark:text-purple-400"
                : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
            }`}
          >
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8l6 6 6-6 2-2H3l2 2z" />
              </svg>
              Arsip ({archivedCount})
            </span>
          </button>
        </nav>
      </div>
    </div>
  );
}

export default NoteTabs;
