import { SnackBarContext } from '@/context'
import { useContext } from 'react'

export default function UseSnackBar() {
  const { isOpen, color, message, handleCloseSnackBar, handleOpenSnackBar } =
    useContext(SnackBarContext)

  return { isOpen, color, message, handleCloseSnackBar, handleOpenSnackBar }
}
