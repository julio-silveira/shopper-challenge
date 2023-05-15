import React from 'react'
import { useDialog } from '@/hooks'


export default function CustomContent() {
  const { dialogType } = useDialog()
  switch (dialogType) {
    case 'updateProduct':
      return <p> update </p>
    case 'confirmation':
      return <p> confirmation </p>
    case 'createProduct':
      return <p> create product </p>
    default:
      return null
  }
}
