import React from "react";
import NoteForm from '../components/NoteForm.jsx';
import { useAddNotePage } from "../hooks/useAddNotePage.js";

function AddNotes() {
  const {
    formData,
    loading,
    handleInputChange,
    handleSubmit,
    handleCancel
  } = useAddNotePage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-200">
      <div className="bg-white dark:bg-gray-800 shadow-lg transition-colors duration-200">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <button 
              onClick={handleCancel}
              className="flex items-center text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200"
              disabled={loading}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Kembali
            </button>
            <div className="text-center">
              <div className="flex justify-center items-center space-x-4 mb-2">
                <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
              </div>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white transition-colors duration-200">
                Tambah Catatan Baru
              </h1>
            </div>
            <div className="w-20"></div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-2xl p-8 border-t-4 border-purple-500 dark:border-purple-400 transition-all duration-200">
          <NoteForm 
            title={formData.title}
            body={formData.description}
            onTitleChange={handleInputChange}
            onBodyChange={handleInputChange}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}

export default AddNotes;
