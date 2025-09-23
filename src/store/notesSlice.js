import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createSelector } from "@reduxjs/toolkit";
import {
  getNotes,
  getArchivedNotes,
  createNote,
  deleteNote as deleteNoteAPI,
  archiveNote as archiveNoteAPI,
  unarchiveNote as unarchiveNoteAPI,
} from "../utils/index.js";

export const fetchNotes = createAsyncThunk("notes/fetchNotes", async () => {
  const [activeResponse, archivedResponse] = await Promise.all([
    getNotes(),
    getArchivedNotes(),
  ]);
  return {
    active: activeResponse.data || [],
    archived: archivedResponse.data || [],
  };
});

export const addNoteAsync = createAsyncThunk(
  "notes/addNote",
  async ({ title, body }) => {
    const response = await createNote(title, body);
    return response.data;
  }
);

export const deleteNoteAsync = createAsyncThunk(
  "notes/deleteNote",
  async (noteId) => {
    await deleteNoteAPI(noteId);
    return noteId;
  }
);

export const archiveNoteAsync = createAsyncThunk(
  "notes/archiveNote",
  async (noteId) => {
    await archiveNoteAPI(noteId);
    return noteId;
  }
);

export const unarchiveNoteAsync = createAsyncThunk(
  "notes/unarchiveNote",
  async (noteId) => {
    await unarchiveNoteAPI(noteId);
    return noteId;
  }
);

const notesSlice = createSlice({
  name: "notes",
  initialState: {
    notes: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch notes
      .addCase(fetchNotes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.loading = false;
        state.notes = [...action.payload.active, ...action.payload.archived];
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Add note
      .addCase(addNoteAsync.fulfilled, (state, action) => {
        state.notes.push(action.payload);
      })
      .addCase(addNoteAsync.rejected, (state, action) => {
        state.error = action.error.message;
      })
      // Delete note
      .addCase(deleteNoteAsync.fulfilled, (state, action) => {
        state.notes = state.notes.filter((note) => note.id !== action.payload);
      })
      .addCase(deleteNoteAsync.rejected, (state, action) => {
        state.error = action.error.message;
      })
      // Archive note
      .addCase(archiveNoteAsync.fulfilled, (state, action) => {
        const note = state.notes.find((note) => note.id === action.payload);
        if (note) {
          note.archived = true;
        }
      })
      .addCase(archiveNoteAsync.rejected, (state, action) => {
        state.error = action.error.message;
      })
      // Unarchive note
      .addCase(unarchiveNoteAsync.fulfilled, (state, action) => {
        const note = state.notes.find((note) => note.id === action.payload);
        if (note) {
          note.archived = false;
        }
      })
      .addCase(unarchiveNoteAsync.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const { clearError } = notesSlice.actions;

// Selectors
export const selectAllNotes = (state) => state.notes.notes || [];
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
  (notes, noteId) => notes.find((note) => note.id === noteId)
);

export default notesSlice.reducer;
