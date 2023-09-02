import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { CircularProgress } from '@mui/material'
import { AppHeader2 } from '../../../components'

const OauthSignIn = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const date = new Date();
    localStorage.setItem("ACCESS_TOKEN", searchParams.get("accessToken"));
    localStorage.setItem("REFRESH_TOKEN", searchParams.get("refreshToken"));
    localStorage.setItem("SAVED_TIME", date.getTime());
    navigate("/");
  })

  return (
    <div className="bg-white">
      <AppHeader2 />
      <div className="body flex grow justify-center">
        <div className='flex w-[800px] pt-[50px] justify-center'>
          <CircularProgress className='text-primary-orange' />
        </div>
      </div>
    </div>
  )
}

export default OauthSignIn