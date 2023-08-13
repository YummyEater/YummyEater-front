import './App.css';
import React, { Component, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
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
            <Route exact path="/login" name="Login Page" element={<Login />} />
            <Route exact path="/oauth/signin" name="Oauth SignIn" element={<OauthSignIn />} />
            <Route exact path="/oauth/signup" name="Oauth SignUp" element={<OauthSignUp />} />
            <Route path="*" name="Home" element={<DefaultLayout />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    )
  }
}

export default App;
