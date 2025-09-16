import React from "react";
import { useParams, Link } from "react-router-dom";
import { getInitialData } from "../utils";

const DetailCatatan = () => {
  const { id } = useParams();
  const notes = getInitialData();
  const note = notes.find(note => note.id === parseInt(id));

  if (!note) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h2 className="text-2xl font-semibold text-gray-600 mt-4">Catatan Tidak Ditemukan</h2>
        <p className="text-gray-500 mt-2">Catatan dengan ID tersebut tidak ada.</p>
        <Link
          to="/"
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Kembali ke Beranda
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-100">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <svg className="w-6 h-6 text-purple-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Detail Catatan
        </h2>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{note.title}</h3>
          <p className="text-gray-600 mb-4">{note.body}</p>
          <p className="text-sm text-gray-500">
            Dibuat pada: {new Date(note.createdAt).toLocaleDateString("id-ID", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <Link
            to="/"
            className="mt-6 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Kembali ke Beranda
        </Link>
        </div>
      </div>
    </div>
  );
};

export default DetailCatatan;