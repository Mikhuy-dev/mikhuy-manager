import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "./MontserratFont.css"
import "./Exo2Font.css"
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { AxiosInterceptor } from './adapters/http/axiosInterceptor.ts'

AxiosInterceptor();
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>

  </StrictMode>,
)
