import PlateBtn from '@/Components/PlateBtn/PlateBtn'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useAppSelector } from '@/hooks/useAppSelector'
import { getModals } from '@/redux/slices/Modals/selectors/modalsSelectors'
import { modalsActions } from '@/redux/slices/Modals/slice/modalsSlice'
import { animated, easings, useSpring } from '@react-spring/web'
import React from 'react'
import s from './ApiKeyModal.module.scss'

const keyStorage = localStorage.getItem('google-api-key')

function ApiKeyModal() {
  const { apiKeyModal } = useAppSelector(getModals)
  const dispatch = useAppDispatch()

  const springStyles = useSpring({
    from: { scale: 0, y: '-50%', x: '-50%' },
    to: { scale: apiKeyModal ? 1 : 0, y: '-50%', x: '-50%' },
    config: { duration: 300, easing: easings.easeInOutQuad },
  })

  const [inputKey, setInputKey] = React.useState<string>(
    keyStorage ? keyStorage : ''
  )

  const saveKey = () => {
    dispatch(modalsActions.toggleApiKeyModal())
    localStorage.setItem('google-api-key', inputKey)
  }
  const clearKey = () => {
    dispatch(modalsActions.toggleApiKeyModal())
    localStorage.removeItem('google-api-key')
    setInputKey('')
  }

  const inputRef = React.useRef<HTMLInputElement>(null)
  const toggleKey = () => {
    if (inputRef.current) {
      if (inputRef.current.type === 'password') {
        inputRef.current.type = 'text'
      } else {
        inputRef.current.type = 'password'
      }
    }
  }
  return (
    <div className='api-key'>
      {apiKeyModal && (
        <div
          onClick={() => dispatch(modalsActions.toggleApiKeyModal())}
          className='overlay'
        ></div>
      )}
      <animated.div style={springStyles} className={s.modal}>
        <h1 className={s.title}>Google Maps API KEY</h1>
        <div className={s.modal__input}>
          <input
            type='password'
            className={s.input}
            placeholder='Enter here your api key to access game'
            value={inputKey}
            onChange={(e) => setInputKey(e.target.value)}
            ref={inputRef}
          />
          <input
            type='checkbox'
            onClick={toggleKey}
            className={s.modal__toggle}
          />
        </div>
        <PlateBtn
          handleClick={saveKey}
          plate='SK'
          text='Save Key'
          url={null}
          className={s.btn}
        />
        <PlateBtn
          handleClick={clearKey}
          plate='CK'
          text='Clear Key'
          url={null}
          className={s.btn}
        />
      </animated.div>
    </div>
  )
}

export default ApiKeyModal
