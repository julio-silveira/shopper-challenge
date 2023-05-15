import './App.css'
import { Container, ThemeProvider } from '@mui/material'
import { RouterProvider } from 'react-router-dom'
import router from './router/router'
import theme from './theme/theme'
import { CustomDialog, CustomSnackBar, NavBar } from './components'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './services/queryClient'
import AppProviders from './providers'

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
