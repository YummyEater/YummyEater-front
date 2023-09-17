import React, { useState, useEffect, useRef } from 'react'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { MainCategory, MainNutrient, MainInput, RecSlide, RecButtons } from './MainComponents'
import { call } from '../../service/ApiService'
import { FoodType } from '../../components/Common'
import { searchInputTheme, uploadButtonTheme } from '../../themes'
import { MagnifyingGlass } from '../../assets/icons'
import { ThemeProvider, TextField, Divider, Button } from '@mui/material'

const Main = () => {
  const [selectedType, setSelectedType] = useState('')
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [tags, setTags] = useState([]);
  const [nutrient, setNutrient] = useState({ nut: '', range: '', amount: '' })  // 입력된 영양성분
  const [selectedNutrients, setSelectedNutrients] = useState({});  // 추가된 영양성분

  // 검색 버튼 클릭
  const navigate = useNavigate();
  const mounted = useRef(false);
  const [searchParams, setSearchParams] = useState({});
  const handleSubmit = (e) => {
    e.preventDefault()
    setSearchParams({
      type: selectedType.length > 0 ? selectedType : '',
      title: keyword.length > 0 ? keyword : '',
      categories: selectedCategories.length > 0 ? selectedCategories : '',
      ingredient: ingredients.length > 0 ? ingredients : '',
      tags: tags.length > 0 ? tags : '',
      nutrient: Object.keys(selectedNutrients).length > 0 ? Object.keys(selectedNutrients) : '',
    })
  }

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else if (Object.keys(searchParams).length !== 0) {
      let params = createSearchParams(searchParams);
      let target = [];
      params.forEach((val, key) => {
        if (val === '') { target.push(key); }
      })
      target.forEach(key => { params.delete(key); })
      navigate({ pathname: '/search', search: params.toString() });
    }
  }, [searchParams, navigate]);


  const [recipePeriod, setRecipePeriod] = useState('day')
  const [productPeriod, setProductPeriod] = useState('day')
  const [recipeData, setRecipeData] = useState({});
  const [productData, setProductData] = useState({});

  useEffect(() => {
    const dd = {day: 'rating,desc', week: 'rating,asc', month: 'createdAt,desc'}
    // call(`/api/post/mostViewed?period=${recipePeriod}&type=recipe`, "GET", null)
    call(`/api/food?sort=${dd[recipePeriod]}`, "GET", null)
      .then((response) => {
        console.log(`-- ${recipePeriod}`)
        console.log(response);
        setRecipeData(response);
      })
  }, [recipePeriod])

  useEffect(() => {
    const dd = {day: 'rating,desc', week: 'rating,asc', month: 'createdAt,desc'}
    // call(`/api/post/mostViewed?period=${productPeriod}&type=product`, "GET", null)
    call(`/api/food?sort=${dd[productPeriod]}`, "GET", null)
      .then((response) => {
        console.log(`@@ ${productPeriod}`)
        console.log(response);
        setProductData(response);
      })
  }, [productPeriod])

  const searchitem = 'flex flex-row flex-wrap items-center pb-[20px] max-[800px]:gap-[5px]'
  const searchtitle = 'w-[90px] max-[800px]:w-full text-[16px] font-semibold'
  return (
    <div className='flex flex-col max-w-[800px] w-screen mt-[65px] mb-[125px] justify-center'>
      <form className='flex flex-col items-center px-[25px]' onSubmit={handleSubmit}>
        <div className='searchBox w-[500px] max-[800px]:max-w-[500px] max-[800px]:w-full'>
          <MagnifyingGlass />
          <ThemeProvider theme={searchInputTheme}>
            <TextField className='w-[326px] max-[800px]:max-w-[326px]' placeholder='찾으려는 레시피 또는 제품을 입력해주세요' onChange={(e) => setKeyword(e.target.value)} />
          </ThemeProvider>
          <ThemeProvider theme={uploadButtonTheme}>
            <Button type='submit' className='justify-self-end'>검색</Button>
          </ThemeProvider>
        </div>
        <div className='flex flex-col w-[500px] max-[800px]:max-w-[410px] max-[800px]:w-full my-[50px]'>
          <div className={searchitem}>
            <span className={searchtitle}>분류</span>
            <FoodType selectedType={selectedType} setSelectedType={setSelectedType} rq={false} />
          </div>
          <div className={searchitem}>
            <span className={searchtitle + ' self-start pt-[3.5px]'}>카테고리</span>
            <MainCategory selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} />
          </div>
          <div className={searchitem}>
            <span className={searchtitle + ' self-start pt-[3.5px]'}>재료</span>
            <MainInput setTargets={setIngredients} targets={ingredients} name='재료' />
          </div>
          <div className={searchitem}>
            <span className={searchtitle + ' self-start pt-[3.5px]'}>태그</span>
            <MainInput setTargets={setTags} targets={tags} name='태그' prefix='#' />
          </div>
          <div className={searchitem}>
            <span className={searchtitle + 'self-start pt-[8px]'}>영양성분</span>
            <MainNutrient nutrient={nutrient} setNutrient={setNutrient}
              selectedNutrients={selectedNutrients} setSelectedNutrients={setSelectedNutrients} />
          </div>
        </div>
      </form>
      <Divider />
      <div className='flex flex-col gap-[50px] mt-[50px] max-[810px]:ms-[15px] max-[810px]:me-[25px]'>
        <div className='flex flex-col'>
          <div className='flex flex-row w-full justify-between items-center'>
            <div className='flex flex-row text-[20px]'>
              <span className='font-semibold'>인기 레시피</span>
              <span className='ps-[7px]'>둘러보기</span>
            </div>
            <RecButtons period={recipePeriod} setPeriod={setRecipePeriod} />
          </div>
          <RecSlide period={recipePeriod} data={recipeData} />
        </div>
        <Divider />
        <div className='flex flex-col'>
        <div className='flex flex-row w-full justify-between items-center'>
            <div className='flex flex-row text-[20px]'>
              <span className='font-semibold'>인기 제품</span>
              <span className='ps-[7px]'>둘러보기</span>
            </div>
            <RecButtons period={productPeriod} setPeriod={setProductPeriod} />
          </div>
          <RecSlide period={productPeriod} data={productData} />
        </div>
      </div>
    </div>
  )
}

export default Main;