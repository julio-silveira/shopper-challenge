import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button, Container } from '@mui/material'
import { RouterProvider } from 'react-router-dom'
import router from './router/router'

function App() {
  const [count, setCount] = useState(0)

  return (
   <Container>
      <RouterProvider router={router} />
   </Container>
  )
}

export default App
