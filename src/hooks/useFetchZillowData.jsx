import { useEffect, useState } from 'react'
import { fetchZillowData } from '@/api/fetchZillowData'
import { convertCSVtoArray } from '@/data/convertCSVtoArray'
import { useStore } from '@/store/store'

const useFetchZillowData = () => {
  const {addToLoadingStack, removeFromLoadingStack} = useStore()

  const [zillowData, setZillowData] = useState(null)

  useEffect(() => {
    addToLoadingStack('fetchingZillowData')

    fetchZillowData().then((data) => {
      setZillowData(convertCSVtoArray(data))

      removeFromLoadingStack('fetchingZillowData')
    })
  }, [])

  

  return zillowData
}

export default useFetchZillowData
