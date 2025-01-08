import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useAppSelector } from '@/hooks/useAppSelector'
import { getModals } from '@/redux/slices/Modals/selectors/modalsSelectors'
import { modalsActions } from '@/redux/slices/Modals/slice/modalsSlice'
import { animated, easings, useSpring } from '@react-spring/web'
import classNames from 'classnames'
import React from 'react'
import s from './AuthModals.module.scss'
import Login from './modals/Login/Login'
import Register from './modals/Register/Register'

function AuthModals() {
  const dispatch = useAppDispatch()

  const { registerModal, loginModaL } = useAppSelector(getModals)

  //animation init
  const [springs, api] = useSpring(() => ({
    from: { scale: '0%' },
    to: { scale: '0%' },
    config: {
      duration: 150,
      easing: easings.easeInOutQuad,
    },
  }))

  //start animation
  React.useEffect(() => {
    if (registerModal || loginModaL) {
      api.start({
        from: { scale: '0%' },
        to: { scale: '100%' },
      })
    }
  }, [registerModal, loginModaL])

  //close modal
  const closeModal = () => {
    api.start({
      from: { scale: '100%' },
      to: { scale: '0%' },
    })

    if (registerModal) {
      setTimeout(() => {
        dispatch(modalsActions.toggleRegisterModal())
      }, 300)
    }

    if (loginModaL) {
      setTimeout(() => {
        dispatch(modalsActions.toggleLoginModal())
      }, 300)
    }
  }

  return (
    <div
      className={classNames(s.dialog, {
        [s.active]: registerModal || loginModaL,
      })}
      onClick={closeModal}
    >
      <animated.div
        onClick={(e) => e.stopPropagation()}
        style={{
          ...springs,
        }}
      >
        {registerModal && <Register closeModal={closeModal} />}
        {loginModaL && <Login closeModal={closeModal} />}
      </animated.div>
    </div>
  )
}

export default AuthModals
