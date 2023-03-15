import React, { useEffect, useState, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { call } from 'src/service/ApiService'

import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCol,
  CProgress,
  CRow,
  CFormSelect,
} from '@coreui/react'

import { Divider } from "@material-ui/core"
import {
  Rating,
  Pagination,
  InputLabel,
  FormControl,
  Select, SelectChangeEvent,
  MenuItem
} from '@mui/material'

const SearchResult = () => {
  // 검색결과 전달받음
  const data = useLocation();
  const [searched, setSearched] = useState(data.state);
  console.log(searched);

  const searchedType = searched.sType;
  const searchedTag = searched.sTags;
  const articleData = searched.sResponse.content;
  const apiURL = searched.sUrl;

  // Sorting
  const [selectedSort, setSelectedSort] = useState({
    sorting: '',
    url: apiURL
  });
  const handleSelect = (event) => {
    let sortUrl = apiURL
    if (event.target.value !== '') {
      sortUrl = `${apiURL}&sort=${event.target.value}`
    }
    setSelectedSort({ sorting: event.target.value, url: sortUrl });
    setSelectedPage({ page: 1, url: sortUrl });
  }

  // Pagination
  const [selectedPage, setSelectedPage] = useState({
    page: searched.sResponse.number + 1,
    url: selectedSort.url
  });
  const handleChange = (event, pg) => {
    setSelectedPage({ page: pg, url: `${selectedSort.url}&page=${pg - 1}` });
  }

  const mounted1 = useRef(false);
  useEffect(() => {
    if (!mounted1.current) {
      mounted1.current = true;
    } else {
      console.log(`* ${selectedPage.url}`)
      call(selectedPage.url, "GET", null)
        .then(
          (response) => {
            setSearched({
              sResponse: response,
              sType: searchedType,
              sTags: searchedTag,
              sUrl: apiURL
            })
        })
    }
  }, [selectedPage])

  // food article 이동
  const navigate = useNavigate();
  const [foodDetail, setFoodDetail] = useState({});
  const handleClick = (e) => {
    const fdUrl = `/api/food/${e.currentTarget.id}`;
    call(fdUrl, "GET", null)
      .then(
        (response) => {
          setFoodDetail(response);
      })
  }

  const mounted2 = useRef(false);
  useEffect(() => {
    if (!mounted2.current) {
      mounted2.current = true;
    } else {
      // console.log(foodDetail);
      navigate('/foodarticle', { state: foodDetail });
    }
  }, [foodDetail]);

  return (
    <>
      <CRow className="justify-content-center align-items-center">
        <CCol xs={8} className='ps-0'>
          <CRow className="justify-content-center align-items-center">
            <CCol className="col-auto">
            </CCol>
            <CCol className="me-auto" xs="auto">
              <h5 className='d-inline'><CBadge key={searchedType} color="secondary" shape="rounded-pill" className='m-1 px-3 py-2 w-auto'>{searchedType}</CBadge></h5>
              {searchedTag.map((item, index) => (
                <h5 className='d-inline'><CBadge key={index} color="info" shape="rounded-pill" className='m-1 px-3 py-2 w-auto'>{item}</CBadge></h5>
              ))}
            </CCol>
          </CRow>
        </CCol>
        <CCol xs={4} className='pe-0 bg'>
          <FormControl variant="standard" fullWidth>
            <InputLabel id="sort-label">정렬기준</InputLabel>
            <Select labelId='sort-label' id='sort' value={selectedSort.sorting} onChange={handleSelect} label='정렬 기준'>
              <MenuItem value=''><em>None</em></MenuItem>
              <MenuItem value='createdAt,asc'><em>최신순</em></MenuItem>
              <MenuItem value='createdAt,desc'><em>등록순</em></MenuItem>
              <MenuItem value='rating,desc'><em>평점높은순</em></MenuItem>
              <MenuItem value='rating,asc'><em>평점낮은순</em></MenuItem>
            </Select>
          </FormControl>
        </CCol>
      </CRow>
      {articleData.map((item) => {
        return (
          <CRow className="justify-content-center align-items-center mt-3" key={item.id}>
            <CCard>
              <CCardBody>
                <CRow className='align-items-center px-3'>
                  <CCol className="justify-content-center align-items-center col-auto">
                    {/* <h5 className="mb-0 d-inline">
                      {item.title}
                    </h5>
                    <div className="mx-3 mb-0 fs-6 d-inline">
                      {item.name}
                    </div> */}
                    <div onClick={handleClick} id={item.id} style={{ cursor: 'pointer' }}>
                      <h5 className="mb-0 d-inline">
                        {item.title}
                      </h5>
                      <div className="mx-3 mb-0 fs-6 d-inline">
                        {item.name}
                      </div>
                    </div>
                  </CCol>
                  <Divider orientation='vertical' flexItem className='px-0' />
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
                      item.tags.map((tag, idx) => {
                        return (
                          <CBadge color="secondary" shape="rounded-pill" className='me-2 px-3 py-1 w-auto' key={idx}>{tag}</CBadge>
                        )
                      })
                    }
                    <Rating value={item.rating} precision={0.5} size="small" readOnly className='pe-3' />
                    <Divider orientation='vertical' flexItem className='px-0 my-1' />
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

      <Pagination count={searched.sResponse.totalPages} className='d-flex my-4 justify-content-center' page={selectedPage.page} onChange={handleChange} />
    </>
  )
}

export default SearchResult