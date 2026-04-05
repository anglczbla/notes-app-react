import React from 'react';

function NoteForm({ title, body, onTitleChange, onBodyChange, onSubmit, onCancel, loading }) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-200">
          Judul Catatan *
        </label>
        <input
          type="text"
          name="title"
          value={title}
          placeholder="Masukkan judul catatan..."
          onChange={onTitleChange}
          required
          disabled={loading}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-4 focus:ring-purple-100 dark:focus:ring-purple-900/50 focus:border-purple-500 dark:focus:border-purple-400 transition-all duration-200 outline-none disabled:bg-gray-100 dark:disabled:bg-gray-700 disabled:cursor-not-allowed bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-200">
          Deskripsi *
        </label>
        <textarea
          name="description"
          value={body}
          placeholder="Tulis deskripsi catatan di sini..."
          onChange={onBodyChange}
          required
          rows="8"
          disabled={loading}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-4 focus:ring-purple-100 dark:focus:ring-purple-900/50 focus:border-purple-500 dark:focus:border-purple-400 transition-all duration-200 outline-none resize-none disabled:bg-gray-100 dark:disabled:bg-gray-700 disabled:cursor-not-allowed bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
        />
      </div>
      <div className="flex gap-4">
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="flex-1 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 py-3 px-6 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Batal
        </button>
        <button
          type="submit"
          disabled={loading || !title.trim() || !body.trim()}
          className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-600 dark:to-pink-600 text-white py-3 px-6 rounded-lg hover:from-purple-600 hover:to-pink-600 dark:hover:from-purple-700 dark:hover:to-pink-700 transition-all duration-200 transform hover:scale-105 active:scale-95 font-semibold shadow-lg hover:shadow-xl dark:shadow-purple-900/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          <span className="flex items-center justify-center">
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Menyimpan...
              </>
            ) : (
              <>
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Simpan Catatan
              </>
            )}
          </span>
        </button>
      </div>
    </form>
  );
}

export default NoteForm;
