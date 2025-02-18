import Loader from '@/Components/Loader/Loader'
import PlateBtn from '@/Components/PlateBtn/PlateBtn'
import { USERFIELDSCONSTS } from '@/config/constants'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useAppSelector } from '@/hooks/useAppSelector'
import { getAuth } from '@/redux/slices/AuthSlice/selectors/authSelectors'
import { TemporaryUserActions } from '@/redux/slices/TemporaryUserSlice/slice/TemporaryUserSlice'
import classNames from 'classnames'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import s from './JoinLobby.module.scss'

function JoinLobby() {
  const { lobbyId } = useParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { user, isLoading, isUserLoaded } = useAppSelector(getAuth)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<{ name: string }>({
    mode: 'onChange',
  })

  const inputValue = watch('name', '')

  const joinRoom = () => {
    const shortId = 'temp-' + uuidv4().split('-')[0]

    dispatch(
      TemporaryUserActions.setUser({
        id: shortId,
        nickname: inputValue,
      })
    )
    navigate(`/online-lobby/${lobbyId}`)
  }

  if ((!isLoading && !isUserLoaded) || isLoading) {
    return <Loader />
  }

  if (user && isUserLoaded) {
    navigate(`/online-lobby/${lobbyId}`)
    return null
  }

  return (
    <div className={s.page}>
      <div className={s.wrapper}>
        <h1 className={s.title}>You're invited to a GeoGuessr lobby!</h1>

        <form onSubmit={handleSubmit(joinRoom)}>
          <div className={s.input}>
            <label htmlFor='name'>Your name</label>
            <input
              type='text'
              id='name'
              placeholder='Your name'
              {...register('name', {
                required: 'Required field',
                minLength: {
                  value: USERFIELDSCONSTS.MIN_NICKNAME_LENGTH,
                  message: `Min length nickname ${USERFIELDSCONSTS.MIN_NICKNAME_LENGTH}`,
                },
                maxLength: {
                  value: USERFIELDSCONSTS.MAX_NICKNAME_LENGTH,
                  message: `Max length nickname ${USERFIELDSCONSTS.MAX_NICKNAME_LENGTH}`,
                },
              })}
            />
            {errors.name && (
              <span className={s.error}>{errors.name.message}</span>
            )}
          </div>

          <PlateBtn
            handleClick={handleSubmit(joinRoom)}
            plate='JR'
            text='Join'
            url={null}
            className={classNames(s.btn, {
              disable: !inputValue || inputValue.length < 3,
            })}
          />
        </form>
      </div>
    </div>
  )
}

export default JoinLobby
