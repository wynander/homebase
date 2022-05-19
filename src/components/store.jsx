import create from 'zustand'

export const useStore = create((set) => ({
  stateChoices: ['ca'],
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
  layerChoice: 'overview', //true == hex, false == geoJSON
  setLayerChoice: (input) => set(() => ({ layerChoice: input })),
  coverage: 1,
  elevationScale: 1,
  radius: 10000,
  setCoverage: (input) => set(() => ({ coverage: input })),
  setRadius: (input) => set(() => ({ radius: input })),
  setElevationScale: (input) => set(() => ({ elevationScale: input })),
}))
