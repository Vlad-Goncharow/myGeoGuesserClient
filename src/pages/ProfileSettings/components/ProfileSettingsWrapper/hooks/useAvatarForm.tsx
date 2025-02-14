import { useState, useCallback } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { getAuth } from '@/redux/slices/AuthSlice/selectors/authSelectors'
import { updateAvatar } from '@/redux/slices/AuthSlice/thunks'
import { unwrapResult } from '@reduxjs/toolkit'
import axios from '@/axios'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useAppSelector } from '@/hooks/useAppSelector'

type AvatarTypes = {
  avatar: File | null
}

const useAvatarForm = () => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isDirty },
  } = useForm<AvatarTypes>({
    mode: 'onChange',
    defaultValues: {
      avatar: null,
    },
  })

  const dispatch = useAppDispatch()
  const { user } = useAppSelector(getAuth)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)

  const handleResetAvatar = useCallback(() => {
    if (user) {
      setValue('avatar', null)
      setAvatarPreview(null)
    }
  }, [setValue, user])

  const uploadAvatar = async (file: File) => {
    const formData = new FormData()
    formData.append('avatar', file)

    try {
      const { data } = await axios.post('/files/upload-avatar', formData)
      return data
    } catch (e: any) {
      toast.error(e.response.data.message, {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      })
      throw e
    }
  }

  const changeAvatar: SubmitHandler<AvatarTypes> = async (data) => {
    if (!data.avatar) return

    try {
      const uploadedData = await uploadAvatar(data.avatar)
      const resultAction = await dispatch(
        updateAvatar({ avatar: uploadedData.filename })
      )
      if (updateAvatar.fulfilled.match(resultAction)) {
        const resData = unwrapResult(resultAction)
        if (resData.success) {
          handleResetAvatar()
          toast.success('Avatar successfully updated', {
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
      toast.error('Failed to update avatar', {
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

  return {
    control,
    handleSubmit,
    errors,
    isDirty,
    avatarPreview,
    user,
    handleResetAvatar,
    changeAvatar,
    setAvatarPreview,
  }
}

export default useAvatarForm
