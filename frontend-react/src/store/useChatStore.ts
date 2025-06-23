
import { create } from 'zustand';

interface ChatState {
  isChatOpen: boolean;
  setChatOpen: (isOpen: boolean) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  isChatOpen: false,
  setChatOpen: (isOpen) => set({ isChatOpen: isOpen }),
}));
