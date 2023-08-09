// import React, { useState, useRef } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { register } from 'src/service/ApiService'

// import { CButton, CCol, CCollapse, CContainer, CForm, CFormInput, CFormLabel, CRow } from '@coreui/react'
// import { AppHeader2 } from 'src/components'
// import { handleUsrname, UserVerifyText, handlePw, PwMatchText, handleSend, handleVerify } from 'src/views/components/Common'
// import Timer from './Timer'

const Register = () => {
  // // 이메일, 비밀번호 정규식
  // const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;

  // // 이메일 형식 확인
  // const [emailFormat, setEmailFormat] = useState({ 'entered': false, 'formatted': false })
  // const handleEmailEnter = (e) => {
  //   const inputEmail = e.target.value
  //   if (emailRegEx.test(inputEmail)) {
  //     setEmailFormat({ 'entered': inputEmail.length !== 0, 'formatted': true })
  //   } else {
  //     setEmailFormat({ 'entered': inputEmail.length !== 0, 'formatted': false })
  //   }
  // }

  // // 타이머
  // const [runTimer, setRunTimer] = useState(0);

  // // 이메일 인증코드 발송요청
  // const emailRef = useRef(null);
  // const [sent, setSent] = useState(false);
  // const requestEmail = (e) => {
  //   if (emailFormat.entered && emailFormat.formatted) {
  //     handleSend(setSent, runTimer, setRunTimer, emailRef.current.value)
  //   }
  // }

  // // 인증코드 확인
  // const verCodeRef = useRef(null);
  // const [verifyCode, setVerifyCode] = useState({ 'entered': false, 'verified': false });
  // const verifyCheck = (e) => {
  //   handleVerify(setVerifyCode, verCodeRef.current.value)
  // }

  // // 닉네임 확인 여부
  // const [usrnameChecked, setUsrnameChecked] = useState({ 'checked': false, 'confirmed': false });
  // const handleUsrnameChange = (e) => {
  //   if (usrnameChecked.checked === true){
  //     setUsrnameChecked({ 'checked': false, 'confirmed': false });
  //   } 
  // }

  // // 닉네임 중복, 형식 확인
  // const usrnameRef = useRef(null);
  // const [usrname, setUsrname] = useState({ 'entered': false, 'unique': false, 'formatted': false });
  // const usrCheck = (e) => {
  //   handleUsrname(usrnameRef.current.value, setUsrname, setUsrnameChecked);
  // }

  // // 비밀번호 일치
  // const pwRef1 = useRef(null);
  // const pwRef2 = useRef(null);
  // const [pwMatch, setPwMatch] = useState({ 'entered1': false, 'entered2': false, 'matched': false, 'formatted': false });
  // const pwCheck = (e) => {
  //   handlePw(pwRef1.current.value, pwRef2.current.value, setPwMatch)
  // }

  // // 회원가입 요청
  // const navigate = useNavigate();
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const data = new FormData(e.target);
  //   const code = data.get("inputVerifyCode");
  //   const email = data.get("inputEmail");
  //   const username = data.get("inputUsername");
  //   const password = data.get("inputPassword");
  //   console.log(`${code}, ${email}, ${username}, ${password}`)
  //   register(navigate, { "code": code, "email": email, "username": username, "password": password });
  // }

  return (
    <>
    <div>
      Register
    </div>
    </>
  )
}

export default Register