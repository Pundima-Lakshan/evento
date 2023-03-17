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
    <nav className="hidden sm:flex sm:flex-row text-lg w-full py-5 px-36 mb-8 bg-slate-200 justify-around items-center shadow-lg">
      <Link
        style={
          isCurrentPage("/participation") ? activeLinkStyle : inactiveLinkStyle
        }
      >
        Participation
      </Link>
      <Link
        style={
          isCurrentPage("/") || isCurrentPage("/qr-scanner")
            ? activeLinkStyle
            : inactiveLinkStyle
        }
      >
        QR Scanner
      </Link>
      <Link
        style={
          isCurrentPage("/participants") ? activeLinkStyle : inactiveLinkStyle
        }
      >
        Participants
      </Link>
      <Link
        style={
          isCurrentPage("/qr-generator") ? activeLinkStyle : inactiveLinkStyle
        }
      >
        QR Generator
      </Link>
    </nav>
  );
};

export default Navbar;
