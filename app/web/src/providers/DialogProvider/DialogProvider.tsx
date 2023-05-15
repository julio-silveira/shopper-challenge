import React, { ReactNode, useState } from 'react'
import { DialogContext } from '@/context'
import { DialogType } from '@/types/DialogType'


interface ProviderProps {
  children: ReactNode
}

export function DialogProvider({ children }: ProviderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [dialogType, setDialogType] = useState<DialogType>('updateProduct')

  const handleOpenDialog = (form: DialogType) => {
    setDialogType(form)

    setIsOpen(true)
  }
  const handleCloseDialog = () => {
    setIsOpen(false)
  }


  return (
    <DialogContext.Provider
      value={{
        isOpen,
        dialogType,
        handleOpenDialog,
        handleCloseDialog,
      }}
    >
      {children}
    </DialogContext.Provider>
  )
}

export default DialogProvider
