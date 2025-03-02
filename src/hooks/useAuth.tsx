import React from 'react'
import { useAppDispatch } from './useAppDispatch'
import { fetchAuth } from '@/redux/slices/AuthSlice/thunks'

function useAuth() {
  const dispatch = useAppDispatch()
  const auth = async () => {
    const data = await dispatch(fetchAuth())

    if (data.payload !== undefined && 'accessToken' in data.payload) {
      window.localStorage.setItem('token', data.payload.accessToken)
    }
  }

  React.useEffect(() => {
    auth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

export default useAuth
