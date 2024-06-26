import React, { useState, useRef } from 'react'
import { nutrientText, nutrientInfo, nutrientUnit } from '../../service/Functions';
import { categories } from '../../service/Category'
import { mainSelectTheme, mainButtonTheme, categoryToggleThemeM, mainInputTheme, periodRadioTheme } from '../../themes';
import { ChevronDownGray, XOrange, Plus, StarSm, EyeSm, AlertCircle } from '../../assets/icons';
import {
  styled, ThemeProvider, InputLabel, Select, FormControl, MenuItem, TextField,
  IconButton, Button, OutlinedInput, Collapse, ToggleButtonGroup, ToggleButton,
} from '@mui/material';
import Slider from "react-slick";

export const MainCategory = (props) => {
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => { setExpanded(!expanded); }
  const handleCategoryChange = (e) => {
    if (e.target.value !== undefined) {
      const index = props.selectedCategories.indexOf(e.target.value)
      if (index === -1) {
        props.setSelectedCategories([...props.selectedCategories, e.target.value])
      } else {
        props.setSelectedCategories(props.selectedCategories.filter((cat) => cat !== e.target.value))
      }
    }
  }

  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return (<IconButton {...other} aria-expanded={false}><ChevronDownGray /></IconButton>);
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)', marginLeft: 'auto', padding: '0px',
    transition: theme.transitions.create('transform', { duration: theme.transitions.duration.shortest })
  }));

  return (
    <div className='flex flex-col w-[410px] max-[800px]:max-w-[410px] max-[800px]:w-full'>
      <div className='flex flex-row justify-between border-b border-gray2 px-[8px] py-[4px] cursor-pointer' onClick={handleExpandClick} >
        <div className='flex flex-row flex-wrap w-[360px] gap-[5px]'>
          {
            props.selectedCategories && props.selectedCategories.length > 0
              ? <ThemeProvider theme={mainButtonTheme}>
                {
                  props.selectedCategories.map((item, idx) => (
                    <Button disabled key={`selectCate-${idx}`}>{item}</Button>
                  ))
                }
              </ThemeProvider>
              : <span className='text-gray3 text-[14px]'>음식의 카테고리를 선택하세요</span>
          }
        </div>
        <ExpandMore expand={expanded} disableRipple><img src='/arrow_down.svg' /></ExpandMore>
      </div>
      <Collapse in={expanded} timeout="auto">
        <div className='pt-[10px]'>
          <ThemeProvider theme={categoryToggleThemeM}>
            <ToggleButtonGroup value={props.selectedCategories} exclusive onChange={handleCategoryChange}>
              {
                categories.map((item, idx) => (
                  <ToggleButton className={(idx === 11 || idx === 18 || idx === 24 || idx === 30) ? 'first-cate ms-[12px]' : ''}
                    value={item} key={`type-${idx}`}>{item} </ToggleButton>
                ))
              }
            </ToggleButtonGroup>
          </ThemeProvider>
        </div>
      </Collapse>
    </div>
  )
}

// 엔터
const handleEnter = (e, handleAdd) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    handleAdd();
  }
}

