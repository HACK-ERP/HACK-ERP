import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Login from './views/Login/Login'
import { Home } from '@mui/icons-material'

function App() {

  return (
    <div className='App'>
    <Navbar />
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/Home' element={<Home/>} />
      </Routes>
    </div>
  )
}

export default App
