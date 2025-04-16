import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {Provider} from "react-redux"
import {BrowserRouter} from "react-router-dom"
import './index.css'
import App from './App.jsx'
import { store } from '../Redux/Store.js'
import {Toaster} from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
<Provider store={store}>
  <BrowserRouter>
  <App />
  <Toaster/>
  </BrowserRouter>

</Provider>


)
