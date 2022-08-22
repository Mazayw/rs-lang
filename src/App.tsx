import React from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Auth from './components/authorization'
import Footer from './components/footer'
import Header from './components/header'
import MainPage from './components/pages/main-page/index'
import { useState } from 'react'
import Vocabulary from './components/pages/vocabulary/index'
import Audiocall from './components/pages/games/audiocall/index'
import Sprint from './components/pages/games/sprint/index'
import Statistics from './components/pages/statistics/index'
import About from './components/pages/about'
import NotFound from './components/pages/notfound/index'

function App() {
  const [isModalActive, setModalActive] = useState(false)
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [authType, setAuthType] = useState('')

  return (
    <div className='App'>
      <Auth
        active={isModalActive}
        setActive={setModalActive}
        setIsAuthorized={setIsAuthorized}
        authType={authType}
      />

      <Routes>
        <Route path='/' element={<Header setActive={setModalActive} setAuthType={setAuthType} />}>
          <Route index element={<MainPage />} />
          <Route path='vocabulary' element={<Vocabulary />} />
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