export const MainInput = (props) => {
  // 추가
  const targetRef = useRef(null);
  const handleAdd = (e) => {
    const targetVal = targetRef.current.value
    const index = props.targets.indexOf(targetVal)
    if (targetVal && targetVal.length > 0 && index === -1) {
      props.setTargets([...props.targets, targetVal])
    }
    targetRef.current.value = "";
  }
  // 삭제
  const handleRemove = (e) => {
    // props.setTargets(props.targets.filter((tg) => tg !== e.currentTarget.parentNode.innerText.slice(2)))
    if (props.prefix) { props.setTargets(props.targets.filter((tg) => tg !== e.currentTarget.parentNode.innerText.slice(2))) }
    else { props.setTargets(props.targets.filter((tg) => tg !== e.currentTarget.parentNode.innerText)) }
  }

  return (
    <div className='flex flex-col'>
      <div className='flex flex-row gap-[20px]'>
        <ThemeProvider theme={mainInputTheme}>
          <TextField className='w-[200px]' variant="outlined" placeholder={`${props.name}를 입력해 추가하세요`} inputRef={targetRef} onKeyDown={e => handleEnter(e, handleAdd)} />
        </ThemeProvider>
        <IconButton className='p-0' disableRipple onClick={handleAdd}><Plus /></IconButton>
      </div>
      {
        props.targets
          ? <Collapse in={props.targets.length > 0} timeout="auto">
            <div className='flex flex-row flex-wrap max-w-[410px] w-full gap-[5px] mt-[10px]'>
              {
                props.targets.map((item, idx) => (
                  <div className='flex flex-row output-wrap2' key={`tag-${idx}`}>
                    {props.prefix ? props.prefix : ''} {item}
                    <IconButton className='cursor-pointer p-0' disableRipple onClick={handleRemove}><XOrange /></IconButton>
                  </div>
                ))
              }
            </div>
          </Collapse>
          : <></>
      }
    </div>
  )
}

export const MainNutrient = (props) => {
  const inputRef = useRef(null);
  const handleNutrient = (attr) => (e) => {
    props.setNutrient((prevState) => ({
      ...prevState,
      [attr]: e.target.value
    }))
  }

  // 추가
  const handleAdd = (e) => {
    const currVal = Object.values(props.nutrient)
    if (!currVal.includes('')) {
      const targetVal = currVal.join('_')
      if (!(targetVal in props.selectedNutrients)) {
        props.setSelectedNutrients((prevState) => ({ ...prevState, [targetVal]: nutrientText(targetVal) }))
      }
      props.setNutrient({ nut: '', range: '', amount: undefined });
      inputRef.current.value = "";
    }
  }
  // 삭제
  const handleRemove = (e) => {
    const target = Object.keys(props.selectedNutrients).filter((key) =>
      props.selectedNutrients[key] === e.target.parentNode.innerText)

    if (target !== undefined && target !== null && target.length === 1) {
      const nutrients = { ...props.selectedNutrients }
      delete nutrients[target[0]]
      props.setSelectedNutrients(nutrients)
    }
  }

  return (
    <div className='flex flex-col max-w-[410px] w-full '>
      <div className="flex flex-row justify-between items-end">
        <div className='w-[100px]'>
          <FormControl variant="standard" size={props.size} fullWidth>
            <ThemeProvider theme={mainSelectTheme}>
              <InputLabel id="nutrient-label">영양소</InputLabel>
              <Select labelId='nutrient-label' id='nutrient-select' value={props.nutrient.nut} IconComponent={ChevronDownGray}
                onChange={handleNutrient('nut')}>
                <MenuItem value=''><em>—</em></MenuItem>
                {
                  nutrientInfo(null).map((item, idx) => (
                    <MenuItem value={item.value} key={`nut-${idx}`}><em>{item.label}</em></MenuItem>
                  ))
                }
              </Select>
            </ThemeProvider>
          </FormControl>
        </div>
        <FormControl>
          <ThemeProvider theme={mainInputTheme}>
            <InputLabel html="nutrient-amount">용량</InputLabel>
            <OutlinedInput name="nutrient-amount" id="nutrient-amount" className='w-[80px]' variant="outlined" inputRef={inputRef} type="number"
              onChange={handleNutrient('amount')} onKeyDown={e => handleEnter(e, handleAdd)} onWheel={e => e.target.blur()} />
          </ThemeProvider>
        </FormControl>
        <span>{nutrientUnit(props.nutrient.nut)}</span>
        <div className='w-[80px]'>
          <FormControl variant="standard" size={props.size} fullWidth>
            <ThemeProvider theme={mainSelectTheme}>
              <InputLabel id="nutrient-label">이상/이하</InputLabel>
              <Select labelId='nutrient-label' id='nutrient-select' value={props.nutrient.range} IconComponent={ChevronDownGray}
                onChange={handleNutrient('range')}>
                <MenuItem value=''><em>—</em></MenuItem>
                <MenuItem value='greater'><em>이상</em></MenuItem>
                <MenuItem value='less'><em>이하</em></MenuItem>
              </Select>
            </ThemeProvider>
          </FormControl>
        </div>
        <IconButton className='p-0 pb-[5px]' disableRipple onClick={handleAdd}><Plus /></IconButton>
      </div>
      <Collapse in={props.selectedNutrients && (Object.keys(props.selectedNutrients).length > 0)} timeout="auto">
        <div className='flex flex-row flex-wrap max-w-[410px] max-[800px]:w-full gap-[5px] mt-[10px]'>
          {
            Object.keys(props.selectedNutrients).map((item, idx) => (
              <div className='flex flex-row output-wrap2' key={`nut-${idx}`}>
                {props.selectedNutrients[item]}
                <IconButton className='cursor-pointer p-0' disableRipple onClick={handleRemove}><XOrange /></IconButton>
              </div>
            ))
          }
        </div>
      </Collapse>
    </div>
  )
}

