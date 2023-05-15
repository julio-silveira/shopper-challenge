import { Dispatch, SetStateAction, createContext } from 'react'
import { DialogType } from '@/types/DialogType'


export type DialogContextData = {
  isOpen: boolean
  validating: boolean
  dialogType: DialogType
  handleOpenDialog: (form: DialogType) => void
  handleCloseDialog: () => void
  setValidating:  Dispatch<SetStateAction<boolean>>
}
const DialogContext = createContext({} as DialogContextData)

export default DialogContext
