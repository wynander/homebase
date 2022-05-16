import create from 'zustand'

export const useStore = create((set) => ({
  stateChoices: ['ca'],
  setStateChoices: (userInput) => set(() => ({ stateChoices: userInput })),
  removeAllStateChoices: () => set({ stateChoices: [] }),
}))
