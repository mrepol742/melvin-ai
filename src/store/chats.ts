"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { storage } from "@/lib/storage";

const MessageSchema = z.object({
  role: z.enum(["user", "bot"]),
  content: z.string(),
  created_at: z.coerce.date(),
});

const ChatSchema = z.object({
  id: z.string(),
  title: z.string(),
  messages: z.array(MessageSchema),
  created_at: z.coerce.date(),
});

export type Message = z.infer<typeof MessageSchema>;
export type Chat = z.infer<typeof ChatSchema>;

interface ChatStore {
  chats: Chat[];
  activeChatId: string | null;
  activeChatTitle: string | null;
  hasHydrated: boolean;

  setHasHydrated: (state: boolean) => void;
  setActiveChat: (id: string, title: string) => void;
  addChat: () => string;
  addMessage: (chatId: string, message: Message) => void;
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      chats: [],
      activeChatId: null,
      activeChatTitle: null,
      hasHydrated: false,

      setHasHydrated: (state) => set({ hasHydrated: state }),

      setActiveChat: (id, title) =>
        set({ activeChatId: id, activeChatTitle: title }),

      addChat: () => {
        const newChat: Chat = {
          id: uuidv4(),
          title: "New Chat",
          messages: [],
          created_at: new Date(),
        };
        set((state) => ({
          chats: [newChat, ...state.chats],
          activeChatId: newChat.id,
          activeChatTitle: newChat.title,
        }));
        return newChat.id;
      },

      addMessage: (chatId, message) => {
        set((state) => {
          const chats = state.chats.map((chat) =>
            chat.id === chatId
              ? {
                  ...chat,
                  title:
                    chat.title === "New Chat" && message.role === "user"
                      ? message.content.slice(0, 20)
                      : chat.title,
                  messages: [...chat.messages, message],
                }
              : chat,
          );
          return { chats };
        });
      },
    }),
    {
      name: "chats-storage",
      storage: storage,

      partialize: (state) => ({
        chats: state.chats,
        activeChatId: state.activeChatId,
        activeChatTitle: state.activeChatTitle,
      }),

      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
