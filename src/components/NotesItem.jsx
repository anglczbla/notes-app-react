import React from "react";
import NotesItemBody from "./NotesItemBody";
import DeleteNotes from "./DeleteNotes";

function NotesItem({ title, body, createdAt, id, onDelete }) {
  return (
     <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-purple-500 p-6">
      <div className="flex items-start">
        <NotesItemBody title={title} body={body} createdAt={createdAt} />
        <DeleteNotes id={id} onDelete={onDelete} />
      </div>
    </div>
  );
}

export default NotesItem;
