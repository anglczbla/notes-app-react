import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import NotesList from "../components/NotesList.jsx";
import {
  fetchNotes,
  deleteNoteAsync,
  selectActiveNotes,
  selectArchivedNotes,
  selectNotesLoading,
  selectNotesError,
} from "../store/notesSlice.js";

function NotesApp({ user, updateUser }) {
  const dispatch = useDispatch();
  const activeNotes = useSelector(selectActiveNotes);
  const archivedNotes = useSelector(selectArchivedNotes);
  const loading = useSelector(selectNotesLoading);
  const error = useSelector(selectNotesError);
  const [search, setSearch] = useState("");
  const [currentTab, setCurrentTab] = useState("active");

  useEffect(() => {
    dispatch(fetchNotes());
    // update user jika belum ada nama
    if (!user?.name && updateUser) {
      updateUser();
    }
  }, [dispatch, user, updateUser]);

  const handleDeleteNote = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus catatan ini?")) {
      try {
        await dispatch(deleteNoteAsync(id)).unwrap();
        // Refresh notes after deletion
        dispatch(fetchNotes());
      } catch (error) {
        console.error("Failed to delete note:", error);
      }
    }
  };

  const searchChange = (e) => {
    setSearch(e.target.value);
  };

  const currentNotes = currentTab === "active" ? activeNotes : archivedNotes;

  const filteredNotes = currentNotes.filter(
    (note) =>
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.body.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat catatan...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <svg
              className="w-12 h-12 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <p className="text-red-600 mb-4">Error: {error}</p>
          <button
            onClick={() => dispatch(fetchNotes())}
            className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="text-center">
            <div className="flex justify-center items-center space-x-4 mb-4">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-2">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                My Notes App
              </span>
            </h1>
            <p className="text-gray-600">
              Selamat datang, {user?.name}! Kelola catatan Anda dengan mudah dan
              efisien
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search Bar & Add Button */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative max-w-md w-full sm:flex-1">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Cari catatan..."
              value={search}
              onChange={searchChange}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all duration-200 outline-none bg-white shadow-md"
            />
          </div>

          <Link
            to="/notes/new"
            className="w-full sm:w-auto bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-6 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-105 active:scale-95 font-semibold shadow-lg hover:shadow-xl flex items-center justify-center"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Tambah Catatan
          </Link>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setCurrentTab("active")}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  currentTab === "active"
                    ? "border-purple-500 text-purple-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <span className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Catatan Aktif ({activeNotes.length})
                </span>
              </button>
              <button
                onClick={() => setCurrentTab("archived")}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  currentTab === "archived"
                    ? "border-purple-500 text-purple-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <span className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 8l6 6 6-6 2-2H3l2 2z"
                    />
                  </svg>
                  Arsip ({archivedNotes.length})
                </span>
              </button>
            </nav>
          </div>
        </div>

        {/* Notes List */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <svg
                className="w-6 h-6 text-purple-500 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {currentTab === "active" ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 8l6 6 6-6 2-2H3l2 2z"
                  />
                )}
              </svg>
              {currentTab === "active" ? "Catatan Aktif" : "Arsip Catatan"}
              {search &&
                ` (${filteredNotes.length} dari ${currentNotes.length})`}
            </h2>

            {search && (
              <button
                onClick={() => setSearch("")}
                className="text-sm text-gray-500 hover:text-gray-700 flex items-center"
              >
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                Hapus pencarian
              </button>
            )}
          </div>
          <NotesList
            notes={filteredNotes}
            onDelete={handleDeleteNote}
            showArchived={currentTab === "archived"}
          />
        </div>
      </div>
    </div>
  );
}

export default NotesApp;
