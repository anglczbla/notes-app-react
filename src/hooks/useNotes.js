import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchNotes,
  addNoteAsync,
  deleteNoteAsync,
  archiveNoteAsync,
  unarchiveNoteAsync,
  selectActiveNotes,
  selectArchivedNotes,
  selectNotesLoading,
  selectNotesError,
} from '../store/notesSlice.js';

export const useNotes = () => {
  const dispatch = useDispatch();
  const activeNotes = useSelector(selectActiveNotes);
  const archivedNotes = useSelector(selectArchivedNotes);
  const loading = useSelector(selectNotesLoading);
  const error = useSelector(selectNotesError);

  const loadNotes = useCallback(() => {
    return dispatch(fetchNotes());
  }, [dispatch]);

  const addNote = useCallback((title, body) => {
    return dispatch(addNoteAsync({ title, body }));
  }, [dispatch]);

  const deleteNote = useCallback((id) => {
    return dispatch(deleteNoteAsync(id));
  }, [dispatch]);

  const archiveNote = useCallback((id) => {
    return dispatch(archiveNoteAsync(id));
  }, [dispatch]);

  const unarchiveNote = useCallback((id) => {
    return dispatch(unarchiveNoteAsync(id));
  }, [dispatch]);

  return {
    activeNotes,
    archivedNotes,
    loading,
    error,
    addNote,
    deleteNote,
    archiveNote,
    unarchiveNote,
    loadNotes,
  };
};
