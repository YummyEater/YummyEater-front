import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { AppContent, AppHeader1, AppHeader2, AppFooter } from '../components/index'
import { checkLogged } from '../service/ApiService';
import { CircularProgress } from '@mui/material'

const DefaultLayout = ({ type, component: Component }) => {
  const accessToken = localStorage.getItem("ACCESS_TOKEN");
  const [logged, setLogged] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken && accessToken !== null && accessToken !== 'null') {
      const check = checkLogged(navigate);
      setLogged(check);
    } else {
      setLogged(false);
    }
  }, [accessToken, navigate])

  if (logged !== undefined) {
    return (
      <div className="bg-white flex flex-col min-h-screen" >
        {
          type === 1 ? <AppHeader2 /> : <AppHeader1 logged={logged} />
        }
        <div className="body flex grow justify-center">
          {
            type === 1 ? <AppContent logged={logged} component={Component} /> : <AppContent logged={logged} />
          }
        </div>
        <AppFooter />
      </div>
    )
  } else {
    return (
      <div className="body flex grow justify-center">
        <div className='flex w-[800px] pt-[50px] justify-center'>
          <CircularProgress className='text-primary-orange' />
        </div>
      </div>
    )
  }
}

export default DefaultLayout