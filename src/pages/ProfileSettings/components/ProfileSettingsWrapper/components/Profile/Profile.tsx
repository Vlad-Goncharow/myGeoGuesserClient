import React from 'react'
import FullUserItem from '@/Components/FullUserItem/FullUserItem'
import PlateBtn from '@/Components/PlateBtn/PlateBtn'
import classNames from 'classnames'
import s from './Profile.module.scss'
import { USERFIELDSCONSTS } from '@/config/constants'
import useProfileForm from '../../hooks/useProfileForm'

function Profile() {
  const { register, handleSubmit, errors, isDirty, copyUser, onSubmit } =
    useProfileForm()

  return (
    <>
      <div className={s.user}>
        {copyUser && <FullUserItem user={copyUser} />}
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
        {errors.nickname && (
          <span className={s.form__error}>{errors.nickname.message}</span>
        )}

        <input
          id='nickname'
          className={s.form__input}
          placeholder='Your nickname'
          maxLength={USERFIELDSCONSTS.MAX_NICKNAME_LENGTH}
          {...register('nickname', {
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
      </form>
      <PlateBtn
        handleClick={handleSubmit(onSubmit)}
        plate='SC'
        text='Save changes'
        url={null}
        className={classNames(s.btn, {
          disable: !isDirty,
        })}
      />
    </>
  )
}

export default Profile
