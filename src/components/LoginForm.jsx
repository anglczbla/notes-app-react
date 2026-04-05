import React from 'react';

function LoginForm({ 
  isRegisterMode, 
  formData, 
  onInputChange, 
  onSubmit, 
  onToggleMode, 
  loading, 
  error 
}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border-t-4 border-purple-500">
      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-red-700 dark:text-red-400 text-sm">{error}</p>
          </div>
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-6">
        {isRegisterMode && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Nama Lengkap *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              placeholder="Masukkan nama lengkap..."
              onChange={onInputChange}
              required={isRegisterMode}
              disabled={loading}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-4 focus:ring-purple-100 dark:focus:ring-purple-900/20 focus:border-purple-500 transition-all duration-200 outline-none disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:cursor-not-allowed"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder="Masukkan email..."
            onChange={onInputChange}
            required
            disabled={loading}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-4 focus:ring-purple-100 dark:focus:ring-purple-900/20 focus:border-purple-500 transition-all duration-200 outline-none disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Password *
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            placeholder="Masukkan password..."
            onChange={onInputChange}
            required
            disabled={loading}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-4 focus:ring-purple-100 dark:focus:ring-purple-900/20 focus:border-purple-500 transition-all duration-200 outline-none disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:cursor-not-allowed"
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Password minimal 6 karakter</p>
        </div>

        {isRegisterMode && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Konfirmasi Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              placeholder="Ulangi password..."
              onChange={onInputChange}
              disabled={loading}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-4 focus:ring-purple-100 dark:focus:ring-purple-900/20 focus:border-purple-500 transition-all duration-200 outline-none disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:cursor-not-allowed"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-6 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-105 active:scale-95 font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          <span className="flex items-center justify-center">
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {isRegisterMode ? 'Mendaftar...' : 'Masuk...'}
              </>
            ) : (
              <>
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isRegisterMode ? "M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" : "M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"} />
                </svg>
                {isRegisterMode ? 'Daftar Sekarang' : 'Masuk'}
              </>
            )}
          </span>
        </button>
      </form>

      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
            {isRegisterMode ? 'Sudah punya akun?' : 'Belum punya akun?'}
          </p>
          <button
            type="button"
            onClick={onToggleMode}
            disabled={loading}
            className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium text-sm transition-colors duration-200 disabled:opacity-50"
          >
            {isRegisterMode ? 'Masuk di sini' : 'Daftar di sini'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
