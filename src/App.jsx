import { useState } from "react";
import "./App.css";
import NotesList from "./components/NotesList";
import AddNotes from "./components/AddNotes";
import { getInitialData } from "./utils";

function NotesApp() {
  const [notes, setNotes] = useState(getInitialData());
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [search, setSearch] = useState("");

  const DeleteNotes = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  };

  const searchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title && formData.description) {
      const newNotes = {
        id: Date.now(),
        title: formData.title,
        body: formData.description,
        createdAt: new Date().toISOString(),
        archived: false,
      };

      setNotes([...notes, newNotes]);
      setFormData({ title: "", description: "" });
    }
  };

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(search.toLowerCase()) ||
    note.body.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="text-center">
            <div className="flex justify-center items-center space-x-4 mb-4">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              My Notes App
            </h1>
            <p className="text-gray-600">Kelola catatan Anda dengan mudah dan efisien</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
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
        </div>

        {/* Add Notes Form */}
        <AddNotes
          title={formData.title}
          description={formData.description}
          onChange={handleInputChange}
          onSubmit={handleSubmit}
        />

        {/* Notes List */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <svg className="w-6 h-6 text-purple-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            Catatan Anda ({filteredNotes.length})
          </h2>
          <NotesList notes={filteredNotes} onDelete={DeleteNotes} />
        </div>
      </div>
    </div>
  );
}

export default NotesApp;

