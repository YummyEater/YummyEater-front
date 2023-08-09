import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { getUserinfo, modifyuser } from '../../service/ApiService'
import { ContentHeader, UserVerifyText, PwMatchText } from '../../components'
import { handleUsrname, handlePw } from '../../service/Functions'
import { loginInputTheme, submitButtonTheme, verifyButtonTheme } from '../../themes';
import { Button, ThemeProvider, TextField } from '@mui/material';

const UserInfo = () => {
  // 회원정보 받기
  const [userinfo, setUserinfo] = useState({})
  useEffect(() => {
    getUserinfo(setUserinfo);
  }, [])

  // 닉네임 확인 여부
  const [usrnameChecked, setUsrnameChecked] = useState({ 'checked': false, 'confirmed': false });
  const handleUsrnameChange = (e) => {
    if (usrnameChecked.checked === true) {
      setUsrnameChecked({ 'checked': false, 'confirmed': false });
    }
  }
  // 닉네임 중복 확인
  const usrnameRef = useRef(null);
  const [usrname, setUsrname] = useState({ 'entered': false, 'unique': false, 'formatted': false });
  const usrCheck = (e) => {
    if (usrnameRef.current.value !== '') {
      handleUsrname(usrnameRef.current.value, setUsrname, setUsrnameChecked);
    }
  }

    // 비밀번호 일치
  const pwRef = useRef(null);
  const pwRef1 = useRef(null);
  const pwRef2 = useRef(null);
  const [pwMatch, setPwMatch] = useState({ 'entered1': false, 'entered2': false, 'matched': false, 'formatted': false });
  const pwCheck = (e) => {
    handlePw(pwRef1.current.value, pwRef2.current.value, setPwMatch)
  }

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const password = data.get("inputPassword");
    const username = data.get("field1") === userinfo.userName ? null : data.get("field1");
    const newPassword = data.get("inputNewPw") === '' ? null : data.get("inputNewPw");
    modifyuser(navigate, { "password": password, "newUserName": username, "newPassword": newPassword });
  }

  return (
    <div className='w-[680px] container1'>
      <ContentHeader title='회원정보 변경' />
      <form className='flex flex-col justify-center' onSubmit={handleSubmit}>
        <div className='flex flex-row items-center'>
          <span className='w-[150px] text-[16px] font-normal'>이메일</span>
          <span className='text-[16px] font-normal'>{userinfo.email}</span>
        </div>

        <div className='flex flex-row items-center pt-[15px]'>
          <span className='w-[150px] text-[16px] font-normal'>닉네임</span>
          <div className='flex flex-col gap-[5px]'>
            <div className='flex flex-row'>
              <input className='w-[400px] filled' type="text" defaultValue={userinfo.userName} onChange={handleUsrnameChange}
                name='field1' id='field1' ref={usrnameRef} />
              <ThemeProvider theme={verifyButtonTheme}>
                <Button type='button' onClick={usrCheck} className='ms-[16px]'>중복확인</Button>
              </ThemeProvider>
            </div>
          </div>
        </div>
        <div className='flex flex-col ps-[160px] pt-[5px]'>
          <span className='text-[13px] text-gray3'>3자 이상의 한글, 영문, 숫자를 사용해 입력해주세요.</span>
          <UserVerifyText usrname={usrname} usrnameChecked={usrnameChecked} />
        </div>

        <div className='flex flex-row items-center pt-[15px]'>
          <div className='flex flex-row w-[150px] text-[16px] font-normal self-start pt-[5px]'>
            <span>기존 비밀번호</span>
            <span className='text-point-orange ps-[3px]'> *</span>
          </div>
          <div className='flex flex-col gap-[5px]'>
            <ThemeProvider theme={loginInputTheme}>
              <TextField variant="filled" placeholder='기존 비밀번호 입력' autoComplete='password' name='inputPassword' id='inputPassword' type='password' inputRef={pwRef} required />
            </ThemeProvider>
            <span className='text-[13px] text-gray3 ps-[10px]'>안전한 회원정보 수정을 위해 기존 비밀번호가 반드시 입력되어야 합니다.</span>
          </div>
        </div>

        <div className='flex flex-row items-center pt-[15px]'>
          <span className='flex w-[150px] text-[16px] font-normal self-start pt-[5px]'>새 비밀번호</span>
          <div className='flex flex-col gap-[5px]'>
            <ThemeProvider theme={loginInputTheme}>
              <TextField variant="filled" placeholder='새로운 비밀번호 입력' autoComplete="new-password" id="inputNewPw" name="inputNewPw" type='password'
                onChange={pwCheck} inputRef={pwRef1} />
            </ThemeProvider>
            <span className={!pwMatch.entered1 || pwMatch.formatted ? 'text-[13px] text-gray3 ps-[10px]' : 'text-[13px] text-danger-red ps-[10px]'}>
              8-16자 영문 대소문자, 숫자, 특수문자를 사용해 입력해주세요.</span>
          </div>
        </div>

        <div className='flex flex-row items-center pt-[15px]'>
          <span className='flex w-[150px] text-[16px] font-normal'>새 비밀번호 확인</span>
          <ThemeProvider theme={loginInputTheme}>
            <TextField variant="filled" placeholder='새로운 비밀번호 재입력' autoComplete="new-password" id="inputNewPwVerify" name="inputNewPwVerify" type='password'
              onChange={pwCheck} inputRef={pwRef2} />
          </ThemeProvider>
        </div>
        <div className='flex flex-col ps-[160px] pt-[5px]'>
          <PwMatchText pwMatch={pwMatch}></PwMatchText>
        </div>

        <div className='flex justify-center items-center pt-[50px]'>
          <ThemeProvider theme={submitButtonTheme}>
            <Button type='submit'>변경사항 저장</Button>
          </ThemeProvider>
        </div>
      </form>
    </div>
  )
}

export default UserInfo;