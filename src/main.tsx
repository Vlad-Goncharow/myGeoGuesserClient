import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from '@/redux'
import { router } from './config/Route'
import WsProvider from './providers/WsProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <WsProvider>
        <RouterProvider router={router} />
      </WsProvider>
    </Provider>
  </StrictMode>
)
