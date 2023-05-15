import React from 'react'
import { Dialog } from '@mui/material'
import { useDialog } from '@/hooks'
import CustomContent from './components/CustomContent'

function CustomDialog() {
  const { isOpen, handleCloseDialog } = useDialog()

  return (
    <Dialog
      sx={{ minWidth: '400px' }}
      open={isOpen}
      onClose={handleCloseDialog}
    >
      <CustomContent />
    </Dialog>
  )
}

export default CustomDialog
