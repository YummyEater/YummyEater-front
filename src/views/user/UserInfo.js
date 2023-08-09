import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getUserinfo } from '../../service/ApiService'
import { ContentHeader } from '../../components'
import { FormatDate } from '../../service/Functions'
import { submitButtonTheme } from '../../themes/index';
import { Button, ThemeProvider } from '@mui/material';

const UserInfo = () => {
  // 회원정보 받기
  const [userinfo, setUserinfo] = useState({})
  useEffect(() => {
    getUserinfo(setUserinfo);
  }, [])

  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/userinfo/edit`)
  }

  return (
    <div className='w-[450px] container1'>
      <ContentHeader title='회원정보' />
      <div className='flex flex-col justify-center gap-[15px]'>
        <div className='flex flex-row justify-between items-center'>
          <span className='text-[16px] font-normal'>이메일</span>
          <span className='w-[300px] text-[16px] font-normal'>{userinfo.email}</span>
        </div>
        <div className='flex flex-row justify-between items-center'>
          <span className='text-[16px] font-normal'>닉네임</span>
          <span className='w-[300px] text-[16px] font-normal'>{userinfo.userName}</span>
        </div>
        <div className='flex flex-row justify-between items-center'>
          <span className='text-[16px] font-normal'>가입일자</span>
          <span className='w-[300px] text-[16px] font-normal'>{FormatDate(userinfo.createdAt, 2)}</span>
        </div>
      </div>
      <div className='flex justify-center items-center pt-[50px]'>
        <ThemeProvider theme={submitButtonTheme}>
          <Button type='button' onClick={handleClick}>회원정보 변경</Button>
        </ThemeProvider>
      </div>
    </div>
  )
}

export default UserInfo;