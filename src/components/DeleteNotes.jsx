import React from "react";

function DeleteNotes({ id, onDelete }) {
  return (
    <button
      className="ml-4 p-2 text-red-500 hover:text-white hover:bg-red-500 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95"
      onClick={() => onDelete(id)}
      title="Delete note"
    >
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        />
      </svg>
    </button>
  );
}

export default DeleteNotes;
