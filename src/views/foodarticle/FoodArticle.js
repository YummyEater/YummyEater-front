import React, { useEffect, useState, useCallback } from 'react'
import { createSearchParams, useParams, useNavigate } from 'react-router-dom'
import { call, getUserinfo, deleteArticle } from '../../service/ApiService'
import { handleTagClick, handleCategoryClick, TypeLabel, nutrientInfo, nutrientUnit, FormatDate } from '../../service/Functions'
import { typeButtonTheme, categoryButtonTheme, tagButtonTheme, articleButtonTheme } from '../../themes';

import { Eye, Star } from '../../assets/icons'
import thumb from '../../assets/images/thumb.png'

import { Rating, Divider, ThemeProvider, Button } from '@mui/material'
import { ArticleTitle, ArticleInfo } from './ArticleComponents';
import { Review, ReviewInput } from './Review';

// for tui viewer
import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';

const FoodArticle = () => {
  const params = useParams();

  // - 리뷰 등록 시 리렌더링용
  const [state, updateState] = useState();
  const updateReview = useCallback(() => updateState({}), []);

  const [userinfo, setUserinfo] = useState({})
  const [foodDetail, setFoodDetail] = useState({});
  const foodId = params.articleId;

  const [reviews, setReviews] = useState({});

  // 초기 데이터 호출
  useEffect(() => {
    getUserinfo(setUserinfo);
    const fdUrl = `/api/food/${foodId}`;
    call(fdUrl, "GET", null)
      .then((response) => {
        setFoodDetail(response);
      })
    // 리뷰
    const apiURL = `/api/food/${foodId}/review?size=5&sort=createdAt,desc`;
    call(apiURL, "GET", null)
      .then((response) => {
        setReviews(response);
      })
  }, [state])

  const navigate = useNavigate();
  const handleUserClick = (e) => {
    let params = createSearchParams({ 'userName': e.currentTarget.innerText });
    navigate({ pathname: '/usersearch', search: params.toString() });
  }
  const handleModifyClick = (e) => {
    navigate(`/editor/${foodId}`)
  }
  const handleDeleteClick = (e) => {
    if (window.confirm("게시물을 삭제하시겠습니까?")) { deleteArticle(foodId, navigate); }
  }

  if (Object.keys(foodDetail).length === 0) {
    return (
      <></>
    )
  } else {
    const foodData = foodDetail.data;
    console.log(foodData);

    return (
      <div className='w-[725px] container1'>
        <ArticleTitle foodData={foodData} foodDetail={foodDetail} navigate={navigate} handleUserClick={handleUserClick} />
        <div className='pt-[45px] pb-[60px]'><ArticleInfo foodData={foodData} /></div>
        <Divider />
        <div className='flex justify-center'>
          <div className='flex flex-col py-[60px] w-[650px]'>
            <Viewer initialValue={foodData.content} />
            {
              userinfo.id === foodData.userId
                ? <div className='flex flex-row pt-[40px] gap-[6px] justify-end'>
                  <ThemeProvider theme={articleButtonTheme}>
                    <Button onClick={handleModifyClick}>수정</Button>
                    <Button onClick={handleDeleteClick}>삭제</Button>
                  </ThemeProvider>
                </div>
                : <></>
            }
          </div>
        </div>
        <Divider />
        <Review reviews={reviews} setReviews={setReviews} data={foodData} state={state} updateReview={updateReview} usrId={userinfo.id} />
        <div className='flex flex-col justify-center pt-[45px]'>
          <div className='flex flex-col w-[640px] self-center items-center pb-[30px]'>
            <span className='text-[16px] font-semibold self-start'>리뷰 작성</span>
            <div className='px-[15px] pt-[4px]  w-[100%]'>
              <ReviewInput updateReview={updateReview} foodId={foodId} val={null} formId='newReview' />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default FoodArticle