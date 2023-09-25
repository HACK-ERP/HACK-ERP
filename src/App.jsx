import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Login from './views/Login/Login'

function App() {

  return (
    <div className='App'>
    <Navbar />

      <Routes>
        <Route path='/' element={<Login/>} />

      </Routes>

    </div>
  )
}

export default App
