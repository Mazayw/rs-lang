import ReactDOM from 'react-dom/client'
import './index.scss'
import App from './App'
import { HashRouter } from 'react-router-dom'
import { createContext } from 'react'
import UserStore from './store/UserStore'

const contextData = {
  user: new UserStore(),
}

export const Context = createContext(contextData)

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <Context.Provider value={contextData}>
    <HashRouter>
      <App />
    </HashRouter>
  </Context.Provider>,
)
