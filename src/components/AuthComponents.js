import { Collapse } from '@mui/material';

export const UserVerifyText = (props) => {
  const VerifyText = () => {
    if (!props.usrname.formatted) {
      return <div className='text-[13px] text-danger-red'>닉네임 형식을 확인해주세요.</div>
    } else {
      if (!props.usrname.unique) {
        return <div className='text-[13px] text-danger-red'>이미 사용중인 닉네임입니다.</div>
      } else {
        return <div className='text-[13px] text-success-green'>사용 가능한 닉네임입니다.</div>
      }
    }
  }

  return (
    <>
      <Collapse in={props.usrname.entered && props.usrnameChecked.checked} timeout="auto">
        <VerifyText />
      </Collapse>
    </>
  )
}

export const PwMatchText = (props) => {
  return (
    <>
      <Collapse in={props.pwMatch.entered2 && !(props.pwMatch.matched)} timeout="auto">
          <div className='text-[13px] text-danger-red'>비밀번호가 일치하지 않습니다.</div>
      </Collapse>
    </>
  )
}