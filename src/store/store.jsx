import create from 'zustand'

export const useStore = create((set) => ({
  stateChoices: [],
  setStateChoices: (userInput) => set(() => ({ stateChoices: userInput })),
  removeAllStateChoices: () => set({ stateChoices: [] }),

  loadingStack: [],
  addToLoadingStack: (newLoadingInstance) => {
    set((state) => ({ loadingStack: [...state.loadingStack, newLoadingInstance] }))
  },
  removeFromLoadingStack: (loadingInstance) => {
    set((state) => ({
      loadingStack: state.loadingStack.filter((instance) => instance !== loadingInstance),
    }))
  },

  layerChoice: 'overview',
  setLayerChoice: (input) => set(() => ({ layerChoice: input })),

  coverage: 1,
  setCoverage: (input) => set(() => ({ coverage: input })),

  elevationScale: 2,
  setElevationScale: (input) => set(() => ({ elevationScale: input })),
  
  radius: 10000,
  setRadius: (input) => set(() => ({ radius: input })),

  'Typical House Price': [-Infinity, Infinity],
  setTypicalHousePrice: (input) => set(() => ({ 'Typical House Price': input })),
  
  'Appreciation Rate': [-Infinity, Infinity],
  setAppreciationRate: (input) => set(() => ({ 'Appreciation Rate': input })),
}))
