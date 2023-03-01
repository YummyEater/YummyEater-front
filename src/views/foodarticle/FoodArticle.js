import React from 'react'

import {
  CAvatar,
  CBadge,
  CButton,
  CContainer,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CImage,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CForm,
  CFormInput,
  CFormCheck,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilMagnifyingGlass,
  cilUser,
  cilLockLocked,
} from '@coreui/icons'

import Divider from "@material-ui/core/Divider";


const SearchResult = () => {
  const articleData = [
    { title: '고르곤졸라 피자', tags: ['양식', '빵'] },
    { title: '비빔밥', tags: ['한식', '매콤한', '밥'] },
    { title: '밀푀유나베', tags: ['일식', '국물류', '소고기'] },
    { title: '크렘브륄레', tags: ['양식', '달콤한', '디저트류'] },
    { title: '고르곤졸라 피자1', tags: ['양식', '빵'] },
    { title: '비빔밥1', tags: ['한식', '매콤한', '밥'] },
    { title: '밀푀유나베1', tags: ['일식', '국물류', '소고기'] },
    { title: '크렘브륄레1', tags: ['양식', '달콤한', '디저트류'] },
  ]

  const foodData = {
    FOOD_ID: 1,
    IMG_URL: "https://static.wtable.co.kr/image/production/service/recipe/246/09f21ee8-530a-4919-a30f-f2d9cac6c590.jpg",
    NAME: "밀푀유나베",
    tags: ['일식', '국물류', '소고기'],
    TYPE: '요리'
  }

  
  return (
    <>
      <CContainer className="justify-content-center">
            <CCard className="p-4">
              <CCardBody className="p-5">
                <CRow className="justify-content-center">
                    <CCol className="col-auto">
                        <CImage src={foodData.IMG_URL} width={200} height={200}/>
                    </CCol>
                    <CCol className="ms-3">
                        <CRow className="mb-2">
                            <h3 className="px-0">{foodData.NAME}</h3>
                        </CRow>
                        <CRow>
                            <CBadge color="info" className='mx-1 px-3 py-2 w-auto'>{foodData.TYPE}</CBadge>
                            {
                                foodData.tags.map((tag, index)=> (
                                    <CBadge color="secondary" className='mx-1 px-3 py-2 w-auto' key={index}>{tag}</CBadge>
                                ))
                            }
                        </CRow>
                        <CRow className='align-items-center mt-3' id='recipe-user'>
                            <h6 className='w-auto mb-0'>작성자</h6>
                            <div className='w-auto'>edenjeong</div>
                        </CRow>
                        <CRow className='align-items-center mt-2' id='recipe-user'>
                            <h6 className='w-auto mb-0'>가격</h6>
                            <div className='w-auto'>13,400원</div>
                        </CRow>
                    </CCol>
                </CRow>
                <CRow className="justify-content-center px-2 pt-5 pb-4" id="nutrient">
                    <h6>영양정보</h6>
                </CRow>
                <Divider />
                <CRow className="justify-content-center px-2 pt-4">
                    <h6>재료</h6>
                </CRow>
              </CCardBody>
            </CCard>
      </CContainer>
    </>
  )
}

export default SearchResult