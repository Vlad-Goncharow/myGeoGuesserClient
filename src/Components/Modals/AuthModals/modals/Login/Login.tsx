import OverlayWrapper from '../../components/OverlayWrapper/OverlayWrapper'
import { useAppSelector } from '@/hooks/useAppSelector'
import { getModals } from '@/redux/slices/Modals/selectors/modalsSelectors'
import { animated, useSpring } from '@react-spring/web'
import classNames from 'classnames'
import React from 'react'
import { useForm } from 'react-hook-form'
import UseLogin from '../../utils/hooks/UseLogin'
import { LoginInputs } from '../../utils/types'
import { USERFIELDSCONSTS } from '@/config/constants'

interface LoginProps {
  closeModal: () => void
}

const Login: React.FC<LoginProps> = ({ closeModal }) => {
  const { loginModaL } = useAppSelector(getModals)

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginInputs>()

  const { data, isSuccess, error, loginSubmit } = UseLogin()

  React.useEffect(() => {
    if (isSuccess && data) {
      localStorage.setItem('token', data.accessToken)
      closeModal()
    }

    if (!isSuccess && error) {
      setError(error.param, { message: error.message })

      return
    }
  }, [data, isSuccess, error, closeModal, setError])

  //animation init
  const [springs, loginApi] = useSpring(() => ({
    from: { x: '0%' },
    to: { x: '-100%' },
  }))

  //srart animation
  React.useEffect(() => {
    if (loginModaL) {
      loginApi.start({
        from: { x: '-100%' },
        to: { x: '0%' },
      })
    }
  }, [loginApi, loginModaL])

  return (
    <OverlayWrapper closeModal={closeModal}>
      <animated.div
        style={{
          ...springs,
        }}
      >
        <form onSubmit={handleSubmit(loginSubmit)} className='auth-form'>
          <div className='auth-form__item'>
            {errors?.email && (
              <span className='auth-form__error'>{errors?.email.message}</span>
            )}

            <label htmlFor='email'>Email</label>
            <input
              id='email'
              className='auth-form__input'
              placeholder='Your email'
              {...register('email', {
                required: 'Required field',
                pattern: {
                  value:
                    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: 'Enter a valid email address',
                },
              })}
            />
          </div>
          <div className='auth-form__item'>
            {errors?.password && (
              <span className='auth-form__error'>
                {errors?.password.message}
              </span>
            )}

            <label htmlFor='password'>Password</label>
            <input
              type='password'
              id='password'
              className='auth-form__input'
              placeholder='Your Password'
              {...register('password', {
                minLength: {
                  value: USERFIELDSCONSTS.MIN_PASSWORD_LENGTH,
                  message: `Password min length is ${USERFIELDSCONSTS.MIN_PASSWORD_LENGTH}`,
                },
                maxLength: {
                  value: USERFIELDSCONSTS.MAX_PASSWORD_LENGTH,
                  message: `Password max length is ${USERFIELDSCONSTS.MAX_PASSWORD_LENGTH}`,
                },
                required: 'Required field',
              })}
            />
          </div>
          <button
            onClick={handleSubmit(loginSubmit)}
            className={classNames('auth-form__submit', 'btn', {
              'auth-form__submit_disabled': Object.keys(errors).length !== 0,
            })}
          >
            Login
          </button>
        </form>
      </animated.div>
    </OverlayWrapper>
  )
}

export default Login
