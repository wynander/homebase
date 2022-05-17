import { useStore } from '../components/store'

const useLoadingStatus = () => {
  const loadingStack = useStore((state) => state.loadingStack)
    return loadingStack.length > 0 ? true : false
}

export default useLoadingStatus
