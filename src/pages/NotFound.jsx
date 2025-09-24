import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 transition-colors duration-300">
      <div className="text-center max-w-md mx-4">
        {/* 404 Icon */}
        <div className="mb-8">
          <div className="relative">
            <div className="mx-auto w-32 h-32 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full flex items-center justify-center shadow-lg transition-colors duration-200">
              <svg
                className="w-16 h-16 text-purple-500 dark:text-purple-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.502 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            {/* Floating elements for visual appeal */}
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-pink-200 dark:bg-pink-800/50 rounded-full opacity-60 animate-bounce transition-colors duration-200"></div>
            <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-purple-200 dark:bg-purple-800/50 rounded-full opacity-60 animate-pulse transition-colors duration-200"></div>
          </div>
        </div>

        {/* 404 Text */}
        <h1 className="text-8xl font-bold mb-4">
          <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            404
          </span>
        </h1>
        
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4 transition-colors duration-200">
          Halaman Tidak Ditemukan
        </h2>
        
        <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg leading-relaxed transition-colors duration-200">
          Maaf, halaman yang Anda cari tidak dapat ditemukan. Mungkin halaman telah dipindahkan atau dihapus.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-600 dark:to-pink-600 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 dark:hover:from-purple-700 dark:hover:to-pink-700 transition-all duration-200 transform hover:scale-105 font-semibold shadow-lg hover:shadow-xl"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Kembali ke Beranda
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-200 font-semibold"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Kembali
          </button>
        </div>

        {/* Additional Info */}
        <div className="mt-12 p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700 transition-colors duration-200">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 transition-colors duration-200">
            Saran untuk Anda:
          </h3>
          <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1 transition-colors duration-200">
            <li>• Periksa kembali URL yang Anda masukkan</li>
            <li>• Kembali ke halaman utama dan coba navigasi ulang</li>
            <li>• Hubungi administrator jika masalah berlanjut</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NotFound;