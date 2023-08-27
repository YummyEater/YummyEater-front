import React, { useEffect, useState, useRef } from 'react'
import { call, callH } from '../../service/ApiService'
import { FormatDate } from '../../service/Functions'
import { Sorting } from '../../components'
import { commentRatingTheme, uploadButtonTheme, commentInputTheme } from '../../themes'
import { RatingFilled, RatingEmpty } from '../../assets/icons'

import { ReviewTool, ReviewStats } from './ReviewComponents.js'
import { ThemeProvider, Rating, Pagination, Skeleton, Divider, TextField, Button } from '@mui/material'

export const Review = (props) => {
  const apiURL = `/api/food/${props.data.id}/review?size=5`;
  const [reviewSort, setReviewSort] = useState({ sorting: 'createdAt,desc', url: apiURL });
  const [reviewPage, setReviewPage] = useState({ page: 1, url: reviewSort.url });
  const handleChange = (e, pg) => {
    setReviewPage({ page: pg, url: `${reviewSort.url}&page=${pg - 1}` });
  }

  const mounted1 = useRef(false);
  useEffect(() => {
    if (!mounted1.current) { mounted1.current = true; }
    else {
      call(reviewPage.url, "GET", null).then((response) => {
        props.setReviews(response);
      })
    }
  }, [reviewPage])

  // 리뷰 수정용
  const [editTarget, setEditTarget] = useState(null);
  const handleEdit = (target) => { setEditTarget(target); }

  const ReviewSection = () => {
    if (Object.keys(props.reviews).length === 0) {
      return (
        <Skeleton variant="rounded" width={210} height={60} />
      );
    } else if (props.reviews.totalElements !== 0) {
      return (
        <>
          <div className='flex flex-col'>
            <Divider />
            {
              props.reviews.content.map((review, idx) => {
                return (
                  <div className='flex flex-col' key={`review-${idx}`}>
                    <div className='flex flex-row self-center w-[660px] py-[20px]' >
                      <span className='w-[150px] me-[15px] font-semibold text-[16px]'>{review.userName}</span>
                      <div className='flex flex-row w-[495px]'>
                        {
                          editTarget !== null && editTarget === review.id
                            ? <ReviewInput updateReview={props.updateReview} foodId={props.data.id} val={review.content}
                              rt={review.rating} formId={review.id} setEditTarget={setEditTarget} />
                            : <div className='flex flex-col w-[100%]'>
                              <div className='flex flex-row justify-between items-center'>
                                <div className='flex flex-row gap-[25px]'>
                                  <ThemeProvider theme={commentRatingTheme}>
                                    <Rating className='items-center' value={review.rating} precision={0.5} icon={<RatingFilled />} emptyIcon={<RatingEmpty />} readOnly></Rating>
                                  </ThemeProvider>
                                  <span className='text-[14px] text-gray3'>{FormatDate(review.createdAt, 0)}</span>
                                </div>
                                {props.usrId === review.userId
                                  ? <span className='self-end'><ReviewTool reviewId={review.id} updateReview={props.updateReview} handleEdit={handleEdit} /></span>
                                  : <></>}
                              </div>
                              <span className='text-[16px] pt-[10px] pe-[16px]'>{review.content}</span>
                            </div>
                        }
                      </div>
                    </div>
                    <Divider />
                  </div>
                )
              })
            }
          </div>
          <Pagination className='flex mt-[20px] justify-center' count={props.reviews.totalPages} size="small" page={reviewPage.page} onChange={handleChange} />
        </>
      )
    }
  }

  return (
    <div className='flex flex-col justify-center pt-[60px]'>
      <div className='flex flex-col w-[640px] self-center items-center pb-[30px]'>
        <span className='text-[16px] font-semibold self-start'>리뷰</span>
        <ReviewStats num={props.reviews.totalElements} rating={props.data.rating} ratingData={props.data.foodReviewRatingCount} />
      </div>
      <div className='flex flex-col w-[725px]'>
        {
          (Object.keys(props.reviews).length === 0 || props.reviews.totalElements === 0)
            ? <></>
            : <div className='pb-[20px] w-[85px] self-end'>
              <Sorting size="small" value={reviewSort.sorting} apiURL={apiURL} setSort={setReviewSort} setPage={setReviewPage} params='' />
            </div>
        }
        <ReviewSection />
        {/* <Pagination className='flex mt-[20px] justify-center' count={props.reviews.totalPages} size="small" page={reviewPage.page} onChange={handleChange} /> */}
      </div>
    </div>
  )
}

export const ReviewInput = (props) => {
  const accessToken = localStorage.getItem("ACCESS_TOKEN");
  // 새로운 리뷰
  const [reviewRate, setReviewRate] = useState(props.formId === 'newReview' ? 0 : props.rt);
  const inputRef = useRef(null);

  const submitReview = (e) => {
    e.preventDefault()
    const data = new FormData(e.target);
    const review = data.get("reviewText");
    const req = { "rating": reviewRate, "content": review }
    const targetId = e.currentTarget.id
    const method = targetId === 'newReview' ? "POST" : "PATCH"
    const apiUrl = targetId === 'newReview' ? `/api/food/${props.foodId}/review` : `/api/food/review/${targetId}`

    if (reviewRate === 0) { alert('추천도를 선택해주세요.') }
    else {
      callH(apiUrl, method, req).then((response) => {
        // console.log(response)
        if (response.errorCode === "C00000") {
          if (targetId === 'newReview') { alert('리뷰가 성공적으로 등록되었습니다.') }
          else {
            alert('리뷰가 성공적으로 수정되었습니다.')
            props.setEditTarget(null)
          }
          props.updateReview();
          inputRef.current.value = "";
          setReviewRate(0);
        }
      }).catch((error) => {
        targetId === 'newReview' ? alert(`리뷰 등록을 실패했습니다. 다시 시도해주세요.`) : alert(`리뷰 수정을 실패했습니다. 다시 시도해주세요.`)
      })
    }

  }

  return (
    <form onSubmit={submitReview} id={props.formId} className='w-[100%]'>
      <div className='flex flex-col gap-[6px]'>
        <div className='flex flex-row justify-between'>
          <div className='flex flex-row gap-[10px]'>
            <span className='text-[14px]'>추천도</span>
            <ThemeProvider theme={commentRatingTheme}>
              <Rating className='items-center' value={reviewRate} precision={1} disabled={(accessToken && accessToken != null) ? false : true}
                icon={<RatingFilled />} emptyIcon={<RatingEmpty />} onChange={(e, newRate) => { setReviewRate(newRate) }}></Rating>
            </ThemeProvider>
          </div>
          {
            props.formId === 'newReview' ? <></> : <span className='self-end text-[13px] cursor-pointer' onClick={() => { props.setEditTarget(null) }}>취소</span>
          }
        </div>
        <ThemeProvider theme={commentInputTheme}>
          <TextField variant="filled" placeholder={(accessToken && accessToken != null) ? '리뷰 입력' : '로그인 후 리뷰 작성이 가능합니다.'}
            name='reviewText' id='reviewText' type='password' inputRef={inputRef} multiline rows={2}
            disabled={(accessToken && accessToken != null) ? false : true}
            defaultValue={props.formId === 'newReview' ? '' : props.val} required />
        </ThemeProvider>
        <ThemeProvider theme={uploadButtonTheme}>
          <Button type='submit' className='self-end'>등록</Button>
        </ThemeProvider>
      </div>
    </form>
  )
}