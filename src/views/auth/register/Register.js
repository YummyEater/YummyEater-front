import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { register } from '../../../service/ApiService'
import { ContentHeader, UserVerifyText, PwMatchText } from '../../../components'
import { handleUsrnameChange, usrCheck, handlePw, handleSend, handleVerify } from '../../../service/Functions'
import { loginInputTheme, submitButtonTheme, verifyButtonTheme, verifyButtonTheme2 } from '../../../themes';
import { Timer } from './RegisterComponents'
import { Button, ThemeProvider, TextField, Collapse } from '@mui/material';

const Register = () => {
  // 이메일 형식 확인
  const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
  const [emailFormat, setEmailFormat] = useState({ 'entered': false, 'formatted': false })
  const handleEmailEnter = (e) => {
    const inputEmail = e.target.value
    if (emailRegEx.test(inputEmail)) {
      setEmailFormat({ 'entered': inputEmail.length !== 0, 'formatted': true })
    } else {
      setEmailFormat({ 'entered': inputEmail.length !== 0, 'formatted': false })
    }
  }

  // 이메일 인증코드 발송요청
  const [runTimer, setRunTimer] = useState(0);
  const emailRef = useRef(null);
  const [sent, setSent] = useState(false);
  const requestEmail = (e) => {
    if (emailFormat.entered && emailFormat.formatted) {
      handleSend(setSent, runTimer, setRunTimer, emailRef.current.value)
    }
  }
  // 인증코드 확인
  const verCodeRef = useRef(null);
  const [verifyCode, setVerifyCode] = useState({ 'entered': false, 'verified': false });
  const verifyCheck = (e) => {
    handleVerify(setVerifyCode, verCodeRef.current.value)
  }
  // 닉네임 확인 여부
  const [usrnameChecked, setUsrnameChecked] = useState({ 'checked': false, 'confirmed': false });
  // 닉네임 중복, 형식 확인
  const usrnameRef = useRef(null);
  const [usrname, setUsrname] = useState({ 'entered': false, 'unique': false, 'formatted': false });
  // 비밀번호 일치
  const pwRef1 = useRef(null);
  const pwRef2 = useRef(null);
  const [pwMatch, setPwMatch] = useState({ 'entered1': false, 'entered2': false, 'matched': false, 'formatted': false });
  const pwCheck = (e) => {
    handlePw(pwRef1.current.value, pwRef2.current.value, setPwMatch)
  }

  // 회원가입 요청
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const code = data.get("inputVerifyCode");
    const email = data.get("inputEmail");
    const username = data.get("field1");
    const password = data.get("inputPassword");
    register(navigate, { "code": code, "email": email, "username": username, "password": password });
  }

  const inputtitle = 'w-[150px] max-[700px]:w-full max-w-[528px] text-[16px] font-normal'
  const itemwrap = 'flex flex-row flex-wrap items-center max-[700px]:w-full max-[700px]:gap-[5px]'
  return (
    <div className='w-[680px] container1 max-[700px]:w-screen max-[700px]:px-[25px]'>
      <ContentHeader title='회원가입' />
      <div className='flex flex-col justify-center items-center'>
        <form className='flex flex-col justify-center items-center max-[700px]:max-w-[528px] max-[700px]:w-full' onSubmit={handleSubmit}>
          <div className={itemwrap + ' justify-between'}>
            <span className={inputtitle}>이메일</span>
            <div className='flex flex-col max-w-[528px] max-[700px]:w-full'>
              <div className='flex flex-row'>
                <ThemeProvider theme={loginInputTheme}>
                  <TextField variant="filled" placeholder='user@example.com' autoComplete='email' name='inputEmail' id='inputEmail'
                    onChange={handleEmailEnter} inputRef={emailRef} required className='max-[700px]:w-full max-[700px]:max-w-[400px]' />
                  <ThemeProvider theme={sent ? verifyButtonTheme2 : verifyButtonTheme}>
                    <Button type='button' onClick={requestEmail} className='ms-[16px]'>
                      {sent ? '재전송' : '인증코드 전송'}</Button>
                  </ThemeProvider>
                </ThemeProvider>
              </div>
              <Collapse in={emailFormat.entered && !(emailFormat.formatted)} timeout={0}>
                <span className='ms-[10px] text-[13px] text-danger-red'>이메일 형식이 올바르지 않습니다.</span>
              </Collapse>
            </div>
          </div>

          <Collapse in={sent} timeout={0} className='max-[700px]:max-w-[528px] w-full'>
            <div className={itemwrap + ' justify-between pt-[15px]'}>
              <span className={inputtitle + ' self-start pt-[7px]'}>인증코드</span>
              <div className='flex flex-col max-w-[528px] max-[700px]:w-full'>
                <div className='flex flex-row'>
                  <ThemeProvider theme={loginInputTheme}>
                    <TextField variant="filled" placeholder='인증코드 8자리 입력' name='inputVerifyCode' id='inputVerifyCode' inputRef={verCodeRef} required
                      className='max-[700px]:w-full max-[700px]:max-w-[400px]' />
                    <ThemeProvider theme={verifyButtonTheme}>
                      <Button type='button' onClick={verifyCheck} className='ms-[16px]'
                        disabled={verifyCode.entered && verifyCode.verified ? true : false}>확인</Button>
                    </ThemeProvider>
                  </ThemeProvider>
                </div>
                <div className='flex flex-row justify-between pt-[5px] ms-[10px] me-[138px] max-[700px]:justify-start max-[700px]:gap-[15px] max-[700px]:me-0 text-[13px]'>
                  {
                    verifyCode.entered && verifyCode.verified
                      ? <span className='text-success-green'>인증코드가 확인되었습니다.</span>
                      : <>
                        <span className='text-gray3'>이메일로 전송된 인증코드를 입력해주세요.</span>
                        <Timer run={runTimer} verified={verifyCode.verified} />
                      </>
                  }
                </div>
                <Collapse in={verifyCode.entered && !verifyCode.verified} timeout={0}>
                  <span className='ms-[10px] text-[13px] text-danger-red'>인증코드를 다시 확인해주세요.</span>
                </Collapse>
              </div>
            </div>
          </Collapse>

          <div className={itemwrap + ' pt-[15px]'}>
            <span className={inputtitle + ' self-start pt-[10px]'}>닉네임</span>
            <div className='flex flex-col gap-[5px] max-w-[528px] max-[700px]:w-full'>
              <div className='flex flex-row'>
                <input className='w-[400px] max-[700px]:w-full max-[700px]:max-w-[400px] filled' type="text" onChange={e => handleUsrnameChange(usrnameChecked, setUsrnameChecked)}
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

          <div className={itemwrap + ' self-start pt-[15px]'}>
            <span className={inputtitle + ' self-start pt-[7px]'}>비밀번호</span>
            <div className='flex flex-col gap-[5px] max-w-[528px] max-[700px]:w-full'>
              <ThemeProvider theme={loginInputTheme}>
                <TextField variant="filled" placeholder='비밀번호 입력' autoComplete="new-password" id="inputPassword" name="inputPassword" type='password'
                  onChange={pwCheck} inputRef={pwRef1} required className='max-[700px]:w-full max-[700px]:max-w-[400px]' />
              </ThemeProvider>
              <span className={!pwMatch.entered1 || pwMatch.formatted ? 'text-[13px] text-gray3 ps-[10px]' : 'text-[13px] text-danger-red ps-[10px]'}>
                8-16자 영문 대소문자, 숫자, 특수문자를 사용해 입력해주세요.</span>
            </div>
          </div>

          <div className={itemwrap + ' self-start pt-[15px]'}>
            <span className={inputtitle + ' self-start pt-[7px]'}>비밀번호 확인</span>
            <div className='flex flex-col gap-[5px] max-w-[528px] max-[700px]:w-full'>
              <ThemeProvider theme={loginInputTheme}>
                <TextField variant="filled" placeholder='비밀번호 재입력' autoComplete="new-password" id="inputPasswordVerify" name="inputPasswordVerify" type='password'
                  onChange={pwCheck} inputRef={pwRef2} required className='max-[700px]:w-full max-[700px]:max-w-[400px]' />
              </ThemeProvider>
              <PwMatchText pwMatch={pwMatch}></PwMatchText>
            </div>
          </div>

          <div className='flex justify-center items-center pt-[50px]'>
            <ThemeProvider theme={submitButtonTheme}>
              <Button type='submit' disabled={verifyCode.verified && usrnameChecked.confirmed && pwMatch.matched ? false : true} >회원가입</Button>
            </ThemeProvider>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register