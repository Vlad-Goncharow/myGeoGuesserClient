import { useAppDispatch } from '@/hooks/useAppDispatch'
import { fetchLogin } from '@/redux/slices/AuthSlice/thunks'
import {
  AuthLoginError,
  AuthResponse,
  FormLogin,
} from '@/redux/slices/AuthSlice/types'
import { unwrapResult } from '@reduxjs/toolkit'
import React from 'react'

function UseLogin() {
  const dispatch = useAppDispatch()

  const [isSuccess, setIsSuccess] = React.useState<boolean>(false)
  const [error, setError] = React.useState<AuthLoginError>()
  const [data, setData] = React.useState<AuthResponse | null>(null)

  const loginSubmit = async (data: FormLogin) => {
    try {
      const resultAction = await dispatch(fetchLogin(data))
      if (fetchLogin.fulfilled.match(resultAction)) {
        const data = unwrapResult(resultAction)
        setIsSuccess(true)
        setData(data)
      } else {
        const myError = resultAction.payload as AuthLoginError
        setError({ param: myError.param, message: myError.message })
        setIsSuccess(false)
      }
    } catch (e) {
      setIsSuccess(false)
    }
  }

  return { loginSubmit, error, isSuccess, data }
}

export default UseLogin
