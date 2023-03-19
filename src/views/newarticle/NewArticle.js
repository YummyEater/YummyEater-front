import React, { useEffect, useState, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { call } from 'src/service/ApiService'

import {
  CBadge,
  CButton,
  CContainer,
  CCard,
  CCardBody,
  CCol,
  CImage,
  CRow,
  CFormTextarea,
  CInputGroup,
  CInputGroupText,
  CFormCheck,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilMagnifyingGlass,
  cilUser,
  cilLockLocked,
} from '@coreui/icons'

import Divider from "@material-ui/core/Divider";
import {
  Rating,
  Pagination,
  InputLabel,
  FormControl,
  Select, SelectChangeEvent,
  TextField,
  MenuItem,
  Button,
  Skeleton,
  FormGroup
} from '@mui/material'

// for tui editor
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import { fontSize } from '@mui/system'



const NewArticle = () => {
  // 태그 받기
  const [foodTag, setFoodTag] = useState([]);
  useEffect(() => {
    call("/api/tag", "GET", null)
      .then(
        response => setFoodTag(response.data.map((x) => x.name))
      )
  }, []);

  function FoodTag() {
    if (foodTag.length === 0) {
      return (
        <>
          <Skeleton variant="rounded" height={60} />
        </>
      )
    } else {
      return (
        <>
          <CCol className="d-flex gap-2 flex-wrap">
            {foodTag.map((item, index) => (
              <CFormCheck button={{ color: 'secondary', variant: 'outline', shape: "rounded-pill" }} 
                id={item} key={index} label={item} value={item}
                ></CFormCheck>
            ))}
          </CCol>

        </>
      )
    }
  }

  return (
    <>
      <CContainer className="justify-content-center mb-4">
        <CCard className="p-4">
          <CCardBody className="p-5">
            <CRow className="justify-content-center mx-2 mb-3 align-items-center">
              <CCol xs={2}>태그 선택</CCol>
              <FoodTag></FoodTag>
            </CRow>
            <CRow>
              <Editor
                previewStyle='vertical'
                height='400px'
                initialEditType='wysiwyg'
                autofocus='true'
                useCommandShortcut={false}
                plugins={[colorSyntax]}
              ></Editor>
            </CRow>

            {/* <CRow className="justify-content-center">
              <CCol className="ms-3">
                <CRow className='align-items-center mt-3' id='recipe-user'>
                  <h6 className='w-auto mb-0 fw-bold'>작성자</h6>
                </CRow>
                <CRow className='align-items-center mt-2' id='recipe-user'>
                  <h6 className='w-auto mb-0 fw-bold'>가격</h6>
                </CRow>
              </CCol>
            </CRow>
            <CRow className="justify-content-center px-2 pt-5 pb-4">
              <h6 className='fw-bold'>재료</h6>
            </CRow>
            <Divider />
            <Divider />
            <CRow className='pt-5 px-2 d-flex align-items-start' id='newReview'>
              <h6 className='d-inline w-auto mb-0 fw-bold'>리뷰 작성</h6>
              <CInputGroup className='pt-1 px-3'>
                <CFormTextarea placeholder='리뷰 입력' rows={2} className='p-3'></CFormTextarea>
                <CButton type='button' color='secondary' variant='outline' className='px-5'>등록</CButton>
              </CInputGroup>
            </CRow> */}
          </CCardBody>
        </CCard>
      </CContainer>
    </>
  )
}

export default NewArticle