import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useAppSelector } from '@/hooks/useAppSelector'
import { getAuth } from '@/redux/slices/AuthSlice/selectors/authSelectors'
import { updatePatch } from '@/redux/slices/AuthSlice/thunks'
import { unwrapResult } from '@reduxjs/toolkit'
import React from 'react'
import { toast } from 'react-toastify'

function usePatchUpdate(props: { patch: string }) {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector(getAuth)

  const handleUpdatePatch = async () => {
    if (user && user.patch !== props.patch) {
      try {
        const resultAction = await dispatch(updatePatch({ patch: props.patch }))

        if (updatePatch.fulfilled.match(resultAction)) {
          const resData = unwrapResult(resultAction)

          if (resData.success) {
            toast.success('Patch successfully updated', {
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
      } catch (e) {
        toast.error('Failed to update patch', {
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
  return { handleUpdatePatch }
}

export default usePatchUpdate
