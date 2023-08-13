import React, { useState, useEffect, useRef } from 'react'
import { nutrientText, nutrientInfo, nutrientUnit } from '../../service/Functions';
import { selectTheme, editorInputTheme, addButtonTheme } from '../../themes';
import { ChevronDown, X } from '../../assets/icons';
import {
  ThemeProvider, InputLabel, Select, FormControl, MenuItem,
  IconButton, Button, OutlinedInput, Collapse
} from '@mui/material';

export const InputNutrient = (props) => {
  const inputRef = useRef(null);
  const handleNutrient = (attr) => (e) => {
    props.setNutrient((prevState) => ({
      ...prevState,
      [attr]: e.target.value
    }))
  }

  // 추가
  const handleAdd = (event) => {
    const currVal = Object.values(props.nutrient)
    if (!currVal.includes('')) {
      const targetVal = currVal.join('_')
      if (!(targetVal in props.selectedNutrients)) {
        props.setSelectedNutrients((prevState) => ({ ...prevState, [targetVal]: nutrientText(targetVal) }))
      }
      props.setNutrient({ nut: '', range: '', amount: '' });
      inputRef.current.value = "";
    }
  }
  // 삭제
  const handleRemove = (event) => {
    const target = Object.keys(props.selectedNutrients).filter((key) =>
      props.selectedNutrients[key] === event.target.parentNode.innerText)

    if (target !== undefined && target !== null && target.length === 1) {
      const nutrients = { ...props.selectedNutrients }
      delete nutrients[target[0]]
      props.setSelectedNutrients(nutrients)
    }
  }
  // 엔터
  const handleEnter = (event) => {
    if (event.key === 'Enter') { event.preventDefault(); }
  }

  return (
    <div className='flex flex-col'>
      <div className="flex flex-row gap-[24px] items-end">
        <div className='w-[100px]'>
          <FormControl variant="standard" size={props.size} fullWidth>
            <ThemeProvider theme={selectTheme}>
              <InputLabel id="nutrient-label">영양소</InputLabel>
              <Select labelId='nutrient-label' id='nutrient-select' value={props.nutrient.nut} IconComponent={ChevronDown}
                onChange={handleNutrient('nut')}>
                <MenuItem value=''><em>—</em></MenuItem>
                {
                  nutrientInfo(null).map((item, index) => (
                    <MenuItem value={item.value}><em>{item.label}</em></MenuItem>
                  ))
                }
              </Select>
            </ThemeProvider>
          </FormControl>
        </div>
        <FormControl>
          <ThemeProvider theme={editorInputTheme}>
            <InputLabel html="nutrient-amount">용량</InputLabel>
            <OutlinedInput name="nutrient-amount" id="nutrient-amount" className='w-[80px]' variant="outlined" placeholder='재료' inputRef={inputRef} type="number"
              onChange={handleNutrient('amount')} onKeyDown={handleEnter} onWheel={e => e.target.blur()} />
          </ThemeProvider>
        </FormControl>
        <span>{nutrientUnit(props.nutrient.nut)}</span>
        <div className='w-[80px]'>
          <FormControl variant="standard" size={props.size} fullWidth>
            <ThemeProvider theme={selectTheme}>
              <InputLabel id="nutrient-label">이상/이하</InputLabel>
              <Select labelId='nutrient-label' id='nutrient-select' value={props.nutrient.range} IconComponent={ChevronDown}
                onChange={handleNutrient('range')}>
                <MenuItem value=''><em>—</em></MenuItem>
                <MenuItem value='greater'><em>이상</em></MenuItem>
                <MenuItem value='less'><em>이하</em></MenuItem>
              </Select>
            </ThemeProvider>
          </FormControl>
        </div>
        <ThemeProvider theme={addButtonTheme}>
          <Button type="button" onClick={handleAdd}>추가</Button>
        </ThemeProvider>
      </div>
      <Collapse in={props.selectedNutrients && (Object.keys(props.selectedNutrients).length > 0)} timeout="auto">
        <div className='flex flex-row flex-wrap gap-[5px] mt-[10px]'>
          {
            Object.keys(props.selectedNutrients).map((item, idx) => (
              <div className='flex flex-row output-wrap' key={`nut-${idx}`}>
                {props.selectedNutrients[item]}
                <IconButton className='cursor-pointer p-0' disableRipple onClick={handleRemove}><X /></IconButton>
              </div>
            ))
          }
        </div>
      </Collapse>
    </div>


  )
}