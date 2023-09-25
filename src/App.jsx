import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar/Navbar'


function App() {


  return (
    <div className='App'>
    <Navbar />
      <Routes>
        <Route path='/' element={<h1>Home</h1>} />

      </Routes>

    </div>
  )
}

export default App
