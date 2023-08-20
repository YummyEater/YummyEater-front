import React, { useRef, useState } from 'react'
import { editorInputTheme, addButtonTheme, uploadImgButtonTheme } from '../../themes'
import { X, XFill, Image } from '../../assets/icons'
import { uploadImg } from '../../service/ApiService'
import { ThemeProvider, TextField, Button, Collapse, IconButton } from '@mui/material'

export const TitleLabel = (props) => {
  return (
    <div className="flex flex-row gap-[4px] w-[122px] text-[16px] font-semibold">
      <span>{props.label}</span>
      { props.req === 1 ? <span className="text-point-orange">*</span> : <></> }
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

export const InputIngredient = (props) => {
  // 추가
  const targetRef1 = useRef(null);
  const targetRef2 = useRef(null);
  const handleAdd = (e) => {
    if (targetRef1.current.value !== '' && targetRef2.current.value !== '') {
      const targetVal = `${targetRef1.current.value} ${targetRef2.current.value}`
      const index = props.targets.indexOf(targetVal)
      if (targetVal.length > 0 && index === -1) { props.setTargets([...props.targets, targetVal]) }

      targetRef1.current.value = "";
      targetRef2.current.value = "";
    }
  }
  // 삭제
  const handleRemove = (e) => {
    props.setTargets(props.targets.filter((tg) => tg !== e.currentTarget.parentNode.innerText))
  }

  return (
    <div className='flex flex-col'>
      <div className='flex flex-row gap-[24px]'>
        <ThemeProvider theme={editorInputTheme}>
          <TextField className='w-[125px]' variant="outlined" placeholder='재료' inputRef={targetRef1} onKeyDown={e => handleEnter(e, handleAdd)} />
          <TextField className='w-[125px]' variant="outlined" placeholder='양' inputRef={targetRef2} onKeyDown={e => handleEnter(e, handleAdd)} />
        </ThemeProvider>
        <ThemeProvider theme={addButtonTheme}>
          <Button type="button" onClick={handleAdd}>추가</Button>
        </ThemeProvider>
      </div>
      <Collapse in={props.targets.length > 0} timeout="auto">
        <div className='flex flex-row gap-[5px] mt-[10px]'>
          {
            props.targets.map((item, idx) => (
              <div className='flex flex-row output-wrap' key={`ingred-${idx}`}>
                {item}
                <IconButton className='cursor-pointer p-0' disableRipple onClick={handleRemove}><X /></IconButton>
              </div>
            ))
          }
        </div>
      </Collapse>
    </div>
  )
}

export const InputTag = (props) => {
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
    props.setTargets(props.targets.filter((tg) => tg !== e.currentTarget.parentNode.innerText.slice(2)))
  }

  return (
    <div className='flex flex-col'>
      <div className='flex flex-row gap-[24px]'>
        <ThemeProvider theme={editorInputTheme}>
          <TextField className='w-[200px]' variant="outlined" placeholder='포함하려는 태그 입력해 추가' inputRef={targetRef} onKeyDown={e => handleEnter(e, handleAdd)} />
        </ThemeProvider>
        <ThemeProvider theme={addButtonTheme}>
          <Button type="button" onClick={handleAdd}>추가</Button>
        </ThemeProvider>
      </div>
      {
        props.targets
          ? <Collapse in={props.targets.length > 0} timeout="auto">
            <div className='flex flex-row flex-wrap gap-[5px] mt-[10px]'>
              {
                props.targets.map((item, idx) => (
                  <div className='flex flex-row output-wrap' key={`tag-${idx}`}>
                    # {item}
                    <IconButton className='cursor-pointer p-0' disableRipple onClick={handleRemove}><X /></IconButton>
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

export const InputThumb = (props) => {
  const handleThumb = () => { (props.thumbRef).current.click(); }

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file)
      reader.onload = async () => {
        await uploadImg(file).then((response) => { props.setThumbImg(response.data.resourceURL) })
      }
    }
  }
  const handleDelete = () => { props.setThumbImg(undefined) }

  const UploadImgButton = () => {
    return (
      <ThemeProvider theme={uploadImgButtonTheme}>
        <Button onClick={handleThumb}><Image /></Button>
      </ThemeProvider>
    )
  }

  const UploadImgPreview = (props) => {
    const [classN, setClassN] = useState('hidden')

    return (
      <div className='w-[100px] h-[100px] rounded-[10px] bg-contain bg-center' style={{backgroundImage: `url(${props.thumbImg})`}}
        onMouseEnter={e => {setClassN('flex justify-end items-start p-[8px] w-[100px] h-[100px] rounded-[10px] bg-[#878f9c30]')}}
        onMouseLeave={e => {setClassN('hidden')}} >
        <div className={classN}>
          <IconButton disableRipple className='p-0' onClick={handleDelete}><XFill/></IconButton>
        </div>
      </div>
    )
  }

  return (
    <div >
      {
        props.thumbImg && (props.thumbImg !== undefined)
          ? <UploadImgPreview thumbImg={props.thumbImg} /> : <UploadImgButton />
      }
      <input className="hidden" type="file" accept='img/*' ref={props.thumbRef} onChange={handleUpload}></input>
    </div>
  )
}