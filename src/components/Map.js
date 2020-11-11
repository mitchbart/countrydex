import React, { useEffect, useRef, useState } from 'react'

export default function Map({ options, onMount, className, onMountProps, showOne }) {
  const ref = useRef()
  const [map, setMap] = useState()

  useEffect(() => {
    // const onLoad = () => setMap(new window.google.maps.Map(ref.current, options))
    console.log(showOne.area)
    const options = { 
      center: { lat: showOne.latlng[0], lng: showOne.latlng[1] },
      //if (showOne.area > 6000000) {
      //  zoom: 4,
      //} else {
      //  zoom: 5,
      //}
      zoom:  showOne.area > 6000000 ? 4 : showOne.area < 40000 ? 6 : showOne.area < 6000000 ? 5 : 7 
      //zoom: 4,
    }
    const onLoad = () => setMap(new window.google.maps.Map(ref.current, options))
    if (!window.google) {
      const script = document.createElement(`script`)
      script.src =
        `https://maps.googleapis.com/maps/api/js?key=` +
        process.env.REACT_APP_GOOGLE_MAPS_API_KEY
      document.head.append(script)
      script.addEventListener(`load`, onLoad)
      return () => script.removeEventListener(`load`, onLoad)
    } else onLoad()
  }, [showOne])

  if (map && typeof onMount === `function`) onMount(map, onMountProps)

  return (
    <div className="map"
      // style={{ height: `60vh`, margin: `1em 0`, borderRadius: `0.5em` }}
      {...{ ref }}
    />
  )
}

