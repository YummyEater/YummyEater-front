import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signin } from '../../../service/ApiService';

import { TextField, Divider, Button, ThemeProvider } from '@mui/material';
import { loginInputTheme, submitButtonTheme, loginTextButtonTheme } from '../../../themes';

import { AppHeader2, ContentHeader, GoogleLogin } from '../../../components'

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
    <div>
      {/* <div className="flex flex-col w-screen min-vh-100 bg-white"> */}
      <div className='wrapper d-flex flex-column min-vh-100 bg-light'>
        <AppHeader2 />
        <div className="body flex-grow-1 flex justify-center ">
          <div className='w-[700px] max-[700px]:max-w-[700px] max-[700px]:w-screen container1 px-[25px]'>
            <ContentHeader title='로그인' />
            <div className='flex flex-col justify-center items-center'>
              <form className='flex flex-col justify-center items-center w-[550px] max-[700px]:max-w-[550px] max-[700px]:w-full' 
                onSubmit={handleSubmit} id='login-form'>
                <div className='flex flex-row flex-wrap justify-between items-center w-[550px] max-[700px]:max-w-[400px] max-[700px]:w-full max-[700px]:gap-[5px]'>
                  <span className='text-[16px] font-normal max-w-[400px] max-[550px]:w-full'>이메일</span>
                  <ThemeProvider theme={loginInputTheme}>
                    <TextField variant="filled" placeholder='user@example.com' autoComplete='email' name='inputEmail' id='inputEmail' required />
                  </ThemeProvider>
                </div>
                <div className='flex flex-row flex-wrap justify-between items-center w-[550px] max-[700px]:max-w-[400px] max-[700px]:w-full max-[700px]:gap-[5px] pt-[15px]'>
                  <span className='text-[16px] font-normal max-w-[400px] max-[550px]:w-full'>비밀번호</span>
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
              <div className='pt-[30px] flex justify-center'><GoogleLogin /></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login