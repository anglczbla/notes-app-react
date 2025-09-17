import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { archiveNote } from '../store/notesSlice.js';

function NotesList({ notes, onDelete, showArchived = false }) {
  const dispatch = useDispatch();

  const handleArchive = (id) => {
    dispatch(archiveNote(id));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (notes.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          {showArchived ? 'Belum ada catatan yang diarsipkan' : 'Belum ada catatan'}
        </h3>
        <p className="text-gray-500">
          {showArchived 
            ? 'Catatan yang diarsipkan akan muncul di sini' 
            : 'Mulai dengan membuat catatan pertama Anda'
          }
        </p>
        {!showArchived && (
          <Link 
            to="/notes/new"
            className="inline-flex items-center mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Tambah Catatan
          </Link>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {notes.map((note) => (
        <div key={note.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden border border-gray-100">
          <div className="p-6">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 flex-1">
                {note.title}
              </h3>
              <div className="flex items-center space-x-2 ml-2">
                <button
                  onClick={() => handleArchive(note.id)}
                  className={`p-1.5 rounded-lg transition-colors duration-200 ${
                    note.archived 
                      ? 'text-green-600 hover:bg-green-50' 
                      : 'text-gray-400 hover:bg-gray-100 hover:text-gray-600'
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
                  className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                  title="Hapus catatan"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
            
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              {note.body}
            </p>
            
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">
                Dibuat pada: {formatDate(note.createdAt)}
              </span>
              <Link 
                to={`/detail/${note.id}`}
                className="text-purple-600 hover:text-purple-700 text-sm font-medium flex items-center transition-colors duration-200"
              >
                Detail
                <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            
            {note.archived && (
              <div className="mt-3 pt-3 border-t border-gray-100">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8l6 6 6-6 2-2H3l2 2z" />
                  </svg>
                  Diarsipkan
                </span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default NotesList;