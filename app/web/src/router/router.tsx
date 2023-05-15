import React from 'react'
import { createBrowserRouter } from 'react-router-dom'

import { Products } from '../pages'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Products />
  }
])

export default router
