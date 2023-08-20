import React, { useState, useEffect, useRef } from 'react'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { MainCategory, MainNutrient, MainInput, RecSlide } from './MainComponents'

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
  console.log(selectedNutrients)

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

  return (
    <div className='flex flex-col w-[800px] mt-[65px] mb-[125px] justify-center'>
      <form className='flex flex-col items-center' onSubmit={handleSubmit}>
        <div className='searchBox'>
          <MagnifyingGlass />
          <ThemeProvider theme={searchInputTheme}>
            <TextField className='w-[326px]' placeholder='찾으려는 레시피 또는 제품을 입력해주세요' onChange={(e) => setKeyword(e.target.value)} />
          </ThemeProvider>
          <ThemeProvider theme={uploadButtonTheme}>
            <Button type='submit' className='justify-self-end'>검색</Button>
          </ThemeProvider>
        </div>

        <div className='flex flex-col w-[500px] my-[50px]'>
          <div className='flex flex-row items-center pb-[20px]'>
            <span className=' w-[90px] text-[16px] font-semibold'>분류</span>
            <FoodType selectedType={selectedType} setSelectedType={setSelectedType} rq={false} />
          </div>
          <div className='flex flex-row items-center pb-[20px]'>
            <span className='w-[90px] self-start pt-[3.5px] text-[16px] font-semibold'>카테고리</span>
            <MainCategory selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} />
          </div>
          <div className='flex flex-row items-center pb-[20px]'>
            <span className='w-[90px] self-start pt-[3.5px] text-[16px] font-semibold'>재료</span>
            <MainInput setTargets={setIngredients} targets={ingredients} name='재료' />
          </div>
          <div className='flex flex-row items-center pb-[20px]'>
            <span className='w-[90px] self-start pt-[3.5px] text-[16px] font-semibold'>태그</span>
            <MainInput setTargets={setTags} targets={tags} name='태그' prefix='#' />
          </div>
          <div className='flex flex-row items-center pb-[20px]'>
            <span className='w-[90px] self-start pt-[8px] text-[16px] font-semibold'>영양성분</span>
            <MainNutrient nutrient={nutrient} setNutrient={setNutrient}
              selectedNutrients={selectedNutrients} setSelectedNutrients={setSelectedNutrients} />
          </div>
        </div>
      </form>
      <Divider />

      <div className='flex flex-col my-[50px]'>
        <div className='flex flex-row text-[20px]'>
          <span className='font-semibold'>인기 레시피</span>
          <span className='ps-[7px]'>둘러보기</span>
        </div>
        <RecSlide />
      </div>
      <Divider />
      <div className='flex flex-col mt-[50px]'>
        <div className='flex flex-row text-[20px]'>
          <span className='font-semibold'>인기 제품</span>
          <span className='ps-[7px]'>둘러보기</span>
        </div>
        <RecSlide />
      </div>
    </div>
  )
}

export default Main;