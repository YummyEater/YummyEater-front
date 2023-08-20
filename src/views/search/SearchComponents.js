import React from 'react'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { handleTagClick, handleCategoryClick, TypeLabel, nutrientText, FormatDate } from '../../service/Functions'
import { Sorting } from '../../components'
import { ThemeProvider, Button, Divider, Pagination } from '@mui/material'
import {
  typeButtonTheme, categoryButtonTheme, tagButtonTheme, infoButtonTheme,
  bTypeButtonTheme, bCategoryButtonTheme,
} from '../../themes';
import { Frown, Eye, Star } from '../../assets/icons'
import thumb from '../../assets/images/thumb.png'

export const SearchHeader = (props) => {
  console.log(props.searched)
  return (
    <div className='sticky top-[146px] bg-white z-10'>
      <div className='flex flex-col pb-[14px]'>
        <div className='flex flex-row justify-between w-[800px] py-[20px]'>
          <div className='flex flex-col w-[625px]' id='section1'>
            <span className='text-[18px] font-semibold'>{props.searched.sTitle}</span>
            <div className='flex flex-row flex-wrap pt-[8px] gap-[5px]'>
              {
                (props.searched.sType === '' || props.searched.sType === null || props.searched.sType === undefined)
                  ? <></>
                  : <ThemeProvider theme={typeButtonTheme}>
                    <Button disabled>{TypeLabel(props.searched.sType)}</Button>
                  </ThemeProvider>
              }
              {
                (props.searched.sCate === undefined || props.searched.sCate.length === 0)
                  ? <></>
                  : <>{
                    props.searched.sCate.map((cate, idx) => (
                      <ThemeProvider theme={categoryButtonTheme} key={`cate-${idx}`}>
                        <Button onClick={(e) => handleCategoryClick(props.navigate, props.foodDetail.data.type, e.currentTarget.innerText)}>
                          {cate}</Button>
                      </ThemeProvider>
                    ))
                  }</>
              }
            </div>
            <div className='flex flex-row flex-wrap pt-[6px] gap-[5px]'>
              {
                (props.searched.sTag === undefined || props.searched.sTag.length === 0)
                  ? <></>
                  : <>{
                    props.searched.sTag.map((tag, idx) => (
                      <ThemeProvider theme={tagButtonTheme}>
                        <Button onClick={(e) => handleTagClick(props.navigate, props.foodDetail.data.type, e.currentTarget.innerText)} key={`tag-${idx}`}>
                          <div className='flex flex-row'><span className='pe-[2px]'>#</span><span>{tag}</span></div>
                        </Button>
                      </ThemeProvider>
                    ))
                  }</>
              }
              {
                (props.searched.sIngred === undefined || props.searched.sIngred.length === 0)
                  ? <></>
                  : <>{
                    props.searched.sIngred.map((ingred, idx) => (
                      <ThemeProvider theme={infoButtonTheme}>
                        <Button key={`ingred-${idx}`} disabled>
                          {ingred}</Button>
                      </ThemeProvider>
                    ))
                  }</>
              }
              {
                (props.searched.sNutrient === undefined || props.searched.sNutrient.length === 0)
                  ? <></>
                  : <>{
                    props.searched.sNutrient.map((nut, idx) => (
                      <ThemeProvider theme={infoButtonTheme}>
                        <Button key={`nut-${idx}`} disabled>
                          {nutrientText(nut)}</Button>
                      </ThemeProvider>
                    ))
                  }</>
              }
            </div>
          </div>
          <div className='flex justify-end w-[150px]' id='section2'>
            {
              (props.searched.sResponse === undefined || props.searched.sResponse.totalElements === 0)
                ? <></>
                : <div className='flex flex-col gap-[5px] items-end'>
                  <div className='flex flex-row text-[14px]'>
                    <span className='font-semibold'>{props.searched.sResponse.totalElements}</span>
                    <span>개의 검색결과</span>
                  </div>
                  <div className='w-[85px]'>
                    <Sorting size="small" value={props.sort} apiURL={props.apiURL} path={props.path}
                      setSort={props.setSort} setPage={props.setPage} params={props.params} />
                  </div>
                </div>
            }
          </div>
        </div>
        <Divider />
      </div>
    </div>
  )
}

