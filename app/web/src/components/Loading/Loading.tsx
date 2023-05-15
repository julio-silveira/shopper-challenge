import MainContainer from '@/styles/MainContainer'
import { CircularProgress } from '@mui/material'
import React from 'react'

type Props = {
  color?:
    | 'primary'
    | 'inherit'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning'
}

export default function Loading({ color = 'primary' }: Props) {
  return (
    <MainContainer>
      <CircularProgress color={color} />
    </MainContainer>
  )
}
