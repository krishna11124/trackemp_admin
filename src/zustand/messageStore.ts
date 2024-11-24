import create from 'zustand'

interface MessageState {
  message: string;
  error: string;
  setMessage: (message: string) => void;
  setError: (error: string) => void;
  clearMessageAndError: () => void;
}

const useMessageStore = create<MessageState>((set: (fn: (state: MessageState) => MessageState) => void) => ({
  message: "",
  error: "",
  setMessage: (message: string) => set((state: MessageState) => ({ ...state, message: message })),
  setError: (error: string) => set((state: MessageState) => ({ ...state, error: error })),
  clearMessageAndError: () => set((state:MessageState) => ({ ...state, message: "", error: "" })),
}));

export default useMessageStore;
