import React from 'react'
import { Controller } from 'react-hook-form'
import classNames from 'classnames'
import FullUserItem from '@/Components/FullUserItem/FullUserItem'
import PlateBtn from '@/Components/PlateBtn/PlateBtn'
import s from './Avatar.module.scss'
import useAvatarForm from '../../hooks/useAvatarForm'

function Avatar() {
  const {
    control,
    handleSubmit,
    errors,
    isDirty,
    avatarPreview,
    user,
    handleResetAvatar,
    changeAvatar,
    setAvatarPreview,
  } = useAvatarForm()

  return (
    <form onSubmit={handleSubmit(changeAvatar)} className='wrapper'>
      <span className={s.info}>The picture should be 256x256</span>
      <div className={s.avatar}>
        <Controller
          name='avatar'
          control={control}
          rules={{ required: 'You must upload an image' }}
          render={({ field }) => (
            <>
              <input
                type='file'
                accept='image/*'
                onChange={(event) => {
                  const file = event.target.files?.[0]
                  if (file) {
                    field.onChange(file)
                    setAvatarPreview(URL.createObjectURL(file))
                  }
                }}
                className='hidden'
              />
              <img
                src={
                  avatarPreview === null
                    ? `${import.meta.env.VITE_SERVER_URL}/uploads${user?.avatar}`
                    : avatarPreview
                }
                className={s.avatar__preview}
                alt='Avatar Preview'
              />
            </>
          )}
        />
      </div>
      {errors.avatar && (
        <span className={s.warning}>{errors.avatar.message}</span>
      )}
      <div className={s.user}>
        {user && (
          <FullUserItem
            user={{ ...user, avatar: avatarPreview || user.avatar }}
          />
        )}
      </div>
      <div className={s.buttons}>
        <PlateBtn
          handleClick={handleResetAvatar}
          plate='RI'
          text='Reset'
          url={null}
          className={s.buttons__reset}
        />
        <PlateBtn
          handleClick={handleSubmit(changeAvatar)}
          plate='SI'
          text={'Save Image'}
          url={null}
          className={classNames(s.buttons__submit, {
            disable: !isDirty,
          })}
        />
      </div>
    </form>
  )
}

export default React.memo(Avatar)
