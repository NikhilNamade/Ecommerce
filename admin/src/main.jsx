import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { routeTree } from './routing/routtree.js'
const router = createRouter({
  routeTree,
})
createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)
