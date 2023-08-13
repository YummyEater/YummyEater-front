import React, { useState, useEffect, useRef } from 'react'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { call, callH, uploadImg, getUserinfo } from '../../service/ApiService'
import { nutrientInfo, nutrientUnit } from '../../service/Functions'

import { TitleLabel, InputIngredient, InputTag } from '../editor/EditorComponents'

import { FoodType, FoodCategory } from '../../components/Common'
import { InputNutrient } from './MainComponents'
import { searchInputTheme, uploadButtonTheme, uploadImgButtonTheme } from '../../themes'
import { MagnifyingGlass } from '../../assets/icons'
import {
  ThemeProvider, CircularProgress, TextField, Divider, Button, Collapse,
  FormControl, InputLabel, OutlinedInput, InputAdornment,
} from '@mui/material'

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
  const handleSubmit = (event) => {
    event.preventDefault()
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
  }, [searchParams]);

  return (
    <div className='flex w-[800px] mt-[65px] mb-[100px] justify-center'>
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

        <div className='flex flex-col mt-[50px]'>
          <div className='flex flex-row items-center pb-[25px]'>
            <TitleLabel label='분류' req={1} />
            <FoodType selectedType={selectedType} setSelectedType={setSelectedType} rq={true} />
          </div>
          <div className='mx-[12.5px]'><Divider /></div>
          <div className='flex flex-row items-center pb-[25px]'>
            <div className='self-start pt-[3.5px]'><TitleLabel label='카테고리' req={0} /></div>
            <FoodCategory selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} />
          </div>
          <div className='flex flex-row items-center pb-[25px]'>
            <div className='self-start pt-[3.5px]'><TitleLabel label='재료' req={0} /></div>
            <InputIngredient setTargets={setIngredients} targets={ingredients} />
          </div>
          <div className='flex flex-row items-center pb-[25px]'>
            <div className='self-start pt-[3.5px]'><TitleLabel label='태그' req={0} /></div>
            <InputTag setTargets={setTags} targets={tags} />
          </div>
          <div className='flex flex-row items-center pb-[25px]'>
            <div className='self-start pt-[3.5px]'><TitleLabel label='영양성분' req={0} /></div>
            <InputNutrient nutrient={nutrient} setNutrient={setNutrient}
                  selectedNutrients={selectedNutrients} setSelectedNutrients={setSelectedNutrients} />
          </div>
        </div>
      </form>
    </div>
  )
}

export default Main;