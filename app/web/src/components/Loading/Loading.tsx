import React from 'react'
import { CircularProgress } from '@mui/material'
import MainContainer from '@/styles/MainContainer'

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
