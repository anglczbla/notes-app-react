import React from 'react';
import { Link } from 'react-router-dom';
import { useNotes } from '../hooks/useNotes.js';
import NoteItem from './NoteItem.jsx';

function NotesList({ notes, onDelete, showArchived = false }) {
  const { archiveNote, unarchiveNote } = useNotes();

  const handleArchive = async (id, isArchived) => {
    if (isArchived) {
      unarchiveNote(id);
    } else {
      archiveNote(id);
    }
  };

  if (notes.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="mx-auto w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4 transition-colors duration-200">
          <svg className="w-12 h-12 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2 transition-colors duration-200">
          {showArchived ? 'Belum ada catatan yang diarsipkan' : 'Belum ada catatan'}
        </h3>
        <p className="text-gray-500 dark:text-gray-400 transition-colors duration-200">
          {showArchived 
            ? 'Catatan yang diarsipkan akan muncul di sini' 
            : 'Mulai dengan membuat catatan pertama Anda'
          }
        </p>
        {!showArchived && (
          <Link 
            to="/notes/new"
            className="inline-flex items-center mt-4 px-4 py-2 bg-purple-600 dark:bg-purple-700 text-white rounded-lg hover:bg-purple-700 dark:hover:bg-purple-800 transition-all duration-200"
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
        <NoteItem 
          key={note.id} 
          note={note} 
          onArchive={handleArchive} 
          onDelete={onDelete} 
        />
      ))}
    </div>
  );
}

export default NotesList;
