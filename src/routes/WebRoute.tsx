import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignIn  from  '../pages/SignIn'
import SignUp  from  '../pages/SignUp'

export const WebRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  )
}
