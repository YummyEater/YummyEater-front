import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { CircularProgress } from '@mui/material'

const OauthSignIn = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const date = new Date();
    const back = localStorage.getItem("BACK_TO");
    localStorage.removeItem("BACK_TO");
    localStorage.setItem("ACCESS_TOKEN", searchParams.get("accessToken"));
    localStorage.setItem("REFRESH_TOKEN", searchParams.get("refreshToken"));
    localStorage.setItem("SAVED_TIME", date.getTime());
    navigate(back);
  })

  return (
    <div className='flex w-[800px] pt-[50px] justify-center'>
      <CircularProgress className='text-primary-orange' />
    </div>
  )
}

export default OauthSignIn