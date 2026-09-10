import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./styles/index.css"
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
     <BrowserRouter basename={import.meta.env.BASE_URL}>
       <App />
     </BrowserRouter>
    </Provider> 

  </StrictMode>,
 
)
