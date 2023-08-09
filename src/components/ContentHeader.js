import React from 'react'

const ContentHeader = (props) => {
  return (
    <div className='flex justify-center font-extrabold text-[24px] pb-[75px] select-none'>
      {props.title}
    </div>
  )
}

export default ContentHeader