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
  FormGroup} from '@mui/material'

const FoodArticle = () => {
  const data = useLocation();
  console.log(data.state);

  const foodData = data.state.data;
  const apiURL = `/api/food/${foodData.id}/review?size=5`;

  // 리뷰 호출
  const [reviews, setReviews] = useState({});
  useEffect(() => {
    call(apiURL, "GET", null)
    .then(
      (response) => {
        setReviews(response);
      }
    )
  }, []);

  // - 리뷰 pagination
  const [reviewPage, setReviewPage] = useState({
    page: reviews.number+1,
    url: apiURL
  });
  const handleChange = (event, pg) => {
    setReviewPage({page: pg, url: `${apiURL}&page=${pg-1}`});
  }

  const mounted1 = useRef(false);
  useEffect(() => {
    if(!mounted1.current){
      mounted1.current = true;
    } else {
      console.log(`* ${reviewPage.url}`)
      call(reviewPage.url, "GET", null)
      .then(
        (response) => {
          setReviews(response);
        }
      )
    }
    
  }, [reviewPage])

  // - 리뷰 컴포넌트
  function ReviewSection() {
    if (Object.keys(reviews).length === 0) {
      console.log("%%");
      return (
        <>
          <Skeleton variant="rounded" width={210} height={60} />
        </>
      );
    } else {
      console.log(reviews);
      return (
        <>
          <div className='px-4'>
            {
              reviews.content.map((review, idx) => {
                return (
                  <CRow className='align-items-start py-3'>
                    <div className='d-inline w-auto text-info fw-bold'>{review.userName}</div>
                    <CCol className=''>
                      <Rating value={review.rating} precision={0.5} size="small" readOnly></Rating>
                      <div className=''>{review.content}</div>
                    </CCol>
                  </CRow>
                )
              })
            }
            <Pagination count={reviews.totalPages} className='d-flex mt-2 justify-content-center' size="small" page={reviewPage.page} onChange={handleChange}/>
          </div>
          
        </>
      );
    }
  }

  // 새로운 리뷰 등록
  const [reviewRate, setReviewRate] = useState(0);
  
  return (
    <>
      <CContainer className="justify-content-center">
            <CCard className="p-4">
              <CCardBody className="p-5">
                <CRow className="justify-content-center">
                    <CCol className="col-auto">
                        <CImage src={foodData.imgUrl} width={200} height={200}/>
                    </CCol>
                    <CCol className="ms-3">
                        <CRow className="mb-2 align-items-end">
                            <h3 className="px-0 d-inline w-auto">{foodData.title}</h3>
                            <h5 className='d-inline w-auto flex-end text-muted'>{foodData.name}</h5>
                        </CRow>
                        <CRow>
                            <CBadge color="info" className='mx-1 px-3 py-2 w-auto'>{foodData.type}</CBadge>
                            {
                                foodData.tags.map((tag, index)=> (
                                    <CBadge color="secondary" className='mx-1 px-3 py-2 w-auto' key={index}>{tag}</CBadge>
                                ))
                            }
                        </CRow>
                        <CRow className='align-items-center mt-3' id='recipe-user'>
                            <h6 className='w-auto mb-0 fw-bold'>작성자</h6>
                            <div className='w-auto'>{foodData.userName}</div>
                        </CRow>
                        <CRow className='align-items-center mt-2' id='recipe-user'>
                            <h6 className='w-auto mb-0 fw-bold'>가격</h6>
                            <div className='w-auto'>{foodData.price}원</div>
                        </CRow>
                    </CCol>
                </CRow>
                <CRow className="justify-content-center px-2 pt-5 pb-4">
                    <h6 className='fw-bold'>재료</h6>
                    <div className='fs-6 px-4 pt-2'>{foodData.ingredient}</div>
                </CRow>
                <Divider />
                <CRow className="justify-content-center px-2 py-4" id="nutrient">
                    <h6 className='fw-bold'>영양정보</h6>
                    <CRow className="align-items-center justify-content-center pt-2">
                      <CRow>
                        <CCol className='fw-bold'>칼로리</CCol>
                        <CCol>{foodData.nutrient.calorie}</CCol>
                        <CCol className='fw-bold'>탄수화물</CCol>
                        <CCol>{foodData.nutrient.carbohydrate}</CCol>
                        <CCol className='fw-bold'>당류</CCol>
                        <CCol>{foodData.nutrient.sugars}</CCol>
                      </CRow>
                      <CRow>
                        <CCol className='fw-bold'>단백질</CCol>
                        <CCol>{foodData.nutrient.protein}</CCol>
                        <CCol className='fw-bold'>지방</CCol>
                        <CCol>{foodData.nutrient.fat}</CCol>
                        <CCol className='fw-bold'>불포화지방</CCol>
                        <CCol>{foodData.nutrient.unsaturatedFat}</CCol>
                      </CRow>
                    </CRow>
                </CRow>
                <Divider />
                <CRow  className="justify-content-center align-items-center my-5">
                {foodData.content}
                </CRow>
                <Divider />
                <CRow className="justify-content-center px-2 py-4" id="review">
                    <h6 className='fw-bold'>리뷰</h6>
                    <ReviewSection></ReviewSection>
                </CRow>
                <CRow className='pt-3 px-2 d-flex align-items-start' id='newReview'>
                  <h6 className='d-inline w-auto mb-0 fw-bold'>리뷰 작성</h6>
                  <Rating value={reviewRate} precision={0.5} className='w-auto align-self-center py-0' 
                    onChange={(event, newRate) => {
                      setReviewRate(newRate);
                    }}/>
                      
                  <CInputGroup className='pt-1 px-3'>
                    <CFormTextarea placeholder='리뷰 입력' rows={2} className='p-3'></CFormTextarea>
                    <CButton type='button' color='secondary' variant='outline' className='px-5'>등록</CButton>
                  </CInputGroup>
                </CRow>
              </CCardBody>
            </CCard>
      </CContainer>
    </>
  )
}

export default FoodArticle