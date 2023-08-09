import React, { useState, useEffect } from 'react'

import { Skeleton, InputLabel, FormControl, Select, MenuItem, ThemeProvider } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { ChevronDown } from '../assets/icons';
import { selectTheme } from '../themes';

// 정렬
export const Sorting = (props) => {
  const handleReviewSort = (event) => {
    let sortUrl = props.apiURL;
    if (event.target.value != '') {
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