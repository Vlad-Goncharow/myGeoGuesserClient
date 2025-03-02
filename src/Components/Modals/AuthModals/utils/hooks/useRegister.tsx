import { useAppDispatch } from '@/hooks/useAppDispatch'
import { fetchRegister } from '@/redux/slices/AuthSlice/thunks'
import {
  AuthRegisterError,
  AuthResponse,
  FormRegister,
} from '@/redux/slices/AuthSlice/types'
import { unwrapResult } from '@reduxjs/toolkit'
import React from 'react'
import { toast } from 'react-toastify'

function useRegister() {
  const dispatch = useAppDispatch()

  const [isSuccess, setIsSuccess] = React.useState<boolean>(false)
  const [error, setError] = React.useState<AuthRegisterError>()
  const [data, setData] = React.useState<AuthResponse | null>(null)

  const registerSubmit = async (values: FormRegister) => {
    try {
      const resultAction = await dispatch(fetchRegister(values))
      if (fetchRegister.fulfilled.match(resultAction)) {
        const data = unwrapResult(resultAction)
        setIsSuccess(true)
        setData(data)
      } else {
        const myError = resultAction.payload as AuthRegisterError
        setError({ param: myError.param, message: myError.message })
        setIsSuccess(false)
      }
    } catch (e) {
      setIsSuccess(false)
      console.error(e)
      toast.error('Register error', {
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

  return { registerSubmit, error, isSuccess, data }
}

export default useRegister
