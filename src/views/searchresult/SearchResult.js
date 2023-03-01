import React from 'react'

import {
  CAvatar,
  CBadge,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CFormInput,
  CFormCheck,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
  CPagination,
  CPaginationItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilMagnifyingGlass,
} from '@coreui/icons'


const SearchResult = () => {
  // const typeTag = ['배달', '요리', '완제품']
  const searchedTag = ['한식', '양식', '중식', '일식', '매콤한', '달콤한']
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

  
  return (
    <>
      <CRow className="justify-content-center align-items-center">
        <CCol xs={8} className='ps-0'>
          <CCard>
            <CCardBody className='py-2'>
              <CRow className="justify-content-center align-items-center">
                <CCol className="col-auto">
                </CCol>
                <CCol className="me-auto" xs="auto">
                  {searchedTag.map((item)=> (
                    <h5 className='d-inline'><CBadge color="info" shape="rounded-pill" className='m-1 px-3 py-2 w-auto'>{item}</CBadge></h5>
                  ))}
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs={4} className='pe-0'>
          <CFormSelect aria-label="sorting">
            <option>정렬 기준</option>
            <option value="1">최신순</option>
            <option value="2">등록순</option>
            <option value="3">평점높은순</option>
            <option value="3">평점낮은순</option>
          </CFormSelect>
        </CCol>
      </CRow>
      {articleData.map((item)=> {
        return (
          <CRow className="justify-content-center align-items-center mt-3">
            <CCard>
              <CCardBody>
                <CRow className='align-items-center px-3'>
                  <CCol className="col-auto">
                    <h6 className="mb-0">
                      {item.title}
                    </h6>
                  </CCol>
                  <CCol>
                    {
                      item.tags.map((tag)=>{
                        return (
                          <CBadge color="secondary" shape="rounded-pill" className='mx-2 px-3 py-2 w-auto'>{tag}</CBadge>
                        )
                      })
                    }
                  </CCol>
                </CRow>
              </CCardBody>
            </CCard>
          </CRow>
        )
      })}

      <CPagination align="center" className='my-4'>
        <CPaginationItem aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </CPaginationItem>
        <CPaginationItem active>1</CPaginationItem>
        <CPaginationItem>2</CPaginationItem>
        <CPaginationItem>3</CPaginationItem>
        <CPaginationItem aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </CPaginationItem>
      </CPagination>
    </>
  )
}

export default SearchResult