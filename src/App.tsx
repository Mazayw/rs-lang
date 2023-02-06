import { useState, useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Auth from './components/authorization'
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
import LoadingAnimation from './components/loadingAnimation/index'
import { observer } from 'mobx-react-lite'
import { Context } from './index'

const App = observer(() => {
  const [isModalActive, setModalActive] = useState(false)
  const [authType, setAuthType] = useState('')
  const [check20WordsInPage, setCheck20WordsInPage] = useState([] as IWord[])
  const { store } = useContext(Context)

  return (
    <div className='App'>
      <Auth active={isModalActive} setActive={setModalActive} authType={authType} />
      {store.isLoading && <LoadingAnimation />}
      <Routes>
        <Route
          path='/'
          element={<Layout setModalActive={setModalActive} setAuthType={setAuthType} />}
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
})

export default App
