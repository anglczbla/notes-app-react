import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { addNote, selectNotesLoading } from '../store/notesSlice.js';

function AddNotes() {
  const [formData, setFormData] = useState({ title: "", description: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector(selectNotesLoading);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title.trim() && formData.description.trim()) {
      // Dispatch action untuk menambah catatan
      dispatch(addNote(formData));
      
      // Reset form
      setFormData({ title: "", description: "" });
      
      // Redirect ke home
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => navigate("/")}
              className="flex items-center text-gray-600 hover:text-purple-600 transition-colors duration-200"
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
              <h1 className="text-2xl font-bold text-gray-800">
                Tambah Catatan Baru
              </h1>
            </div>
            
            <div className="w-20"></div> {/* Spacer untuk centering */}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-8 border-t-4 border-purple-500">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Judul Catatan *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                placeholder="Masukkan judul catatan..."
                onChange={handleInputChange}
                required
                disabled={loading}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all duration-200 outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deskripsi *
              </label>
              <textarea
                name="description"
                value={formData.description}
                placeholder="Tulis deskripsi catatan di sini..."
                onChange={handleInputChange}
                required
                rows="8"
                disabled={loading}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all duration-200 outline-none resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>
            
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => navigate("/")}
                disabled={loading}
                className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-300 transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Batal
              </button>
              
              <button
                type="submit"
                disabled={loading || !formData.title.trim() || !formData.description.trim()}
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-6 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-105 active:scale-95 font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
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
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Simpan Catatan
                    </>
                  )}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddNotes;