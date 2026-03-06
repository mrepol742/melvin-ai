"use client";

import { useChatStore } from "@/store/chats";
import { Menu, Plus } from "lucide-react";

interface NavbarProps {
  toggleSidebar: () => void;
}

export default function Navbar({ toggleSidebar }: NavbarProps) {
  const { activeChatId, activeChatTitle, addChat } = useChatStore();

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between bg-gray-900 border-b border-gray-800 px-6 py-4 shadow-sm">
      <button
        className="lg:hidden p-2 text-white rounded hover:bg-gray-800 transition-colors"
        onClick={toggleSidebar}
        aria-label="Toggle Sidebar"
      >
        <Menu className="w-6 h-6" />
      </button>

      <h1 className="text-lg font-semibold text-white truncate">
        {activeChatId ? activeChatTitle : "Melvin AI"}
      </h1>

      <div className="flex items-center space-x-3">
        <button
          onClick={() => addChat()}
          className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-white transition-colors shadow-sm"
          title="New Chat"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
