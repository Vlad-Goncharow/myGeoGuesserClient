import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { getAuth } from '@/redux/slices/AuthSlice/selectors/authSelectors'
import { updateNickname } from '@/redux/slices/AuthSlice/thunks'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useAppSelector } from '@/hooks/useAppSelector'
import { unwrapResult } from '@reduxjs/toolkit'

type ProfileInputs = {
  nickname: string
}

const useProfileForm = () => {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector(getAuth)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isDirty },
  } = useForm<ProfileInputs>({
    mode: 'onChange',
    defaultValues: {
      nickname: user ? user.nickname : '',
    },
  })

  const copyUser = React.useMemo(() => {
    if (user) {
      return {
        ...user,
        nickname: watch('nickname'),
      }
    }
    return null
  }, [user, watch('nickname')])

  const onSubmit: SubmitHandler<ProfileInputs> = async (data) => {
    if (user && data.nickname !== user.nickname) {
      try {
        const resultAction = await dispatch(
          updateNickname({ nickname: data.nickname })
        )
        if (updateNickname.fulfilled.match(resultAction)) {
          const resData = unwrapResult(resultAction)
          if (resData.success) {
            toast.success('Nickname successfully updated', {
              position: 'bottom-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'light',
            })
          }
        }
      } catch (e: any) {
        toast.error('Failed to update profile', {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        })
      }
    }
  }

  return {
    register,
    handleSubmit,
    errors,
    isDirty,
    copyUser,
    onSubmit,
  }
}

export default useProfileForm
