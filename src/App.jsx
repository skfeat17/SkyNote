import { useState } from 'react'
import './App.css'
import Home from './routes/Home'
import Notes from './routes/Notes'
import View from './routes/View'
import Edit from './routes/Edit'
import CreateNote from './routes/CreateNote'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import SignUp from './routes/SignUp'
import LogIn from './routes/LogIn'
function App() {
  return (
    <>
        <BrowserRouter>
      <Routes>
        <Route path='/create' element={<CreateNote/>}></Route>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Notes />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/view" element={<View />} />
        <Route path="/edit" element={<Edit />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
