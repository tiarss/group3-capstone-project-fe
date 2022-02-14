import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Profile } from '../pages/Profile'
import SignIn  from  '../pages/SignIn'
import SignUp  from  '../pages/SignUp'

export const WebRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </BrowserRouter>
  )
}
