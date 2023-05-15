import React from 'react'
import { Button, CircularProgress, SxProps } from '@mui/material'

type ButtonColor =
  | 'success'
  | 'info'
  | 'warning'
  | 'error'
  | 'inherit'
  | 'primary'
  | 'secondary'
  | undefined

type ButtonVariant = 'text' | 'outlined' | 'contained' | undefined

type Props = {
  content: string
  loading: boolean
  loadingColor?: ButtonColor
  color?: ButtonColor
  variant?: ButtonVariant
  fullWidth?: boolean
  type?: 'button' | 'reset' | 'submit' | undefined
  size?: 'small' | 'medium' | 'large' | undefined
  sx?: SxProps
  onClick?: VoidFunction
}

export default function LoadingButton({
  content,
  loading,
  sx,
  onClick,
  loadingColor = 'primary',
  color = 'primary',
  variant = 'contained',
  fullWidth = false,
  type = 'button',
  size = 'medium'
}: Props) {
  return (
    <Button
      fullWidth={fullWidth}
      variant={variant}
      color={color}
      disabled={loading}
      type={type}
      size={size}
      sx={{ ...sx }}
      onClick={onClick}
    >
      {loading ? <CircularProgress color={loadingColor} size={30} /> : content}
    </Button>
  )
}
