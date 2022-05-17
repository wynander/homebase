import create from 'zustand'

export const useStore = create((set) => ({
  stateChoices: ['ca'],
  setStateChoices: (userInput) => set(() => ({ stateChoices: userInput })),
  removeAllStateChoices: () => set({ stateChoices: [] }),
  loadingStack: [],
  addToLoadingStack: (newLoadingInstance) => {
    set((state) => ({ loadingStack: [...state.loadingStack, newLoadingInstance] }))
  },
  layerChoice: 'overview',
  setLayerChoice: (userInput) => set(() => ({ layerChoice: userInput })),
}))
