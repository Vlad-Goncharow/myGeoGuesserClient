import OverlayWrapper from '../../components/OverlayWrapper/OverlayWrapper'
import { useAppSelector } from '@/hooks/useAppSelector'
import { getModals } from '@/redux/slices/Modals/selectors/modalsSelectors'
import { animated, useSpring } from '@react-spring/web'
import classNames from 'classnames'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import useRegister from '../../utils/hooks/useRegister'
import { RegisterInputs } from '../../utils/types'
import { USERFIELDSCONSTS } from '@/config/constants'

interface RegisterProps {
  closeModal: () => void
}

const Register: React.FC<RegisterProps> = ({ closeModal }) => {
  const { registerModal } = useAppSelector(getModals)

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<RegisterInputs>()

  const { data, error, isSuccess, registerSubmit } = useRegister()

  const myHandleSubmit: SubmitHandler<RegisterInputs> = (data) => {
    registerSubmit({
      email: data.email,
      nickname: data.nickname,
      password: data.password,
    })
  }

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
  const [springs, regApi] = useSpring(() => ({
    from: { x: '0%' },
    to: { x: '100%' },
  }))

  //animation start
  React.useEffect(() => {
    if (registerModal) {
      regApi.start({
        from: { x: '100%' },
        to: { x: '0%' },
      })
    }
  }, [regApi, registerModal])

  return (
    <OverlayWrapper closeModal={closeModal}>
      <animated.div
        style={{
          ...springs,
        }}
      >
        <form onSubmit={handleSubmit(myHandleSubmit)} className='auth-form'>
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
            {errors?.nickname && (
              <span className='auth-form__error'>
                {errors?.nickname.message}
              </span>
            )}

            <label htmlFor='nickname'>Nickname</label>
            <input
              id='nickname'
              className='auth-form__input'
              placeholder='Your nickname'
              {...register('nickname', {
                required: 'Required field',
                minLength: {
                  value: USERFIELDSCONSTS.MIN_NICKNAME_LENGTH,
                  message: `Min length ${USERFIELDSCONSTS.MIN_NICKNAME_LENGTH}`,
                },
                maxLength: {
                  value: USERFIELDSCONSTS.MAX_NICKNAME_LENGTH,
                  message: `Max length ${USERFIELDSCONSTS.MAX_NICKNAME_LENGTH}`,
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
                required: 'Required field',
                minLength: {
                  value: USERFIELDSCONSTS.MIN_PASSWORD_LENGTH,
                  message: `Min length ${USERFIELDSCONSTS.MIN_PASSWORD_LENGTH}`,
                },
                maxLength: {
                  value: USERFIELDSCONSTS.MAX_PASSWORD_LENGTH,
                  message: `Max length ${USERFIELDSCONSTS.MAX_PASSWORD_LENGTH}`,
                },
              })}
            />
          </div>
          <div className='auth-form__item'>
            {errors?.passwordEqual && (
              <span className='auth-form__error'>
                {errors?.passwordEqual.message}
              </span>
            )}

            <label htmlFor='passwordEqual'>Repeat password</label>
            <input
              type='password'
              id='passwordEqual'
              className='auth-form__input'
              placeholder='Repeat your password'
              {...register('passwordEqual', {
                required: "The passwords don't match",
                minLength: {
                  value: USERFIELDSCONSTS.MIN_PASSWORD_LENGTH,
                  message: `Min length ${USERFIELDSCONSTS.MIN_PASSWORD_LENGTH}`,
                },
                maxLength: {
                  value: USERFIELDSCONSTS.MAX_PASSWORD_LENGTH,
                  message: `Max length ${USERFIELDSCONSTS.MAX_PASSWORD_LENGTH}`,
                },
                validate: (val) => {
                  if (watch('password') !== val) {
                    return "The passwords don't match"
                  }
                },
              })}
            />
          </div>
          <button
            onClick={handleSubmit(myHandleSubmit)}
            className={classNames('auth-form__submit', 'btn', {
              'auth-form__submit_disabled': Object.keys(errors).length !== 0,
            })}
          >
            Sign In
          </button>
        </form>
      </animated.div>
    </OverlayWrapper>
  )
}

export default Register
