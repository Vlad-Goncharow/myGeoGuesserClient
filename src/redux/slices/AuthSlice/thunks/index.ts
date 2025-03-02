import axios from '@/axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  AuthLoginError,
  AuthRegisterError,
  AuthResponse,
  FormLogin,
  FormRegister,
} from '../types'

export const fetchAuth = createAsyncThunk('auth/fetchAuth', async () => {
  const { data } = await axios.post('/auth/refresh')
  return data
})

export const fetchRegister = createAsyncThunk<
  AuthResponse,
  FormRegister,
  { rejectValue: AuthRegisterError }
>('auth/fetchRegister', async (params: FormRegister, { rejectWithValue }) => {
  try {
    const { data } = await axios.post('/auth/register', params)
    return data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    if (!err.response) {
      throw err
    }
    return rejectWithValue(err.response.data)
  }
})

export const fetchLogin = createAsyncThunk<
  AuthResponse,
  FormLogin,
  { rejectValue: AuthLoginError }
>('auth/fetchLogin', async (params: FormLogin, { rejectWithValue }) => {
  try {
    const { data } = await axios.post('/auth/login', params)
    return data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    if (!err.response) {
      throw err
    }
    return rejectWithValue(err.response.data)
  }
})

export const fetchLogout = createAsyncThunk('auth/fetchLogout', async () => {
  const { data } = await axios.post('/auth/logout')
  localStorage.removeItem('token')
  return data
})

export const updatePatch = createAsyncThunk(
  'auth/updatePatch',
  async (params: { patch: string }) => {
    const { data } = await axios.put('/users/update-patch', params)
    return data
  }
)
export const updateNickname = createAsyncThunk(
  'auth/updateNickname',
  async (params: { nickname: string }) => {
    const { data } = await axios.put('/users/update-nickname', params)
    return data
  }
)
export const updateAvatar = createAsyncThunk(
  'auth/updateAvatar',
  async (params: { avatar: string }) => {
    const { data } = await axios.put('/users/update-avatar', params)
    return data
  }
)
