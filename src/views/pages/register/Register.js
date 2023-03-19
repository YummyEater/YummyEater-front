import React, { useEffect, useState, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { call } from 'src/service/ApiService'

import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CCollapse,
  CContainer,
  CForm,
  CFormInput,
  CFormLabel,
  CRow,
} from '@coreui/react'

const Register = () => {
  // 이메일, 비밀번호 정규식
  const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
  const passwordRegEx = /^[A-Za-z0-9]{8,20}$/

  // 이메일 형식 확인
  const [emailFormat, setEmailFormat] = useState({ 'entered': false, 'formatted': false })
  const handleEmailEnter = (e) => {
    if (emailFormat.entered === false) {
      setEmailFormat({ 'entered': true, 'formatted': false })
    } else if (emailRegEx.test(e.target.value)) {
      setEmailFormat({ 'entered': true, 'formatted': true })
    } else {
      setEmailFormat({ 'entered': true, 'formatted': false })
    }
  }

  // 이메일 인증코드 발송요청
  const emailRef = useRef(null);
  const [sent, setSent] = useState(false);
  const handleSend = (e) => {
    e.preventDefault()
    if (emailFormat.entered && emailFormat.formatted) {
      // console.log(emailRef.current.value);
      const req = { "email": emailRef.current.value }
      //setSent(true);
       call(`/api/user/join/sendVerificationEmail`, "POST", req)
         .then(
           (response) => {
             console.log(response);
             setSent(true);
           }
         )
    }
  }

  // 인증코드 확인
  const verCodeRef = useRef(null);
  const [verifyCode, setVerifyCode] = useState({ 'entered': false, 'verified': false });
  const handleVerify = (e) => {
    e.preventDefault()
    if (verCodeRef.current.value !== '') {
      const req = { "code": verCodeRef.current.value }
      setVerifyCode({ 'entered': true, 'verified': true })
      // call(`/api/user/join/verifyEmail`, "POST", req)
      //   .then(
      //     (response) => {
      //       console.log(response);
      //       //setVerifyCode({ 'entered': true, 'verified': false })
      //       //setVerifyCode({ 'entered': true, 'verified': true })
      //     }
      //   )
    }
  }

  // 닉네임 중복 확인
  const usrnameRef = useRef(null);
  const [usrname, setUsrname] = useState({ 'entered': false, 'unique': false });
  const handleUsrname = (e) => {
    e.preventDefault()
    if (usrnameRef.current.value !== '') {
      const apiURL = `/api/user/join/isDuplicateUserName?userName=${usrnameRef.current.value}`
      setUsrname({ 'entered': true, 'unique': true })
      // call(apiURL, "GET", null)
      //   .then(
      //     (response) => {
      //       console.log(response);
      //       //setUsrname({ 'entered': true, 'unique': false })
      //       //setUsrname({ 'entered': true, 'unique': true })
      //     }
      //   )
    }
  }

  // 비밀번호 일치
  const pwRef1 = useRef(null);
  const pwRef2 = useRef(null);
  const [pwMatch, setPwMatch] = useState({ 'entered': false, 'matched': false });
  const handlePw = (e) => {
    if (pwRef2.current.value !== '') {
      if (pwRef1.current.value === pwRef2.current.value) {
        setPwMatch({ 'entered': true, 'matched': true });
      } else {
        setPwMatch({ 'entered': true, 'matched': false });
      }
    }

  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCard className="p-4">
              <CCardBody className="p-5">
                <CForm>
                  <h1 className='mb-5'>회원가입</h1>
                  {/* <p className="text-medium-emphasis mb-4">__에서 사용할 계정 생성</p> */}
                  <CRow>
                    <CFormLabel htmlFor='inputEmail' className="col-sm-2 col-form-label flex-wrap fw-bold">이메일 주소</CFormLabel>
                    <CCol>
                      <CFormInput
                        placeholder="user@example.com" autoComplete="email" id="inputEmail"
                        onChange={handleEmailEnter} ref={emailRef} required />
                    </CCol>
                    {/* <CCol className='col-auto'>
                      <CButton sm={3}>인증코드 전송</CButton>
                    </CCol> */}
                    <CCol sm={3}>
                      <div className='d-grid'>
                        <CButton onClick={handleSend}
                          color={sent ? 'danger' : 'secondary'}
                          variant={sent ? 'outline' : null}
                          disabled={(emailFormat.entered && emailFormat.formatted) ? false : true}>
                          {sent ? '재전송' : '인증코드 전송'}
                        </CButton>
                      </div>
                    </CCol>
                  </CRow>
                  {/* <CCollapse visible={!(!(emailFormat.entered) || emailFormat.formatted)}> */}
                  <CCollapse visible={emailFormat.entered && !(emailFormat.formatted)}>
                    <CRow>
                      <CCol sm={2}></CCol>
                      <CCol><div className='pt-1 ps-1 fw-light text-danger'>이메일 형식이 올바르지 않습니다.</div></CCol>
                    </CRow>
                  </CCollapse>
                  <CCollapse visible={sent} className='mt-2'>
                    <div className='bg-light py-3 px-4'>
                      <div className='mb-2'>입력한 이메일로 전송된 인증코드를 입력해주세요.</div>
                      <CRow>
                        <CCol>
                          <CFormInput placeholder="인증코드 8자리 입력" id="inputVerifyCode" ref={verCodeRef} required />
                        </CCol>
                        <CCol className='col-auto'>
                          <CButton className="px-4" color="secondary" onClick={handleVerify}>확인</CButton>
                        </CCol>
                      </CRow>
                      <CCollapse visible={verifyCode.entered}>
                        <CRow>
                          <CCol>
                            {
                              verifyCode.verified
                                ? <div className='pt-1 ps-1 fw-light text-success'>인증되었습니다.</div>
                                : <div className='pt-1 ps-1 fw-light text-danger'>인증코드를 다시 확인해주세요.</div>
                            }
                          </CCol>
                        </CRow>
                      </CCollapse>
                    </div>
                  </CCollapse>
                  <CRow className='mt-3'>
                    <CFormLabel htmlFor='inputUsername' className="col-sm-2 col-form-label flex-wrap fw-bold">닉네임</CFormLabel>
                    <CCol className='d-flex'>
                      <CFormInput type="text" placeholder="닉네임 입력" id="inputUsername" ref={usrnameRef} required />
                    </CCol>
                    <CCol sm={3}>
                      <div className='d-grid'><CButton color="secondary" onClick={handleUsrname}>중복 확인</CButton></div>
                    </CCol>
                  </CRow>
                  <CCollapse visible={usrname.entered}>
                    <CRow>
                      <CCol sm={2}></CCol>
                      <CCol>
                        {
                          usrname.unique
                            ? <div className='pt-1 ps-1 fw-light text-success'>사용 가능한 닉네임입니다.</div>
                            : <div className='pt-1 ps-1 fw-light text-danger'>이미 사용중인 닉네임입니다.</div>
                        }
                      </CCol>
                    </CRow>
                  </CCollapse>
                  <CRow className='mt-3'>
                    <CFormLabel htmlFor='inputPassword' className="col-sm-2 col-form-label flex-wrap fw-bold">비밀번호</CFormLabel>
                    <CCol className='d-flex'>
                      <CFormInput type="password" placeholder="비밀번호 입력" autoComplete="new-password" id="inputPassword" ref={pwRef1} required />
                    </CCol>
                  </CRow>
                  <CRow className='mt-3'>
                    <CFormLabel htmlFor='inputPasswordVerify' className="col-sm-2 col-form-label flex-wrap fw-bold">비밀번호 확인</CFormLabel>
                    <CCol className='d-flex'>
                      <CFormInput
                        type="password" placeholder="비밀번호 재입력" autoComplete="new-password"
                        onChange={handlePw} id="inputPasswordVerify" ref={pwRef2} required />
                    </CCol>
                  </CRow>
                  <CCollapse visible={pwMatch.entered && !(pwMatch.matched)}>
                    <CRow>
                      <CCol sm={2}></CCol>
                      <CCol><div className='pt-1 ps-1 fw-light text-danger'>비밀번호가 일치하지 않습니다.</div></CCol>
                    </CRow>
                  </CCollapse>
                  <CRow className="mt-5 justify-content-center">
                    <CCol md={7}>
                      <div className='d-grid'>
                        <CButton color="primary" type='submit'
                          disabled={
                            verifyCode.verified && usrname.unique && pwMatch.matched
                              ? false : true
                          } >
                          회원가입
                        </CButton>
                      </div>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
