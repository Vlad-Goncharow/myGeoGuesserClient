import FullUserItem from '@/Components/FullUserItem/FullUserItem'
import PlateBtn from '@/Components/PlateBtn/PlateBtn'
import { useAppSelector } from '@/hooks/useAppSelector'
import { getAuth } from '@/redux/slices/AuthSlice/selectors/authSelectors'
import { animated, easings, useSpring } from '@react-spring/web'
import React, { Dispatch, SetStateAction } from 'react'
import usePatchUpdate from '../../../../hooks/usePatchUpdate'
import s from './Preview.module.scss'

interface PreviewProps {
  patch: string
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

const Preview: React.FC<PreviewProps> = ({ patch, isOpen, setIsOpen }) => {
  const { user } = useAppSelector(getAuth)

  const springStyles = useSpring({
    from: { scale: 0, y: '-50%', x: '-50%' },
    to: { scale: isOpen ? 1 : 0, y: '-50%', x: '-50%' },
    config: { duration: 300, easing: easings.easeInOutQuad },
  })

  const { handleUpdatePatch } = usePatchUpdate({ patch })
  const updatePatch = async () => {
    setIsOpen(false)
    handleUpdatePatch()
  }

  return (
    <div className={s.wrapper}>
      {isOpen && (
        <div
          onClick={(e) => {
            e.stopPropagation()
            setIsOpen(false)
          }}
          className='overlay'
        ></div>
      )}
      <animated.div style={springStyles} className={s.modal}>
        <div className={s.patch}>
          <img
            src={`${import.meta.env.VITE_SERVER_URL}/uploads${patch}`}
            alt=''
          />
        </div>
        <div className={s.preview}>
          <div className={s.preview__title}>User Preview</div>

          <div className={s.preview__item}>
            {user && <FullUserItem user={{ ...user, patch }} />}
          </div>
        </div>
        <PlateBtn
          handleClick={updatePatch}
          plate='SP'
          text='Set Patch'
          url={null}
          className={s.btn}
        />
      </animated.div>
    </div>
  )
}

export default Preview
