import React, { useState } from 'react'
import { deleteReview } from '../../service/ApiService'
import { colors } from '../../themes/Colors'
import { statRatingTheme } from '../../themes'
import { RatingFilled, RatingEmpty, MoreV } from '../../assets/icons'

import { Rating, ThemeProvider, styled, LinearProgress, linearProgressClasses, Menu, MenuItem, IconButton } from '@mui/material'

const BorderLinearProgress = styled(LinearProgress)({
  height: 16, width: '150px', borderRadius: 6,
  [`&.${linearProgressClasses.colorPrimary}`]: { backgroundColor: colors.palette.gray.light, },
  [`& .${linearProgressClasses.bar}`]: { backgroundColor: colors.palette.orange.main, },
});

export const ReviewStats = (props) => {
  return (
    <div className='flex flex-row flex-wrap w-[400px] pt-[10px] justify-self-center justify-between items-center'>
      <div className='flex flex-col items-center'>
        <span className='text-[14px]'>총 {props.num}건</span>
        <span className='text-[18px] font-semibold leading-[160%]'>{props.rating.toFixed(1)}</span>
        <ThemeProvider theme={statRatingTheme}>
          <Rating className='w-auto pt-[5px]' value={props.rating} precision={0.5} icon={<RatingFilled />} emptyIcon={<RatingEmpty />} readOnly></Rating>
        </ThemeProvider>
      </div>
      <div className='flex flex-col'>
        {
          Object.keys(props.ratingData).slice(0).reverse().map((rt, idx) => {
            let curr = Object.keys(props.ratingData).length - idx
            return (
              <div className='grid grid-cols-[24px_150px_auto] gap-[15px] items-center ' key={`reviewstat-row-${idx}`}>
                <span className='w-[24px]'>{curr}점</span>
                <BorderLinearProgress variant="determinate" value={props.ratingData[rt] === 0 ? 0 : (props.ratingData[rt] / props.num) * 100} />
                <span className='justify-self-end'><span>{props.ratingData[rt]}</span></span>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export const ReviewTool = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (e) => { setAnchorEl(e.currentTarget); }
  const handleClose = (e) => { setAnchorEl(null); }
  const handleModifyReview = (e) => {
    props.handleEdit(props.reviewId)
  }
  const handleDeleteReview = (e) => {
    if (window.confirm("리뷰를 삭제하시겠습니까?")) { deleteReview(props.reviewId, props.updateReview); }
  }

  return (
    <div className='flex items-center'>
      <IconButton onClick={handleClick} aria-controls={open ? 'account-menu' : undefined}
        aria-expanded={open ? 'true' : undefined} className='p-[4px]'>
        <MoreV />
      </IconButton>
      <Menu anchorEl={anchorEl} id='account-menu' open={open} onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right', }} keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right', }} sx={{ mt: '35px' }}>
        <MenuItem className='px-[25px]' onClick={handleModifyReview}>수정</MenuItem>
        <MenuItem className='px-[25px]' onClick={handleDeleteReview}>삭제</MenuItem>
      </Menu>
    </div>
  )
}