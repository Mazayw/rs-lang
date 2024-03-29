import { Route, Routes } from 'react-router-dom'
import './App.css'

import Layout from './components/layout'
import MainPage from './components/pages/main-page/index'
import Vocabulary from './components/pages/vocabulary/index'
import Sprint from './components/pages/games/sprint/index'
import Statistics from './components/pages/statistics/index'
import About from './components/pages/about'
import NotFound from './components/pages/notfound/index'
import { useState } from 'react'
import { IWord } from './components/types/interface'
import AudioGameMain from './components/pages/games/audiocall/game/index'
import Description from './components/pages/games/audiocall/description/index'

function App() {
  const [isModalActive, setModalActive] = useState(false)
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [authType, setAuthType] = useState('')
  const [check20WordsInPage, setCheck20WordsInPage] = useState([] as IWord[])

  return (
    <div className='App'>
      <Routes>
        <Route
          path='/'
          element={
            <Layout
              isModalActive={isModalActive}
              setModalActive={setModalActive}
              setIsAuthorized={setIsAuthorized}
              authType={authType}
              setAuthType={setAuthType}
              isAuthorized={isAuthorized}
            />
          }
        >
          <Route
            index
            element={
              <MainPage
                setIsAuthorized={setIsAuthorized}
                isAuthorized={isAuthorized}
                setActive={setModalActive}
                setAuthType={setAuthType}
              />
            }
          />
          <Route path='audiocall' element={<Description />} />
          <Route path='audiocall/:group/:page' element={<AudioGameMain />} />
          <Route path='sprint/' element={<Sprint />} />
          <Route
            path='vocabulary'
            element={
              <Vocabulary
                check20WordsInPage={check20WordsInPage}
                setCheck20WordsInPage={setCheck20WordsInPage}
              />
            }
          />
          <Route
            path='statistics'
            element={<Statistics isAuthorized={isAuthorized} setIsAuthorized={setIsAuthorized} />}
          />
          <Route path='about' element={<About />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
