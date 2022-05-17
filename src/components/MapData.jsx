import React, { useEffect, useState } from 'react'
import { useFetchCityBoundaries } from './DataAggregation'
import Map from './Map'
import { addPropertiesToCityJSON } from './DataConditioning'
import { GeoJsonLayer } from '@deck.gl/layers'
import { HexagonLayer } from '@deck.gl/aggregation-layers'
import { colorScale, colorRange } from './colorScales'
import { useStore } from './store'
import { convertZillowCSVtoArray } from './DataConditioning'

export default function MapData({}) {
  const [geoJsonData, setGeoJsonData] = useState({
    type: 'FeatureCollection',
    name: 'tl_2019_02_place',
    crs: { type: 'name', properties: { name: 'urn:ogc:def:crs:EPSG::4269' } },
    features: [],
  })
  const [hexData, setHexData] = useState({
    type: 'FeatureCollection',
    name: 'tl_2019_02_place',
    crs: { type: 'name', properties: { name: 'urn:ogc:def:crs:EPSG::4269' } },
    features: [],
  })
  const stateChoices = useStore((state) => state.stateChoices)
  const layerChoice = useStore((state) => state.layerChoice)
  const isVisibleHex = layerChoice === 'overview' ? true : false
  const isVisibleGeoJSON = layerChoice === 'stateview' ? true : false
  const [zillowData, setZillowData] = useState(null)

  //Code for hexagon layer
  useEffect(() => {
    async function fetchCityPointData() {
      const cityRes = await fetch('../src/data/US_City_points_geojson.json')
      const cityPoints = await cityRes.json()
      let coordinates = { features: [] }
      cityPoints.features.forEach((city) => {
        coordinates.features.push({
          COORDINATES: city.geometry.coordinates,
          properties: { NAME: city.properties.name, STATEFP: city.properties.state_fips },
        })
      })
      // //With zillow API key this would be fetched from their API and then conditioned the same way
      let zillowRes = await fetch('../src/data/Zillow_Home_Value_By_City_May_2022.csv', {
        headers: {
          'content-type': 'text/csv;charset=UTF-8',
        },
      })
      let zillowDataStateUpdate = await zillowRes.text()
      zillowDataStateUpdate = convertZillowCSVtoArray(zillowDataStateUpdate)
      let mergedData = await addPropertiesToCityJSON(coordinates, zillowDataStateUpdate)
      setZillowData(zillowDataStateUpdate)
      return mergedData
    }
    fetchCityPointData().then((d) => {
      setHexData(d)
    })
  }, [])

  //Code for city boundaries layer
  useEffect(() => {
    async function fetchData(stateChoices) {
      const cityBoundaries = await useFetchCityBoundaries(stateChoices)

      let mergedData = await addPropertiesToCityJSON(cityBoundaries, zillowData)
      return mergedData
    }
    if (zillowData !== null) {
      fetchData(stateChoices).then((d) => {
        setGeoJsonData(d)
      })
    }
  }, [stateChoices, zillowData])

  const getMean2yr = (points) => {
    if (points) {
      let sum = 0
      let ct = points.length
      points.forEach((point) => {
        if (!isNaN(point.properties.houseAppreciation2yr)) {
          sum += +point.properties.houseAppreciation2yr
        }else{
          ct--
        }
      })
      return sum / points.length
    }
  }

  const getElevation = (points) => {
    if (points) {
      let sum = 0
      let ct = points.length
      points.forEach((point) => {
        if (point.properties.currentTypicalHousePrice !== '$NaN') {
          let dollarsAsFloat = parseFloat(point.properties.currentTypicalHousePrice.replace(/[^0-9-.]/g, '')) 
          sum += dollarsAsFloat
        }else{
          ct--
        }
      })
      return sum / ct
    }
  }

  const layers = [
    new HexagonLayer({
      id: 'heatmap',
      opacity: 1,
      colorRange,
      coverage: 1,
      data: hexData.features,
      elevationRange: [0, 1000000],
      extruded: true,
      getPosition: (d) => d.COORDINATES,
      getElevationValue: getElevation,
      getColorValue: getMean2yr,
      pickable: true,
      radius: 10000,
      upperPercentile: 100,
      transitions: {
        elevationScale: 1,
      },
      visible: isVisibleHex,
    }),
    new GeoJsonLayer({
      id: 'geojson',
      data: geoJsonData,
      opacity: 0.8,
      stroked: false,
      filled: true,
      extruded: true,
      wireframe: true,
      getFillColor: (city) => colorScale(city.properties.houseAppreciation2yr),
      getLineColor: (city) => colorScale(city.properties.houseAppreciation2yr),
      getElevation: 0,
      //Code for elevation based on Zillow data
      // (city) => {
      //   if (city.properties.currentTypicalHousePrice === '$NaN') return 0
      //   return parseFloat(city.properties.currentTypicalHousePrice.replace(/[^0-9.-]+/g, '')) / 20
      // }
      pickable: true,
      visible: isVisibleGeoJSON,
    }),
  ]

  return (
    <div>
      <Map layers={layers} />
    </div>
  )
}
