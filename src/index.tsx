import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import App from './App'
import { Router, HashRouter } from 'react-router-dom'
import { createBrowserHistory } from 'history'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <HashRouter>
    <App />
  </HashRouter>,
)
