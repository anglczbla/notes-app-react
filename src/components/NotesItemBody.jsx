import React from "react";
import { showFormattedDate } from "../utils";

function NotesItemBody({ title, body, createdAt }) {
  return (
    <div className="notes-item-body">
      <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
        {title}
      </h3>
      <p className="text-sm text-purple-600 mb-3 font-medium">
        {showFormattedDate(createdAt)}
      </p>
      <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
        {body}
      </p>
    </div>
  );
}
export default NotesItemBody;
