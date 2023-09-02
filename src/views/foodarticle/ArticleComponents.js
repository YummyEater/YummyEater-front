import React from 'react'
import { handleTagClick, handleCategoryClick, TypeLabel, nutrientInfo, nutrientUnit, FormatDate } from '../../service/Functions'
import { typeButtonTheme, categoryButtonTheme, tagButtonTheme } from '../../themes';

import { Eye, Star } from '../../assets/icons'
import thumb from '../../assets/images/thumb.png'

import { ThemeProvider, Button } from '@mui/material'

export const ArticleTitle = (props) => {
  return (
    <div className='flex flex-row'>
      <img height={200} width={200} className='h-[200px] w-[200px] object-cover me-[25px]' src={props.foodData.imgUrl || thumb} />
      <div className='flex flex-col h-[200px] justify-between'>
        <div className='flex flex-col'>
          <div className='font-semibold text-[20px]'>{props.foodData.title}</div>
          <div className='flex flex-row pt-[15px] gap-[5px]'>
            <ThemeProvider theme={typeButtonTheme}>
              <Button disabled>{TypeLabel(props.foodData.type)}</Button>
            </ThemeProvider>
            {
              props.foodData.categories.map((cate, idx) => (
                <ThemeProvider theme={categoryButtonTheme} key={`cate-${idx}`}>
                  <Button onClick={(e) => handleCategoryClick(props.navigate, props.foodDetail.data.type, e.currentTarget.innerText)}>
                    {cate}</Button>
                </ThemeProvider>
              ))
            }
          </div>
          <div className='flex flex-row pt-[10px] gap-[5px]'>
            {
              props.foodData.tags.map((tag, idx) => (
                <ThemeProvider theme={tagButtonTheme} key={`tag-${idx}`}>
                  <Button onClick={(e) => handleTagClick(props.navigate, props.foodDetail.data.type, e.currentTarget.innerText.slice(2))}>
                    <div className='flex flex-row'><span className='pe-[2px]'>#</span><span>{tag}</span></div>
                  </Button>
                </ThemeProvider>
              ))
            }
          </div>
        </div>
        <div className='flex flex-col'>
          <div className='text-[16px] font-semibold cursor-pointer' onClick={props.handleUserClick}>{props.foodData.userName}</div>
          <div className='flex flex-row text-[16px] select-none items-center'>
            <span>{FormatDate(props.foodData.createdAt, 0)}</span>
            <div className='flex flex-row ps-[20px] items-center'><Eye /><span className='ps-[10px]'>{props.foodData.views}</span></div>
            <div className='flex flex-row ps-[20px] items-center'><Star /><span className='ps-[10px]'>{props.foodData.rating.toFixed(1)}</span></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const ArticleInfo = (props) => {
  const InfoElement = (props) => {
    return (
      <div className='flex flex-row justify-between items-center w-[140px]'>
        <span className='text-[16px] font-semibold'>{props.title}</span>
        <span className='w-auto d-inline text-[15px]'>{
          props.data !== null && props.data !== "" && props.data !== undefined
            ? `${props.data}${props.postfix}` : `—`
        }</span>
      </div>
    )
  }
  const IngredElement = (props) => {
    return (
      <div className='flex flex-row justify-between items-center w-[150px]'>
        <span className='text-[15px] text-gray2'>{props.title}</span>
        <span className='w-auto d-inline text-[15px]'>{
          props.data !== null && props.data !== "" && props.data !== undefined
            ? `${props.data} ${nutrientUnit(props.nutrient)}` : `—`
        }</span>
      </div>
    )
  }

  return (
    <div className='flex justify-center'>
      <div className='flex flex-col w-[645px] gap-[28px]'>
        <div className='flex flex-row gap-[112px]'>
          <InfoElement title='가격' data={props.foodData.price ? props.foodData.price : '-'} postfix='원' />
          {
            props.foodData.amount 
            ? <InfoElement title='중량' data={props.foodData.amount.toFixed(2)} postfix='g' /> : <></>
          }
          {
            props.foodData.servings 
            ? <InfoElement title='인원' data={props.foodData.servings} postfix='인분' /> : <></>
          }
        </div>
        {
          props.foodData.ingredient !== null && props.foodData.ingredient !== ''
            ? <div className='flex flex-row'>
              <span className='pe-[55px] text-[16px] font-semibold'>재료</span>
              <span className='text-[15px]'>{props.foodData.ingredient}</span>
            </div>
            : <></>
        }
        <div className='flex flex-col items-center'>
          <span className='text-[16px] font-semibold self-start'>영양정보</span>
          <div className='flex flex-row flex-wrap w-[590px] pt-[8px] justify-self-center gap-[5px] justify-between'>
            {
              nutrientInfo(props.foodData.nutrient).map((item, idx) => (
                <IngredElement title={item.label} data={item.var} nutrient={item.value} key={`ingred-${idx}`} />
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}