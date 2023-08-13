import React from 'react'
import AppHeaderTool from '../components/AppHeaderTool'

export const AppHeader1 = () => {
  return (
    <div className='sticky top-0 pt-[68px] pb-[48px] px-[110px] max-[780px]:px-[50px] bg-[white] z-10'>
      <div className='flex flex-row justify-between items-center'>
        <a href='/' className='select-none'>
          <span className='text-[20px] font-bold'>Yummy</span>
          <span className='text-[20px] font-normal'>Eater</span>
        </a>
        <AppHeaderTool />
      </div>
    </div>
  )
}

export const AppHeader2 = () => {
  return (
    <div className='sticky top-0 pt-[68px] pb-[48px] px-[110px] max-[780px]:px-[50px] bg-[white] z-10'>
      <div className='flex flex-row justify-between items-center'>
        <a href='/' className='select-none'>
          <span className='text-[20px] font-bold'>Yummy</span>
          <span className='text-[20px] font-normal'>Eater</span>
        </a>
      </div>
    </div>
  )
}