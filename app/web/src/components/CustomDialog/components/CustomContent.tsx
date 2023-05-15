import { useDialog } from '@/hooks'
import { Typography } from '@mui/material'
import React from 'react'

import ValidateForm from './ValidateForm'

export default function CustomContent() {
  const { dialogType } = useDialog()
  switch (dialogType) {
    case 'updateProduct':
      return <ValidateForm />
    case 'createProduct':
      return <Typography p={4}>Not Implemented</Typography>
    default:
      return null
  }
}
