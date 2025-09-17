import { createSlice } from "@reduxjs/toolkit";
import { getInitialData } from "../utils/index.js";
import { createSelector } from "@reduxjs/toolkit";

const notesSlice = createSlice({
  name: "notes",
  initialState: {
    notes: getInitialData(),
    loading: false,
    error: null,
  },
  reducers: {
    addNote: (state, action) => {
      const newNote = {
        id: Date.now(),
        title: action.payload.title,
        body: action.payload.description,
        createdAt: new Date().toISOString(),
        archived: false,
      };
      state.notes.push(newNote);
    },
    deleteNote: (state, action) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
    },
    updateNote: (state, action) => {
      const { id, title, description } = action.payload;
      const existingNote = state.notes.find((note) => note.id === id);
      if (existingNote) {
        existingNote.title = title;
        existingNote.body = description;
      }
    },
    archiveNote: (state, action) => {
      const note = state.notes.find((note) => note.id === action.payload);
      if (note) {
        note.archived = !note.archived;
      }
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  addNote,
  deleteNote,
  updateNote,
  archiveNote,
  setLoading,
  setError,
} = notesSlice.actions;

// Selectors
export const selectAllNotes = (state) => state.notes.notes;
export const selectNotesLoading = (state) => state.notes.loading;
export const selectNotesError = (state) => state.notes.error;
export const selectActiveNotes = createSelector([selectAllNotes], (notes) =>
  notes.filter((note) => !note.archived)
);

export const selectArchivedNotes = createSelector([selectAllNotes], (notes) =>
  notes.filter((note) => note.archived)
);

export const selectNoteById = createSelector(
  [selectAllNotes, (state, noteId) => noteId],
  (notes, noteId) => notes.find((note) => note.id === parseInt(noteId))
);

export default notesSlice.reducer;
