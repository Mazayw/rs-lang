import React from 'react'
import './App.css'
import Footer from './components/footer'
import Header from './components/header'
import MainPage from './components/pages/main-page/index'

function App() {
  return (
    <div className='App'>
      <Header />
      <MainPage />
      <Footer />
    </div>
  )
}

export default App
