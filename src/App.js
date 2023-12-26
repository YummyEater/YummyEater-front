import './App.css';
import React, { Component, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { CircularProgress } from '@mui/material'

const loading = (
  <div className="body flex grow justify-center">
    <div className='flex w-[800px] pt-[50px] justify-center'>
      <CircularProgress className='text-primary-orange' />
    </div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))
// Pages
const Login = React.lazy(() => import('./views/auth/login/Login'))
const OauthSignIn = React.lazy(() => import('./views/auth/login/OauthSignIn'))
const OauthSignUp = React.lazy(() => import('./views/auth/register/OauthSignUp'))

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Suspense fallback={loading}>
          <Routes>
            <Route exact path="/login" name="Login Page" element={<DefaultLayout type={1} component={<Login />} />} />
            <Route exact path="/oauth/signin" name="Oauth SignIn" element={<DefaultLayout type={1} component={<OauthSignIn />} />} />
            <Route exact path="/oauth/signup" name="Oauth SignUp" element={<DefaultLayout type={1} component={<OauthSignUp />} />} />
            <Route path="*" name="Home" element={<DefaultLayout />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    )

  }
}

export default App;
