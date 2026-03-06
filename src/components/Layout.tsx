"use client";

import { ReactNode, useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function Layout({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      <div className="flex flex-col flex-1 transition-all duration-300">
        <Navbar toggleSidebar={toggleSidebar} />
        <main className="flex-1 bg-gray-100 overflow-hidden">{children}</main>
      </div>
    </div>
  );
}
