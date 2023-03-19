import React, { useEffect, useState, useRef } from 'react'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { signin } from 'src/service/ApiService'

import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CFormLabel,
  CInputGroup,
  CInputGroupText,
  CRow,
  CNavLink,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

const Login = () => {
  // const emailRef = useRef(null);
  // const pwRef = useRef(null);
  // const handleLogin = (e) => {
  //   e.preventDefault()
  //   call(`/api/user/signIn`, "POST", {"email": })
  // }

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const email = data.get("inputEmail");
    const password = data.get("inputPassword");
    console.log(email);

    signin({ email: email, password: password });
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody className="p-5">
                  <CForm onSubmit={handleSubmit}>
                    <h1 className='mb-5'>로그인</h1>
                    {/* <p className="text-medium-emphasis mb-4">Sign In to your account</p> */}
                    <CRow className='justify-content-center'>
                      <CFormLabel htmlFor='inputEmail' className="col-sm-2 col-form-label flex-wrap fw-bold">이메일</CFormLabel>
                      <CCol md={8}>
                        <CFormInput
                          placeholder="user@example.com" autoComplete="email" id="inputEmail" name="inputEmail" required />
                      </CCol>
                    </CRow>
                    <CRow className='mt-3 justify-content-center'>
                      <CFormLabel htmlFor='inputPassword' className="col-sm-2 col-form-label flex-wrap fw-bold">비밀번호</CFormLabel>
                      <CCol md={8}>
                        <CFormInput
                          placeholder="비밀번호" autoComplete="password" id="inputPassword" name="inputPassword" required />
                      </CCol>
                    </CRow>
                    {/* <CInputGroup className="mb-3">
                      <CInputGroupText>@</CInputGroupText>
                      <CFormInput placeholder="이메일 주소" autoComplete="email" />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="비밀번호"
                        autoComplete="current-password"
                      />
                    </CInputGroup> */}
                    {/* <div className="mb-3 d-grid">
                      <CButton color="primary" className="px-4" type='button' onClick={onLogin}>
                        Login
                      </CButton>
                    </div> */}
                    <CRow className="mt-5 mb-4 justify-content-center">
                      <CCol md={7}>
                        <div className='d-grid'>
                          {/* <CButton color="primary" type='button' onClick={handleLogin}> */}
                          <CButton color="primary" type='submit'>
                            로그인
                          </CButton>
                        </div>
                      </CCol>
                    </CRow>
                    <CRow className='justify-content-center'>
                      <CCol className='col-auto'>
                        <CButton component={NavLink} variant='ghost' to="/register" className="px-4 d-flex justify-content-center">
                          회원가입
                        </CButton>
                      </CCol>
                      <CCol className='col-auto'>
                        <CButton component={NavLink} variant='ghost' to="/newPw" className="px-4 d-flex justify-content-center">
                          비밀번호 재설정
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
