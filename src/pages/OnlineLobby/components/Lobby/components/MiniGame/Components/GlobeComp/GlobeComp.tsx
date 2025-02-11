import subCountries from '@/config/countries50.json'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useAppSelector } from '@/hooks/useAppSelector'
import { getMiniGame } from '@/redux/slices/MiniGame/selectors/MiniGameSelectors'
import { miniGamegActions } from '@/redux/slices/MiniGame/slice/MiniGame'
import { scaleSequentialSqrt } from 'd3-scale'
import { interpolateYlOrRd } from 'd3-scale-chromatic'
import React from 'react'
import Globe from 'react-globe.gl'
import * as THREE from 'three'
import s from './GlobeComp.module.scss'

interface GlobeCompProps {
  globeGlobeRed: any
}

const GlobeComp: React.FC<GlobeCompProps> = ({ globeGlobeRed }) => {
  const { selectedCounty, isMiniGameStart, currentRound } =
    useAppSelector(getMiniGame)
  const dispatch = useAppDispatch()

  const [countries, setCountries] = React.useState<any>({ features: [] })

  const globeRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    setCountries(subCountries)
  }, [])

  const [avaible, setAbaible] = React.useState(true)
  const handleCountryClick = React.useCallback(
    (country: any) => {
      if (isMiniGameStart && currentRound <= 5 && avaible) {
        setTimeout(() => {
          dispatch(miniGamegActions.setSelectedCounty(null))
          dispatch(miniGamegActions.incrementCurrentRound())
          setAbaible(true)
        }, 1000)

        setAbaible(false)

        dispatch(
          miniGamegActions.setSelectedCounty({
            name: country.properties.NAME,
            nameLong: country.properties.NAME_LONG,
          })
        )
        dispatch(
          miniGamegActions.setChoosenCountries({
            name: country.properties.NAME,
            nameLong: country.properties.NAME_LONG,
          })
        )
      }
    },
    [isMiniGameStart, currentRound, avaible]
  )

  const colorScale = scaleSequentialSqrt(interpolateYlOrRd)
  const getVal = (feat: any) =>
    feat.properties.GDP_MD_EST / Math.max(1e5, feat.properties.POP_EST)

  return (
    <div ref={globeRef} className={s.globe}>
      <Globe
        ref={globeGlobeRed}
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
        polygonCapMaterial={(country: any) => {
          if (
            selectedCounty?.name === country.properties.NAME &&
            selectedCounty?.nameLong === country.properties.NAME_LONG
          ) {
            return new THREE.MeshBasicMaterial({ color: '#7CFC00' })
          } else {
            return new THREE.MeshBasicMaterial({
              color: colorScale(getVal(country)),
            })
          }
        }}
      />
    </div>
  )
}

export default GlobeComp
