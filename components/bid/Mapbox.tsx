import React, { useRef, useEffect, useState } from 'react'
import mapboxgl, { LngLatLike } from 'mapbox-gl'

interface MapBoxProps {
  center: LngLatLike
  zoom: number
  stores: LngLatLike[]
}

const MapBox: React.FC<MapBoxProps> = ({ center, zoom, stores }) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null)
  const [map, setMap] = useState<mapboxgl.Map | null>(null)

  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ''
    if (!map) {
      const mapInstance = new mapboxgl.Map({
        container: mapContainerRef.current!,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: center,
        zoom: zoom,
      })

      setMap(mapInstance)
    }
  }, [map, center, zoom])

  useEffect(() => {
    if (map) {
      stores.forEach((store) => {
        const marker = new mapboxgl.Marker().setLngLat(store).addTo(map)
      })
    }
  }, [map, stores])

  return <div ref={mapContainerRef} className="h-[100vh] w-full"></div>
}

export default MapBox
