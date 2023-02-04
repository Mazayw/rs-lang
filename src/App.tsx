import { useContext, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './components/layout'
import { IWord } from './components/types/interface'
import About from './pages/about'
import Description from './pages/games/audiocall/description'
import AudioGameMain from './pages/games/audiocall/game'
import Sprint from './pages/games/sprint'
import MainPage from './pages/main-page'
import NotFound from './pages/notfound'
import Statistics from './pages/statistics'
import Vocabulary from './pages/vocabulary'
import { Context } from './index'

function App() {
  const [isModalActive, setModalActive] = useState(false)
  const { user } = useContext(Context)
  const [authType, setAuthType] = useState('')
  const [check20WordsInPage, setCheck20WordsInPage] = useState([] as IWord[])

  console.log(user)

  return (
    <div className='App'>
      <Routes>
        <Route
          path='/'
          element={
            <Layout
              isModalActive={isModalActive}
              setModalActive={setModalActive}
              authType={authType}
              setAuthType={setAuthType}
            />
          }
        >
          <Route
            index
            element={<MainPage setActive={setModalActive} setAuthType={setAuthType} />}
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
          <Route path='statistics' element={<Statistics />} />
          <Route path='about' element={<About />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
