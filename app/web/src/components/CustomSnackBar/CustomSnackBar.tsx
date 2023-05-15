import { useSnackBar } from '@/hooks'
import { Alert, Snackbar } from '@mui/material'
import React from 'react'

export default function CustomSnackBar() {
  const { isOpen, handleCloseSnackBar, color, message } = useSnackBar()
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      open={isOpen}
      onClose={handleCloseSnackBar}
      autoHideDuration={5000}
    >
      <Alert
        onClose={handleCloseSnackBar}
        severity={color}
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  )
}