export const UserSearchHeader = (props) => {
  console.log(props.searched)
  return (
    <div className='sticky top-[146px] bg-white z-10'>
      <div className='flex flex-col pb-[14px]'>
        <div className='flex flex-row justify-between w-[800px] py-[20px]'>
          <div className='flex flex-col w-[625px]' id='section1'>
            <span className='text-[18px] font-semibold'>{props.params.get('userName')}</span>
          </div>
          <div className='flex justify-end w-[150px]' id='section2'>
            {
              (props.searched.sResponse === undefined || props.searched.sResponse.totalElements === 0)
                ? <></>
                : <div className='flex flex-col gap-[5px] items-end'>
                  <div className='flex flex-row text-[14px] gap-[5px]'>
                    <span>작성 게시물</span>
                    <span className='font-semibold'>{props.searched.sResponse.totalElements}</span>
                  </div>
                  <div className='w-[85px]'>
                    <Sorting size="small" value={props.sort} apiURL={props.apiURL} path={props.path}
                      setSort={props.setSort} setPage={props.setPage} params={props.params} />
                  </div>
                </div>
            }
          </div>
        </div>
        <Divider />
      </div>
    </div>
  )
}

export const ArticleList = (props) => {
  const navigate = useNavigate();
  const handleClick = (e) => { props.setSelectedArticle(e.currentTarget.id); }
  const handleChange = (e, pg) => {
    props.params.set('page', pg - 1);
    props.setSelectedPage(pg);
    navigate({ pathname: props.path, search: props.params.toString() });
    window.scrollTo(0, 0);
  }

  const handleUserClick = (e) => {
    let params = createSearchParams({ 'userName': e.currentTarget.innerText });
    navigate({ pathname: '/search/user', search: params.toString() });
  }

  const Block = (props) => {
    return (
      <div className='flex flex-row w-[350px] h-[150px] justify-between'>
        <img height={150} width={175} className='h-[150px] w-[175px] object-cover rounded-[5px]' src={props.data.imgUrl || thumb} />
        <div className='flex flex-col w-[165px] justify-between'>
          <div className='flex flex-col'>
            <span className='text-[18px] font-semibold cursor-pointer' id={props.data.id} onClick={handleClick}>{props.data.title}</span>
            <div className='flex flex-row justify-between items-center'>
              <span className='w-[109px] pt-[4px] text-[14px] font-semibold cursor-pointer' onClick={handleUserClick}>{props.data.userName}</span>
              <span className='text-[13px] text-gray3'>{FormatDate(props.data.createdAt, 3)}</span>
            </div>
          </div>
          <div className='flex flex-col gap-[4px] text-[13px] text-gray3'>
            <div className='flex flex-row flex-wrap gap-[3px]'>
              <ThemeProvider theme={bTypeButtonTheme}>
                <Button disabled>{TypeLabel(props.data.type)}</Button>
              </ThemeProvider>
              {
                props.data.categories === undefined || props.data.categories.length === 0
                  ? <></>
                  : <>{
                    props.data.categories.map((cate, idx) => {
                      return (
                        <ThemeProvider theme={bCategoryButtonTheme} key={`cate-${idx}`}>
                          <Button disabled>{cate}</Button>
                        </ThemeProvider>
                      )
                    })
                  }</>
              }
            </div>
            <div className='flex flex-row justify-between'>
              {
                props.data.maker === null || props.data.maker === "" || props.data.maker === undefined
                  ? <></>
                  : <span>{props.data.maker}</span>
              }
              {
                props.data.price === null || props.data.price === "" || props.data.price === undefined
                  ? <></>
                  : <span>가격 {props.data.price}원</span>
              }
            </div>
            <div className='flex flex-row justify-between'>
              <div className='flex flex-row items-center'><Eye /><span className='ps-[5px]'>{props.data.views}</span></div>
              <div className='flex flex-row items-center'><Star /><span className='ps-[5px]'>{props.data.rating.toFixed(1)}</span></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (props.data.totalElements === 0) {
    return (
      <div className='flex flex-col justify-center items-center gap-[20px] pt-[20px]'>
        <Frown /><span>조건에 맞는 검색 결과가 존재하지 않습니다.</span>
      </div>
    )
  } else {
    console.log(props.data.content)
    return (
      <div className='flex flex-col items-center'>
        <div className='grid grid-cols-2 gap-x-[100px] gap-y-[25px] content-between'>
          {
            props.data.content.map((item, idx) => {
              return (
                <Block data={item} key={`block-${idx}`} />
              )
            })
          }
        </div>
        <Pagination className='mt-[60px]' count={props.data.totalPages} size="small" page={props.selectedPage} onChange={handleChange} />
      </div>

    )
  }

}