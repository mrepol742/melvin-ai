import { useChatStore } from "@/store/chats";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  const { chats, activeChatId, setActiveChat } = useChatStore();

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity lg:hidden ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleSidebar}
      />

      <aside
        className={`fixed left-0 top-0 z-50 h-full w-72 bg-gray-900 text-white flex flex-col transform transition-transform duration-300 shadow-lg lg:static lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-5 text-2xl font-bold border-b border-gray-800">
          Chats
        </div>

        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-2">
            {chats.map((chat, idx) => (
              <li key={chat.id}>
                <button
                  onClick={() => setActiveChat(chat.id, chat.title)}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors duration-200 text-sm font-medium ${
                    chat.id === activeChatId
                      ? "bg-gray-800 text-white shadow"
                      : "hover:bg-gray-800"
                  }`}
                >
                  {chat.title || `Chat ${idx + 1}`}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-800 text-gray-400 text-xs text-center">
          Melvin AI • v1.0
        </div>
      </aside>
    </>
  );
}
