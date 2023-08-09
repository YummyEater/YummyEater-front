import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signin } from '../../../service/ApiService';

import { TextField, Divider, Button, ThemeProvider } from '@mui/material';
import { loginInputTheme, submitButtonTheme, loginTextButtonTheme } from '../../../themes';

import { ContentHeader, GoogleLogin } from '../../../components/index'

const Login = () => {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const email = data.get("inputEmail");
    const password = data.get("inputPassword");
    signin({ email: email, password: password }, navigate);
  }

  return (
    <div className='w-[700px] container1'>
      <ContentHeader title='로그인' />
      <div className='flex flex-col justify-center'>
        <div className='flex justify-center'>
          <form className='w-[550px]' onSubmit={handleSubmit} id='login-form'>
            <div className='flex flex-row justify-between items-center'>
              <span className='text-[16px] font-normal'>이메일</span>
              <ThemeProvider theme={loginInputTheme}>
                <TextField variant="filled" placeholder='user@example.com' autoComplete='email' name='inputEmail' id='inputEmail' required />
              </ThemeProvider>
            </div>
            <div className='flex flex-row justify-between items-center pt-[15px]'>
              <span className='text-[16px] font-normal'>비밀번호</span>
              <ThemeProvider theme={loginInputTheme}>
                <TextField variant="filled" placeholder='비밀번호 입력' autoComplete='password' name='inputPassword' id='inputPassword' type='password' required />
              </ThemeProvider>
            </div>
            <div className='flex justify-center items-center pt-[50px]'>
              <ThemeProvider theme={submitButtonTheme}>
                <Button type='submit'>로그인</Button>
              </ThemeProvider>
            </div>
          </form>
        </div>

        <div className='flex flex-row justify-center pt-[16px]'>
          <ThemeProvider theme={loginTextButtonTheme}>
            <Button component={Link} to='/newpw' className='me-[15px]'>비밀번호 찾기</Button>
            <Divider orientation='vertical' flexItem className='px-0 self-center border-1 h-[15px]' />
            <Button component={Link} to='/register' className='ms-[15px]'>회원가입</Button>
          </ThemeProvider>
        </div>
      </div>

      <div className='pt-[75px]' id='oauth-login'>
        <Divider>소셜 로그인</Divider>
        <div className='pt-[30px]'>
          <GoogleLogin />
        </div>

      </div>

    </div>
  )
}

export default Login