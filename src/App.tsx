import { Route, Routes } from 'react-router-dom'
import './App.css'

import Layout from './components/layout'
import MainPage from './components/pages/main-page/index'
import Vocabulary from './components/pages/vocabulary/index'
import Audiocall from './components/pages/games/audiocall/index'
import Sprint from './components/pages/games/sprint/index'
import Statistics from './components/pages/statistics/index'
import About from './components/pages/about'
import NotFound from './components/pages/notfound/index'
import GemeDescr from './components/pages/game-desc'

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path='vocabulary' element={<Vocabulary />} />
          <Route path='games' element={<GemeDescr />} />
          <Route path='audiocall' element={<Audiocall />} />
          <Route path='sprint' element={<Sprint />} />
          <Route path='statistics' element={<Statistics />} />
          <Route path='about' element={<About />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
