import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import 'core-js'

import {BrowserRouter,Route, Routes} from 'react-router-dom'


import App from './App'
import store from './store'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
    <App />
    <ToastContainer />
    </BrowserRouter>
  </Provider>,
)