function ArrowPrev({ onClick }) {
  return (<div className='slick-arrow slick-prev slick-prev-main' onClick={onClick} />)
}
function ArrowNext({ onClick }) {
  return (<div className='slick-arrow slick-next slick-next-main' onClick={onClick} />)
}
export function RecSlide(props) {
  const settings = {
    className: "center", dots: true, infinite: false, slidesToShow: 2,
    slidesToScroll: 2, centerMode: false, variableWidth: true, dotsClass: 'slick-dots',
    nextArrow: <ArrowNext />, prevArrow: <ArrowPrev />,
  }
  return (
    (props.data === undefined || props.data.length === 0)
      ? <div className='flex flex-col justify-center items-center h-[250px] gap-[10px] m-4 bg-gray1 rounded-[15px]'>
        <AlertCircle /> <span>현재 집계된 데이터가 없습니다..</span>
      </div>
      : <Slider {...settings}>
        {props.data.map((post, idx) =>
          <RecBlock img={post.imgUrl} title={post.title} userName={post.userName} postId={post.id}
            rating={post.rating} views={post.views} key={`rec-${idx}`} />)}
      </Slider>
  )
}

function RecBlock(props) {
  return (
    <a href={`/foodarticle/${props.postId}`}>
      <div className='flex flex-col w-[200px] rounded-[18px] shadow mx-[10px] bg-white'>
        <img className='w-[200px] h-[130px] object-cover rounded-[18px]' src={props.img} />
        <div className='flex flex-col mx-[14px] my-[10px]'>
          <span className='text-[18px] font-semibold'>{props.title}</span>
          <span className='text-[14px]'>{props.userName}</span>
          <div className='flex flex-row gap-[30px]'>
            <div className='flex flex-row text-[13px] gap-[6px] items-center'>
              <StarSm />{props.rating.toFixed(1)}
            </div>
            <div className='flex flex-row text-[13px] gap-[6px] items-center'>
              <EyeSm />{props.views}
            </div>
          </div>
        </div>
      </div>
    </a>
  )
}

export function RecButtons(props) {
  const handlePeriod = (e) => {
    if (e.target.value !== undefined) {
      props.setPeriod(e.target.value)
    }
  }
  return (
    <ThemeProvider theme={periodRadioTheme}>
      <ToggleButtonGroup value={props.period} exclusive onChange={handlePeriod}>
        <ToggleButton value='DAY'>오늘</ToggleButton>
        <ToggleButton value='WEEK'>이번주</ToggleButton>
        <ToggleButton value='MONTH'>이번달</ToggleButton>
      </ToggleButtonGroup>
    </ThemeProvider>
  )
}