import { create } from "zustand";

export const useNotificationStore = create((set, get) => ({
  unreadMessages: {},

  addUnreadMessage: (senderId, message) =>
    set((state) => {
      const prevMessages = state.unreadMessages[senderId] || [];
      return {
        unreadMessages: {
          ...state.unreadMessages,
          [senderId]: [...prevMessages, message]
        }
      };
    }),

  clearUnreadMessage: (senderId) =>
    set((state) => {
      const updated = { ...state.unreadMessages };
      delete updated[senderId];
      return { unreadMessages: updated };
    }),

  getUnreadCount: () => Object.keys(get().unreadMessages).length
}));
