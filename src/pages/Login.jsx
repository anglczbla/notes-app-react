import React from 'react';
import LoginForm from '../components/LoginForm.jsx';
import { useLogin } from '../hooks/useLogin.js';

const Login = () => {
  const {
    isRegisterMode,
    formData,
    loading,
    error,
    handleInputChange,
    handleSubmit,
    toggleMode
  } = useLogin();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
      <div className="bg-white dark:bg-gray-800 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="text-center">
            <div className="flex justify-center items-center space-x-4 mb-2">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              {isRegisterMode ? 'Daftar Akun Baru' : 'Masuk ke Akun'}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              {isRegisterMode 
                ? 'Buat akun baru untuk mulai membuat catatan' 
                : 'Masuk untuk mengakses catatan Anda'
              }
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-8">
        <LoginForm 
          isRegisterMode={isRegisterMode}
          formData={formData}
          onInputChange={handleInputChange}
          onSubmit={handleSubmit}
          onToggleMode={toggleMode}
          loading={loading}
          error={error}
        />

        <div className="mt-6 text-center">
          <p className="text-gray-500 dark:text-gray-400 text-xs">
            Dengan {isRegisterMode ? 'mendaftar' : 'masuk'}, Anda menyetujui syarat dan ketentuan yang berlaku.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
