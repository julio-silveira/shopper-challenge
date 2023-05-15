import { useDialog } from '@/hooks'
import { Dialog } from '@mui/material'
import React from 'react'

import CustomContent from './components/CustomContent'

function CustomDialog() {
  const { isOpen, handleCloseDialog } = useDialog()

  return (
    <Dialog
      sx={{ minWidth: '200px' }}
      open={isOpen}
      onClose={handleCloseDialog}
    >
      <CustomContent />
    </Dialog>
  )
}

export default CustomDialog
