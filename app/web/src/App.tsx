import './App.css'
import { Container, ThemeProvider } from '@mui/material'
import { RouterProvider } from 'react-router-dom'
import router from './router/router'
import theme from './theme/theme'
import { NavBar } from './components'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './services/queryClient'

function App() {

  return (
   <Container>
    <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <NavBar />
      <RouterProvider router={router} />
      </ThemeProvider>
      </QueryClientProvider>
   </Container>
  )
}

export default App
