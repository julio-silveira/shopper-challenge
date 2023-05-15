import React, { ReactNode, useState } from 'react'
import { DialogContext } from '@/context'
import { DialogType } from '@/types/DialogType'


interface ProviderProps {
  children: ReactNode
}

export function DialogProvider({ children }: ProviderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [dialogType, setDialogType] = useState<DialogType>('updateProduct')
  const [validating, setValidating] = useState(false)


  const handleOpenDialog = (form: DialogType) => {
    setDialogType(form)

    setIsOpen(true)
  }
  const handleCloseDialog = () => {
    setValidating(false)
    setIsOpen(false)
  }


  return (
    <DialogContext.Provider
      value={{
        isOpen,
        dialogType,
        validating,
        handleOpenDialog,
        handleCloseDialog,
        setValidating,
      }}
    >
      {children}
    </DialogContext.Provider>
  )
}

export default DialogProvider
