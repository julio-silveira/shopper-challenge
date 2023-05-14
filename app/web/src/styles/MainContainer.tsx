import React, { ReactNode } from 'react'
import { Container } from '@mui/material'

type Props = {
  children: ReactNode
  sx?: object
}

export default function MainContainer({ children, sx }: Props) {
  return (
    <Container
      component="main"
      maxWidth="xl"
      sx={{
        pt: '10vh',
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        ...sx
      }}
    >
      {children}
    </Container>
  )
}