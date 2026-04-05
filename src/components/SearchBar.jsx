import React from 'react';

function SearchBar({ value, onChange }) {
  return (
    <div className="relative max-w-md w-full sm:flex-1">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <svg className="h-5 w-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <input
        type="text"
        placeholder="Cari catatan..."
        value={value}
        onChange={onChange}
        className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-4 focus:ring-purple-100 dark:focus:ring-purple-900/30 focus:border-purple-500 dark:focus:border-purple-400 transition-all duration-200 outline-none shadow-md"
      />
    </div>
  );
}

export default SearchBar;
