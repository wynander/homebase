import { useStore } from '@/store/store'

const useLoadingStatus = () => {
  const { loadingStack } = useStore()
  return loadingStack.length > 0 ? true : false
}

export default useLoadingStatus
