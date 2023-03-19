import React, { useEffect, useState, useRef } from 'react'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { sendPWResetLink } from 'src/service/ApiService'

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
import { Stepper }  from '@mui/material'

const Login = () => {
  // 이메일 형식 확인
  const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
  const [emailFormat, setEmailFormat] = useState(false)
  const handleEmailEnter = (e) => {
    if (emailRegEx.test(e.target.value)) {
      setEmailFormat(true)
    } else {
      setEmailFormat(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const email = data.get("inputEmail");
    console.log(email);

    sendPWResetLink({ email: email });
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
                    <h1>비밀번호 재설정</h1>
                    <p className="text-medium-emphasis mb-5">등록된 이메일로 비밀번호 재설정을 위한 링크가 전달됩니다.</p>
                    <CRow className='justify-content-center'>
                      <CFormLabel htmlFor='inputEmail' className="col-sm-2 col-form-label flex-wrap fw-bold">이메일</CFormLabel>
                      <CCol md={8}>
                        <CFormInput
                          placeholder="user@example.com" autoComplete="email" id="inputEmail" 
                          onChange={handleEmailEnter} name="inputEmail" required />
                      </CCol>
                    </CRow>
                    <CRow className="mt-5 justify-content-center">
                      <CCol md={7}>
                        <div className='d-grid'>
                          {/* <CButton color="primary" type='button' onClick={handleLogin}> */}
                          <CButton color="primary" type='submit' disabled={ emailFormat ? false : true }>
                            비밀번호 재설정
                          </CButton>
                        </div>
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
