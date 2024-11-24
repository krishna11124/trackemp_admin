import create from 'zustand'

interface GlobalLoadingState {
  loading: boolean;
  setLoading: (message: boolean) => void;
}

const useLoadingStore = create<GlobalLoadingState>((set: (fn: (state: GlobalLoadingState) => GlobalLoadingState) => void) => ({
    loading: false,
    setLoading: (message: boolean) => set((state: GlobalLoadingState) => ({ ...state, loading: message })),
}));

export default useLoadingStore;
