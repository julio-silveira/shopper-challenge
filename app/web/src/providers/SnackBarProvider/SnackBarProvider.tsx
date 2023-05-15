import React, { ReactNode, useState } from 'react'
import { SnackBarContext } from '@/context'
import { SnackBar } from '@/context/SnackBarContext/SnackBarContext'
import { AlertColor } from '@mui/material'


interface ProviderProps {
  children: ReactNode
}

export function SnackBarProvider({ children }: ProviderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [color, setColor] = useState<AlertColor>('success')


  const handleOpenSnackBar = ({ message, color = 'error' }: SnackBar) => {
    setColor(color)
    setMessage(message)
    setIsOpen(true)
  }
  const handleCloseSnackBar = () => setIsOpen(false)

  return (
    <SnackBarContext.Provider
      value={{
        isOpen,
        handleOpenSnackBar,
        handleCloseSnackBar,
        message,
        color
      }}
    >
      {children}
    </SnackBarContext.Provider>
  )
}

export default SnackBarProvider
