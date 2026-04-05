import React from "react";
import { Link } from "react-router-dom";
import { showFormattedDate } from "../utils/index.js";
import { useNoteDetailPage } from "../hooks/useNoteDetailPage.js";

const DetailCatatan = () => {
  const { note, loading, error } = useNoteDetailPage();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 flex items-center justify-center transition-colors duration-300">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 dark:border-purple-400 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300 transition-colors duration-200">Memuat detail catatan...</p>
        </div>
      </div>
    );
  }

  if (error || !note) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 flex items-center justify-center transition-colors duration-300">
        <div className="flex flex-col items-center justify-center min-h-screen">
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 text-center max-w-md mx-4 transition-colors duration-200">
            <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center transition-colors duration-200">
              <svg className="w-8 h-8 text-red-500 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.502 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2 transition-colors duration-200">
              {error || 'Catatan Tidak Ditemukan'}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 transition-colors duration-200">
              {error || 'Catatan dengan ID tersebut tidak ada atau telah dihapus.'}
            </p>
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-600 dark:to-pink-600 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 dark:hover:from-purple-700 dark:hover:to-pink-700 transition-all duration-200 transform hover:scale-105 font-semibold shadow-lg"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 transition-colors duration-300">
      <div className="bg-white dark:bg-gray-800 shadow-lg transition-colors duration-200">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link 
              to="/"
              className="flex items-center text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Kembali
            </Link>
            <div className="text-center">
              <div className="flex justify-center items-center space-x-4 mb-2">
                <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white transition-colors duration-200">
                Detail Catatan
              </h1>
            </div>
            <div className="w-20"></div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border-t-4 border-purple-500 dark:border-purple-400 transition-colors duration-200">
          {note.archived && (
            <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-700 rounded-lg transition-colors duration-200">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8l6 6 6-6 2-2H3l2 2z" />
                </svg>
                <span className="text-yellow-800 dark:text-yellow-400 font-medium transition-colors duration-200">Catatan ini telah diarsipkan</span>
              </div>
            </div>
          )}

          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2 transition-colors duration-200">{note.title}</h2>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 space-x-4 transition-colors duration-200">
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Dibuat pada: {showFormattedDate(note.createdAt)}
              </div>
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4 transition-colors duration-200">Isi Catatan:</h3>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 border-l-4 border-purple-400 dark:border-purple-500 transition-colors duration-200">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap transition-colors duration-200">
                {note.body || note.description || 'Tidak ada konten catatan.'}
              </p>
            </div>
          </div>
          
          <div className="flex gap-4 pt-6 border-t border-gray-200 dark:border-gray-700 transition-colors duration-200">
            <Link
              to="/"
              className="flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-600 dark:to-pink-600 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 dark:hover:from-purple-700 dark:hover:to-pink-700 transition-all duration-200 transform hover:scale-105 font-semibold shadow-lg"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailCatatan;
