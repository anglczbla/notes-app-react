import React from 'react';
import { Link } from 'react-router-dom';
import { showFormattedDate } from '../utils/index.js';

function NoteItem({ note, onArchive, onDelete }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg dark:hover:shadow-2xl transition-all duration-200 overflow-hidden border border-gray-100 dark:border-gray-700">
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2 flex-1 transition-colors duration-200">
            {note.title}
          </h3>
          <div className="flex items-center space-x-2 ml-2">
            <button
              onClick={() => onArchive(note.id, note.archived)}
              className={`p-1.5 rounded-lg transition-colors duration-200 ${
                note.archived 
                  ? 'text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/30' 
                  : 'text-gray-400 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-600 dark:hover:text-gray-300'
              }`}
              title={note.archived ? 'Batal arsipkan' : 'Arsipkan catatan'}
            >
              {note.archived ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M10.5 3L12 2l1.5 1H21v2H3V3h7.5z" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8l6 6 6-6 2-2H3l2 2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12h18" />
                </svg>
              )}
            </button>
            <button
              onClick={() => onDelete(note.id)}
              className="p-1.5 text-gray-400 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors duration-200"
              title="Hapus catatan"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3 transition-colors duration-200">
          {note.body}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500 dark:text-gray-400 transition-colors duration-200">
            Dibuat pada: {showFormattedDate(note.createdAt)}
          </span>
          <Link 
            to={`/detail/${note.id}`}
            className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 text-sm font-medium flex items-center transition-colors duration-200"
          >
            Detail
            <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        
        {note.archived && (
          <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700 transition-colors duration-200">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400 transition-colors duration-200">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8l6 6 6-6 2-2H3l2 2z" />
              </svg>
              Diarsipkan
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default NoteItem;
