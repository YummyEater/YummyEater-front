import React from 'react'
import { useNavigate } from 'react-router-dom'
import { call } from '../../../service/ApiService';
import { ContentHeader } from '../../../components'
import { TextField, Button, ThemeProvider } from '@mui/material';
import { loginInputTheme, submitButtonTheme } from '../../../themes';

const NewPw = () => {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const email = data.get("inputEmail");
    call(`/api/user/sendResetPasswordLink`, "POST", { "email": email })
      .then(
        (response) => {
          if (response.errorCode === "C00000") {
            alert('이메일이 전송되었습니다.')
            navigate('/login')
          }
        }
      )
  }

  const inputwrap = 'flex flex-row flex-wrap justify-between items-center w-[550px] max-[700px]:max-w-[400px] max-[700px]:w-full max-[700px]:gap-[5px]'
  return (
    <div>
      <div className='w-[700px] max-[700px]:max-w-[700px] max-[700px]:w-screen container1 px-[25px]'>
        <div className='flex flex-col mb-[75px] items-center'>
          <ContentHeader title='비밀번호 찾기' pb='15px' />
          <span className='text-[13px] font-normal'>가입된 메일 주소로 새로운 비밀번호가 전송됩니다.</span>
        </div>
        <div className='flex flex-col justify-center items-center'>
          <form className='flex flex-col justify-center items-center max-w-[550px] w-full' onSubmit={handleSubmit} id='login-form'>
            <div className={inputwrap}>
              <span className='text-[16px] font-normal'>이메일</span>
              <ThemeProvider theme={loginInputTheme}>
                <TextField variant="filled" placeholder='user@example.com' autoComplete='email' name='inputEmail' id='inputEmail' required />
              </ThemeProvider>
            </div>
            <div className='flex justify-center items-center pt-[50px]'>
              <ThemeProvider theme={submitButtonTheme}>
                <Button type='submit'>이메일 전송</Button>
              </ThemeProvider>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default NewPw