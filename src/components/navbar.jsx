import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const activeLinkStyle = {
    fontWeight: "bold",
    color: "#0f172a",
  };

  const inactiveLinkStyle = {
    fontWeight: "bold",
    color: "#9ca3af",
  };

  function isCurrentPage(path) {
    if (
      location.pathname.startsWith(path) &&
      location.pathname.length === path.length
    ) {
      return true;
    }
    return false;
  }

  return (
    <div className="sm:pt-8">
      <nav className="hover:bg-gradient-to-br hover:from-sky-100 hidden sm:flex sm:flex-row text-lg w-5/6 rounded-lg mx-auto py-5 px-36 mb-10 bg-gradient-to-br from-zinc-100 to-white justify-around items-center shadow-lg">
        <Link
          to="/participations"
          style={
            isCurrentPage("/participations")
              ? activeLinkStyle
              : inactiveLinkStyle
          }
        >
          Participations
        </Link>
        <Link
          to="/qr-scanner"
          style={
            isCurrentPage("/") || isCurrentPage("/qr-scanner")
              ? activeLinkStyle
              : inactiveLinkStyle
          }
        >
          QR Scanner
        </Link>
        <Link
          to="/participants"
          style={
            isCurrentPage("/participants") ? activeLinkStyle : inactiveLinkStyle
          }
        >
          Participants
        </Link>
        <Link
          to="/qr-generator"
          style={
            isCurrentPage("/qr-generator") ? activeLinkStyle : inactiveLinkStyle
          }
        >
          QR Generator
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;
