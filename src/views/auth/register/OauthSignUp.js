import React, { useState, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { call } from '../../../service/ApiService'
import { AppHeader2, ContentHeader, UserVerifyText } from '../../../components'
import { handleUsrnameChange, usrCheck } from '../../../service/Functions'
import { submitButtonTheme, verifyButtonTheme } from '../../../themes';
import { Google } from '../../../assets/icons'
import { Button, ThemeProvider } from '@mui/material';

const OauthSignUp = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // 닉네임 확인 여부
  const [usrnameChecked, setUsrnameChecked] = useState({ 'checked': false, 'confirmed': false });
  // 닉네임 중복, 형식 확인
  const usrnameRef = useRef(null);
  const [usrname, setUsrname] = useState({ 'entered': false, 'unique': false, 'formatted': false });

  // 회원가입 요청
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const joinToken = searchParams.get("joinToken");
    const username = data.get("field1");

    const userDTO = { "joinToken": joinToken, "username": username }
    call("/api/user/oauth/join", "POST", userDTO)
      .then((response) => {
        if (response.errorCode === "C00000") {
          alert("성공적으로 가입되었습니다.");
          navigate('/');
        }
      }).catch((error) => {
        if (error.errorCode === "C100000") {
          alert("가입에 실패했습니다. 입력 정보를 다시 확인해주세요.");
        }
      });
  }

  const inputtitle = 'w-[150px] max-[700px]:w-full max-w-[528px] text-[16px] font-normal'
  const itemwrap = 'flex flex-row flex-wrap items-center max-[700px]:w-full max-[700px]:gap-[5px]'
  return (
    <div className="bg-white">
      <AppHeader2 />
      <div className="body flex grow justify-center">
        <div className='w-[680px] container1 max-[700px]:w-screen max-[700px]:px-[25px]'>
          <ContentHeader title='회원가입' />
          <form className='flex flex-col justify-center' onSubmit={handleSubmit}>
            <div className={itemwrap}>
              <span className={inputtitle}>이메일</span>
              <div className='flex flex-row items-center gap-[10px] max-w-[528px] max-[700px]:w-full'>
                <span className='w-[18px] h-[18px]'><Google /></span>
                <span className='text-[16px] font-normal'>{searchParams.get('email')}</span>
              </div>
            </div>
            <div className={itemwrap + ' pt-[15px]'}>
              <span className={inputtitle + ' self-start pt-[10px]'}>닉네임</span>
              <div className='flex flex-col gap-[5px] max-w-[528px] max-[700px]:w-full'>
                <div className='flex flex-row'>
                  <input className='w-[400px] filled' type="text" onChange={e => handleUsrnameChange(usrnameChecked, setUsrnameChecked)}
                    placeholder='닉네임 입력' name='field1' id='field1' ref={usrnameRef} />
                  <ThemeProvider theme={verifyButtonTheme}>
                    <Button type='button' onClick={e => usrCheck(usrnameRef, setUsrname, setUsrnameChecked)} className='ms-[16px]'>중복확인</Button>
                  </ThemeProvider>
                </div>
                <div className='flex flex-col ps-[10px]'>
                  <span className='text-[13px] text-gray3'>3자 이상의 한글, 영문, 숫자를 사용해 입력해주세요.</span>
                  <UserVerifyText usrname={usrname} usrnameChecked={usrnameChecked} />
                </div>
              </div>
            </div>
            <div className='flex justify-center items-center pt-[50px]'>
              <ThemeProvider theme={submitButtonTheme}>
                <Button type='submit' disabled={!(searchParams.get('email') !== null && usrnameChecked.confirmed)}>회원가입</Button>
              </ThemeProvider>
            </div>
          </form>
        </div>
      </div>
    </div>

  )
}

export default OauthSignUp