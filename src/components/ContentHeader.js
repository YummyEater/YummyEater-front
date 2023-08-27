import React from 'react'

const ContentHeader = (props) => {
  const classString = `flex justify-center font-extrabold text-[24px] pb-[${props.pb ?? '75px'}] select-none`
  return (
    <div className={classString}>
      {props.title}
    </div>
  )
}

export default ContentHeader