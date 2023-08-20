import React from 'react'

import { FormControl, Select, MenuItem, ThemeProvider, ToggleButtonGroup, ToggleButton } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { ChevronDown } from '../assets/icons';
import { selectTheme, typeToggleTheme, categoryToggleTheme } from '../themes';
import { typeTag } from '../service/Functions';
import { categories } from '../service/Category'

// 정렬
export const Sorting = (props) => {
  const handleReviewSort = (event) => {
    let sortUrl = props.apiURL;
    if (event.target.value !== '') {
      sortUrl = props.apiURL.includes('?')
        ? `${props.apiURL}&sort=${event.target.value}`
        : `${props.apiURL}?sort=${event.target.value}`
    }
    props.setSort({ sorting: event.target.value, url: sortUrl });
    props.setPage({ page: 1, url: sortUrl });
  }

  const navigate = useNavigate();
  const handleSearchSort = (event) => {
    if (event.target.value === '' && props.params.has('sort')) {
      props.params.delete('sort')
    } else {
      props.params.set('sort', event.target.value);
    }
    if (props.params.has('page')) {
      props.params.delete('page')
    }
    props.setSort(event.target.value);
    navigate({ pathname: props.path, search: props.params.toString() });
    window.scrollTo(0, 0);
  }

  return (
    <>
      <FormControl variant="standard" size={props.size} fullWidth>
        <ThemeProvider theme={selectTheme}>
          <Select labelId='sort-label' id='sort' value={props.value} IconComponent={ChevronDown}
            onChange={props.params === '' ? handleReviewSort : handleSearchSort}>
            <MenuItem value='rating,desc'><em>평점높은순</em></MenuItem>
            <MenuItem value='rating,asc'><em>평점낮은순</em></MenuItem>
            <MenuItem value='createdAt,desc'><em>최신순</em></MenuItem>
            <MenuItem value='createdAt,asc'><em>등록순</em></MenuItem>
          </Select>
        </ThemeProvider>
      </FormControl>
    </>
  )
}

export const FoodType = (props) => {
  const handleTypeChange = (e) => { props.setSelectedType(e.target.value); }

  return (
    <ThemeProvider theme={typeToggleTheme}>
      <ToggleButtonGroup value={props.selectedType} exclusive onChange={handleTypeChange}>
        {
          typeTag.map((item, idx) => {
            return (
              <ToggleButton value={item.value} key={`type-${idx}`}>{item.label} </ToggleButton>
            )
          })
        }
      </ToggleButtonGroup>
    </ThemeProvider>
  )
}

export const FoodCategory = (props) => {

  const handleCategoryChange = (e) => {
    console.log(e.target.value)
    if (e.target.value !== undefined) {
      const index = props.selectedCategories.indexOf(e.target.value)
      if (index === -1) {
        props.setSelectedCategories([...props.selectedCategories, e.target.value])
      } else {
        props.setSelectedCategories(props.selectedCategories.filter((cat) => cat !== e.target.value))
      }
    }
  }

  return (
    <div className='flex flex-row w-[628px]'>
      <ThemeProvider theme={categoryToggleTheme}>
        <ToggleButtonGroup value={props.selectedCategories} exclusive onChange={handleCategoryChange}>
          {
            categories.map((item, idx) => (
              <ToggleButton className={(idx === 11 || idx === 18 || idx === 25 || idx === 31) ? 'first-cate ms-[12px]' : ''} 
                value={item} key={`type-${idx}`}>{item} </ToggleButton>
            ))
          }
        </ToggleButtonGroup>
      </ThemeProvider>
    </div>
  )
}