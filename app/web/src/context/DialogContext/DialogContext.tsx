import { DialogType } from '@/types/DialogType'
import { createContext } from 'react'


export type DialogContextData = {
  isOpen: boolean
  handleOpenDialog: (form: DialogType) => void
  handleCloseDialog: () => void
  dialogType: DialogType
}
const DialogContext = createContext({} as DialogContextData)

export default DialogContext
