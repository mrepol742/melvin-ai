let dbPromise: any = null;

const getDB = async () => {
  if (typeof window === "undefined") return null;

  if (!dbPromise) {
    const { openDB } = await import("idb");
    dbPromise = openDB("chat-db", 1, {
      upgrade(db) {
        db.createObjectStore("keyval");
      },
    });
  }

  return dbPromise;
};

export const storage = {
  getItem: async (key: string) => {
    const db = await getDB();
    if (!db) return null;

    return (await db.get("keyval", key)) ?? null;
  },

  setItem: async (key: string, value: any) => {
    const db = await getDB();
    if (!db) return;

    const hasUsefulData = value?.state?.chats?.some(
      (chat: any) => chat.messages?.length > 0,
    );

    if (!hasUsefulData) {
      await db.delete("keyval", key);
      return;
    }

    await db.put("keyval", value, key);
  },

  removeItem: async (key: string) => {
    const db = await getDB();
    if (!db) return;

    await db.delete("keyval", key);
  },
};
