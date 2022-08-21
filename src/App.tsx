import './App.css'
import Auth from './components/authorization'
import Footer from './components/footer'
import Header from './components/header'
import MainPage from './components/pages/main-page/index'
import { useState } from 'react'

function App() {
  const [isModalActive, setModalActive] = useState(false)

  return (
    <div className='App'>
      <Auth active={isModalActive} setActive={setModalActive} />
      <Header setActive={setModalActive} />
      <MainPage />
      <Footer />
    </div>
  )
}

export default App
