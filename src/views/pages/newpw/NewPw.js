import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CNavLink,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

function onLogin() {
  alert("Login button clicked");
}

const Login = () => {
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody className="p-5">
                  <CForm>
                    <h1>비밀번호 재설정</h1>
                    <p className="text-medium-emphasis mb-4">submessage</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>@</CInputGroupText>
                      <CFormInput placeholder="이메일 주소" autoComplete="email" />
                      <CButton type="button" color="secondary" variant="outline" id="button-addon2">
                        이메일 인증
                      </CButton>
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="새로운 비밀번호"
                        // autoComplete="current-password"
                      />
                    </CInputGroup>
                    <div className="mb-3 d-grid">
                      <CButton color="primary" className="px-4" type='button' onClick={onLogin}>
                        비밀번호 재설정
                      </CButton>
                    </div>
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
