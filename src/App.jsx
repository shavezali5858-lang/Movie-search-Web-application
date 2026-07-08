import React from 'react'
import Home from './components/Home'
import Moviedetail from './components/Moviedetail'
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div>


<Routes>

<Route path='/' element={<Home/>}/>
<Route path='/movie/:id' element={<Moviedetail/>}/>


</Routes>

      <Home/>
    </div>
  )
}

export default App

