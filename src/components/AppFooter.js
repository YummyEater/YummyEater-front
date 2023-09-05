import React from 'react'

const AppFooter = () => {
  return (
    <div className='relative bottom-0 flex justify-center bg-white z-10 h-[40px]'>
      <div className='flex flex-row w-[500px] max-[550px]:w-full max-w-[500px] justify-center items-center pt-[10px] mb-[15px] mx-[25px] border-t-[0.5px] text-[11px] gap-[25px]'>
        <a>소개</a>
        <a>문의</a>
        <a>이용약관</a>
        <a>개인정보처리방침</a>
      </div>
    </div>
  )
}

export default AppFooter