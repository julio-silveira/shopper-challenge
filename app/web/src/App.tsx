import './App.css'
import { Container, ThemeProvider } from '@mui/material'
import { QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import { RouterProvider } from 'react-router-dom'

import { CustomDialog, CustomSnackBar, NavBar } from './components'
import AppProviders from './providers'
import router from './router/router'
import { queryClient } from './services/queryClient'
import theme from './theme/theme'

function App() {
  return (
    <Container>
      <AppProviders>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <NavBar />
            <RouterProvider router={router} />
            <CustomDialog />
            <CustomSnackBar />
          </ThemeProvider>
        </QueryClientProvider>
      </AppProviders>
    </Container>
  )
}

export default App
