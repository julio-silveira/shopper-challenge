import React from 'react'
import { useDialog } from '@/hooks'
import ValidateForm from './ValidateForm'


export default function CustomContent() {
  const { dialogType } = useDialog()
  switch (dialogType) {
    case 'updateProduct':
      return <ValidateForm />
    case 'createProduct':
      return <p> create product </p>
    default:
      return null
  }
}
