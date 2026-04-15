import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const isEmbedMode = new URLSearchParams(window.location.search).get('embed') === '1'
const isWidgetMode = new URLSearchParams(window.location.search).get('widget') === 'true'
const isIframe = (() => {
  try {
    return window.self !== window.top
  } catch {
    return true
  }
})()
const isFramedMode = isEmbedMode || isWidgetMode || isIframe
document.documentElement.classList.toggle('embed-mode', isFramedMode)
document.body.classList.toggle('embed-mode', isFramedMode)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
