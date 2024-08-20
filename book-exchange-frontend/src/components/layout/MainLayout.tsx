// book-exchange-frontend/src/components/layout/MainLayout.tsx
import React, { useState } from "react";
import "./MainLayout.css";

interface LayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: LayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="main-layout">
      <header className="header flex justify-between items-center p-4 bg-gray-100">
        <div className="hamburger cursor-pointer" onClick={toggleMenu}>
          &#9776;
        </div>
        <div>Header</div>
        <div>
          <input
            type="text"
            placeholder="Search..."
            className="p-2 border border-gray-300 rounded"
          />
        </div>
      </header>
      <nav
        className={`navbar ${menuOpen ? "navbar-menu active" : "navbar-menu"}`}
      >
        <div className="hamburger cursor-pointer p-4" onClick={toggleMenu}>
          &#9776;
        </div>
        <ul className="p-4">
          <li className="py-2 text-white">Menu Item 1</li>
          <li className="py-2 text-white">Menu Item 2</li>
          <li className="py-2 text-white">Menu Item 3</li>
        </ul>
      </nav>
      {menuOpen && (
        <div
          className={`overlay ${menuOpen ? "active" : ""}`}
          onClick={toggleMenu}
        ></div>
      )}
      <main className="main p-4">{children}</main>
      <footer className="footer p-4 bg-gray-100">Footer</footer>
    </div>
  );
}
