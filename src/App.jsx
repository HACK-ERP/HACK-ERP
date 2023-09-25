import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './views/Login/Login'


function App() {


  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Login/>} />

      </Routes>

    </div>
  )
}

export default App
