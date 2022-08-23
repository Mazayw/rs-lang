import './App.css'
import Auth from './components/authorization'
import Footer from './components/footer'
import Header from './components/header'
import MainPage from './components/pages/main-page/index'
import { useState } from 'react'

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
      <Header setActive={setModalActive} setAuthType={setAuthType} />
      <MainPage setActive={setModalActive} setAuthType={setAuthType} />
      <Footer />
    </div>
  )
}

export default App
