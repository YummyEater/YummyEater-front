import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { AppContent, AppHeader1, AppFooter } from '../components/index'
import { checkLogged } from '../service/ApiService';

const DefaultLayout = () => {
  const accessToken = localStorage.getItem("ACCESS_TOKEN");
  const [logged, setLogged] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(`${accessToken} | ############ logged : ${logged}`);
    if (accessToken && accessToken !== null && accessToken !== 'null') {
      const check = checkLogged(navigate);
      setLogged(check);
    } else { setLogged(false); }
  },[accessToken, navigate])

  return (
    <div className="bg-white flex flex-col min-h-screen" >
      <AppHeader1 logged={logged} />
      <div className="body flex grow justify-center">
        <AppContent logged={logged} />
      </div>
      <AppFooter />
    </div>
  )
}

export default DefaultLayout