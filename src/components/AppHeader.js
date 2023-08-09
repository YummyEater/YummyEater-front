import React from 'react'
import AppHeaderTool from '../components/AppHeaderTool'

const AppHeader = () => {
  return (
    <div className='sticky top-0 pt-[68px] pb-[48px] px-[110px] max-[780px]:px-[50px] bg-[white] z-10'>
      <div className='flex flex-row justify-between items-center'>
        <a href='/' className='select-none'>
          <span className='text-[20px] font-bold'>Yummy</span>
          <span className='text-[20px] font-normal'>Eater</span>
        </a>
        {/* <div className='d-flex flex-row gap-[10px]'>
          <p className="flex w-6 h-6">
            <a href="/login"><Login /></a>
          </p>
        </div> */}
        <AppHeaderTool />
      </div>
    </div>
  )
}

export default AppHeader