'use client'

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from '@/lib/store/store'
import { ThemeProvider } from '@/components/theme-provider'
import { WebSocketProvider } from '@/lib/context/WebSocketContext'

type Props = {
  children: React.ReactNode
}

export default function Providers({ children }: Props) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <WebSocketProvider >
          { children }         
          </WebSocketProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  )
}
