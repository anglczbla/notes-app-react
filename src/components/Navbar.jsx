import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400">
      <Link to="/">
        <li>Home</li>
      </Link>
      <Link to="/detail/:id">
        <li>Detail Catatan</li>
      </Link>
      <Link to="/notes/new">
        <li>Add Notes</li>
      </Link>
    </div>
  );
};

export default Navbar;
