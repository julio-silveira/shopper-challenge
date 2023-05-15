import { DialogType } from '@/types/DialogType'
import { Dispatch, SetStateAction, createContext } from 'react'

export type DialogContextData = {
  isOpen: boolean
  validating: boolean
  dialogType: DialogType
  handleOpenDialog: (form: DialogType) => void
  handleCloseDialog: () => void
  setValidating: Dispatch<SetStateAction<boolean>>
}
const DialogContext = createContext({} as DialogContextData)

export default DialogContext
