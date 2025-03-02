import subCountries from '@/config/countries50.json'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useAppSelector } from '@/hooks/useAppSelector'
import { getMiniGame } from '@/redux/slices/MiniGame/selectors/MiniGameSelectors'
import { miniGamegActions } from '@/redux/slices/MiniGame/slice/MiniGame'
import { scaleSequentialSqrt } from 'd3-scale'
import { interpolateYlOrRd } from 'd3-scale-chromatic'
import React from 'react'
import Globe, { GlobeMethods } from 'react-globe.gl'
import * as THREE from 'three'
import s from './GlobeComp.module.scss'
import { Feature, FeatureCollection } from 'geojson'

interface GlobeCompProps {
  globeGlobeRef: React.MutableRefObject<GlobeMethods | undefined>
}

const GlobeComp: React.FC<GlobeCompProps> = ({ globeGlobeRef }) => {
  const { selectedCounty, isMiniGameStart, currentRound } =
    useAppSelector(getMiniGame)
  const dispatch = useAppDispatch()

  const [countries, setCountries] = React.useState<FeatureCollection>({
    type: 'FeatureCollection',
    features: [],
  })

  const globeRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    setCountries(subCountries as FeatureCollection)
  }, [])

  const [available, setAvailable] = React.useState(true)
  const handleCountryClick = React.useCallback(
    (country: object) => {
      const copyCountry = country as Feature
      if (isMiniGameStart && currentRound <= 5 && available) {
        setTimeout(() => {
          dispatch(miniGamegActions.setSelectedCounty(null))
          dispatch(miniGamegActions.incrementCurrentRound())
          setAvailable(true)
        }, 1000)

        setAvailable(false)

        if (copyCountry.properties) {
          dispatch(
            miniGamegActions.setSelectedCounty({
              name: copyCountry.properties.NAME,
              nameLong: copyCountry.properties.NAME_LONG,
            })
          )
          dispatch(
            miniGamegActions.setChoosenCountries({
              name: copyCountry.properties.NAME,
              nameLong: copyCountry.properties.NAME_LONG,
            })
          )
        }
      }
    },
    [isMiniGameStart, currentRound, available, dispatch]
  )

  const colorScale = scaleSequentialSqrt(interpolateYlOrRd)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getVal = (feat: any) =>
    feat.properties.GDP_MD_EST / Math.max(1e5, feat.properties.POP_EST)

  const getPolygonCapMaterial = React.useCallback(
    (country: object): THREE.Material => {
      const typedCountry = country as Feature
      if (
        typedCountry.properties &&
        selectedCounty?.name === typedCountry.properties.NAME &&
        selectedCounty?.nameLong === typedCountry.properties.NAME_LONG
      ) {
        return new THREE.MeshBasicMaterial({ color: '#7CFC00' })
      } else {
        return new THREE.MeshBasicMaterial({
          color: colorScale(getVal(typedCountry)),
        })
      }
    },
    [colorScale, selectedCounty?.name, selectedCounty?.nameLong]
  )
  return (
    <div ref={globeRef} className={s.globe}>
      <Globe
        ref={globeGlobeRef}
        width={Number(globeRef.current?.offsetWidth)}
        height={Number(globeRef.current?.clientHeight)}
        backgroundImageUrl={'//unpkg.com/three-globe/example/img/night-sky.png'}
        lineHoverPrecision={0}
        polygonsData={countries.features}
        polygonCapColor={(d) => colorScale(getVal(d))}
        polygonSideColor={() => 'rgba(0, 100, 0, 0.15)'}
        polygonStrokeColor={() => '#111'}
        onPolygonClick={handleCountryClick}
        polygonsTransitionDuration={300}
        polygonCapMaterial={getPolygonCapMaterial}
      />
    </div>
  )
}

export default GlobeComp
