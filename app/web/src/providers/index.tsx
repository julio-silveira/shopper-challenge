import React, { ReactNode } from 'react'

import { DialogProvider } from './DialogProvider'
import { SnackBarProvider } from './SnackBarProvider'

interface ProviderProps {
  children: ReactNode
}

export default function AppProviders({ children }: ProviderProps) {
  return (
    <DialogProvider>
      <SnackBarProvider>{children}</SnackBarProvider>
    </DialogProvider>
  )
}
