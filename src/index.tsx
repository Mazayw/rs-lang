import ReactDOM from 'react-dom/client'
import './index.scss'
import App from './App'
import { HashRouter } from 'react-router-dom'
import { createContext } from 'react'
import GlobalStore from './store/UserStore'
import AudioCallStore from './store/AudioCallStore'
import VocabularyStore from './store/VocabularyStore'

const contextData = {
  store: new GlobalStore(),
  audioCallStore: new AudioCallStore(),
  vocabulary: new VocabularyStore(),
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
