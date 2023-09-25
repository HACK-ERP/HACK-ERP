import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './views/Login/Login'
import { Home } from '@mui/icons-material'


function App() {


  return (
    <div className='App'>
     
     
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/Home' element={<Home/>} />

      </Routes>

    </div>
  )
}

export default App
