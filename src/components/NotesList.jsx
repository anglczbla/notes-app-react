import React from "react";
import { Link } from "react-router-dom";

const NotesList = ({ notes, onDelete }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {notes.length === 0 ? (
        <p className="text-gray-500 text-center col-span-full">Tidak ada catatan yang ditemukan.</p>
      ) : (
        notes.map((note) => (
          <div
            key={note.id}
            className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{note.title}</h3>
            <p className="text-gray-600 mb-4 line-clamp-3">{note.body}</p>
            <p className="text-sm text-gray-500 mb-4">
              Dibuat pada: {new Date(note.createdAt).toLocaleDateString("id-ID", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <div className="flex space-x-4">
              <Link
                to={`/detail/${note.id}`}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              >
                Detail
              </Link>
              <button
                onClick={() => onDelete(note.id)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Hapus
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default NotesList;