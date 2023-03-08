import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import {
  CAvatar,
  CBadge,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCol,
  CProgress,
  CRow,
  CFormSelect,
  CPagination,
  CPaginationItem,
} from '@coreui/react'

import { Divider } from "@material-ui/core"
import { Rating, Pagination } from '@mui/material'

const SearchResult = () => {
  // 검색결과 전달받음
  const data = useLocation();
  const [searched, setSearched] = useState(data.state);
  console.log(searched);

  // const searchedType = searched.state.sType;
  // const searchedTag = searched.state.sTags;
  // const articleData = searched.state.sResponse.content;
  // const apiURL = searched.state.sUrl;
  const searchedType = searched.sType;
  const searchedTag = searched.sTags;
  const articleData = searched.sResponse.content;
  const apiURL = searched.sUrl;

  // Pagination
  const [selectedPage, setSelectedPage] = useState({
    page: searched.sResponse.number+1,
    url: apiURL
  });
  const handleChange = (event, pg) => {
    setSelectedPage({page: pg, url:`${apiURL}&page=${pg}`});
  }

  useEffect(() => {
    console.log(selectedPage.url);
  }, [selectedPage])
  
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
                  {searchedTag.map((item, index)=> (
                    <h5 className='d-inline'><CBadge key={index} color="info" shape="rounded-pill" className='m-1 px-3 py-2 w-auto'>{item}</CBadge></h5>
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
                  <CCol className="justify-content-center align-items-center col-auto">
                    <h5 className="mb-0 d-inline">
                      {item.title}
                    </h5>
                    <div className="mx-3 mb-0 fs-6 d-inline">
                      {item.name}
                    </div>
                  </CCol>
                  <Divider orientation='vertical' flexItem className='px-0'/>
                  <CCol className="justify-content-center align-items-center col-auto">
                    <div className="mx-3 mb-0 fs-6 d-inline text-muted">
                      {item.maker}
                    </div>
                  </CCol>

                </CRow>
                <CRow className='align-items-center px-3 mt-2'>
                  <CCol className="justify-content-center align-items-center col-auto">
                    <div className="mb-0 fs-6 d-inline text-muted">
                      {item.userName}
                    </div>
                  </CCol>
                  <CCol className="d-flex justify-content-center align-items-center col-auto pe-0">
                    {
                      item.tags.map((tag, idx)=>{
                        return (
                          <CBadge color="secondary" shape="rounded-pill" className='me-2 px-3 py-1 w-auto' key={idx}>{tag}</CBadge>
                        )
                      })
                    }
                    <Rating value={item.rating} precision={0.5} size="small" readOnly className='pe-3'/>
                    <Divider orientation='vertical' flexItem className='px-0 my-1'/>
                    <div className="mb-0 fs-6 px-3 d-inline text-muted">
                      가격 {item.price}원
                    </div>
                  </CCol>
                </CRow>
              </CCardBody>
            </CCard>
          </CRow>
        )
      })}

      <Pagination count={searched.sResponse.totalPages-1} className='d-flex my-4 justify-content-center' page={selectedPage.page} onChange={handleChange}/>
    </>
  )
}

export default SearchResult