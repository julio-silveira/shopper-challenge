import './App.css'
import { Container, ThemeProvider } from '@mui/material'
import { RouterProvider } from 'react-router-dom'
import router from './router/router'
import theme from './theme/theme'
import { NavBar } from './components'

function App() {

  return (
   <Container>
    <ThemeProvider theme={theme}>
      <NavBar />
      <RouterProvider router={router} />
      </ThemeProvider>
   </Container>
  )
}

export default App
