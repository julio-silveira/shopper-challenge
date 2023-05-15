import { AlertColor } from '@mui/material'
import { createContext } from 'react'

export type SnackBar = {
  message: string
  color?: AlertColor
}

export type SnackBarContextType = {
  isOpen: boolean
  handleOpenSnackBar: (props: SnackBar) => void
  handleCloseSnackBar: () => void
  message: string
  color: AlertColor
}
const SnackBarContext = createContext({} as SnackBarContextType)

export default SnackBarContext
