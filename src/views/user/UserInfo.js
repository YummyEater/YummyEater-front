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
  const handleClick = () => { navigate(`/userinfo/edit`) }

  const InfoItem = (props) => {
    return (
      <div className='flex flex-row flex-wrap justify-between items-center max-[450px]:max-w-[300px] max-[450px]:w-full max-[450px]:gap-[5px]'>
        <span className='text-[16px] font-normal max-[450px]:w-full'>{props.title}</span>
        <p className='w-[300px] text-[16px] font-normal break-all'>{props.data}</p>
      </div>
    )
  }

  return (
    <div className='w-[450px] max-[450px]:w-screen max-[450px]:px-[25px] container1'>
      <ContentHeader title='회원정보' />
      <div className='flex flex-col justify-center gap-[15px] max-[450px]:items-center'>
        <InfoItem title='이메일' data={userinfo.email} />
        <InfoItem title='닉네임' data={userinfo.userName} />
        <InfoItem title='가입일자' data={FormatDate(userinfo.createdAt, 2)} />
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