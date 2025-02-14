import React from 'react'
import { useForm } from 'react-hook-form'
import s from './CreateTempUser.module.scss'
import PlateBtn from '@/Components/PlateBtn/PlateBtn'
import { v4 as uuidv4 } from 'uuid'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { TemporaryUserActions } from '@/redux/slices/TemporaryUserSlice/slice/TemporaryUserSlice'
import classNames from 'classnames'

function CreateTempUser() {
  const dispatch = useAppDispatch()

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
                required: 'Name is required',
                minLength: {
                  value: 3,
                  message: 'Name must be at least 3 characters',
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

export default CreateTempUser
