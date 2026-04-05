import React from "react";
import { Link } from "react-router-dom";
import NotesList from "../components/NotesList.jsx";
import SearchBar from "../components/SearchBar.jsx";
import NoteTabs from "../components/NoteTabs.jsx";
import { useHome } from "../hooks/useHome.js";

function Home({ user }) {
  const {
    search,
    currentTab,
    filteredNotes,
    activeCount,
    archivedCount,
    loading,
    error,
    handleDeleteNote,
    handleSearchChange,
    handleTabChange,
    clearSearch,
    loadNotes
  } = useHome();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 flex items-center justify-center transition-colors duration-300">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 dark:border-purple-400 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300 transition-colors duration-200">Memuat catatan...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 flex items-center justify-center transition-colors duration-300">
        <div className="text-center">
          <div className="text-red-500 dark:text-red-400 mb-4">
            <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-red-600 dark:text-red-400 mb-4 transition-colors duration-200">Error: {error}</p>
          <button
            onClick={loadNotes}
            className="bg-purple-500 dark:bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-600 dark:hover:bg-purple-700 transition-colors duration-200"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 transition-colors duration-300">
      <div className="bg-white dark:bg-gray-800 shadow-lg transition-colors duration-200">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="text-center">
            <div className="flex justify-center items-center space-x-4 mb-4">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-2">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                My Notes App
              </span>
            </h1>
            <p className="text-gray-600 dark:text-gray-300 transition-colors duration-200">
              Selamat datang, {user?.name}! Kelola catatan Anda dengan mudah dan efisien
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <SearchBar value={search} onChange={handleSearchChange} />
          
          <Link
            to="/notes/new"
            className="w-full sm:w-auto bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-600 dark:to-pink-600 text-white py-3 px-6 rounded-full hover:from-purple-600 hover:to-pink-600 dark:hover:from-purple-700 dark:hover:to-pink-700 transition-all duration-200 transform hover:scale-105 active:scale-95 font-semibold shadow-lg hover:shadow-xl flex items-center justify-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Tambah Catatan
          </Link>
        </div>

        <NoteTabs 
          currentTab={currentTab}
          onTabChange={handleTabChange}
          activeCount={activeCount}
          archivedCount={archivedCount}
        />

        <div className="mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center transition-colors duration-200">
              <svg className="w-6 h-6 text-purple-500 dark:text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {currentTab === "active" ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8l6 6 6-6 2-2H3l2 2z" />
                )}
              </svg>
              {currentTab === "active" ? "Catatan Aktif" : "Arsip Catatan"}
              {search && ` (${filteredNotes.length} dari ${activeCount + archivedCount})`}
            </h2>

            {search && (
              <button
                onClick={clearSearch}
                className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 flex items-center transition-colors duration-200"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Hapus pencarian
              </button>
            )}
          </div>
          <NotesList
            notes={filteredNotes}
            onDelete={handleDeleteNote}
            showArchived={currentTab === "archived"}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
