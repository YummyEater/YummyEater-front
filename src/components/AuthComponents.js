import { Collapse } from '@mui/material';

export const UserVerifyText = (props) => {
  const VerifyText = () => {
    if (!props.usrname.formatted) {
      return <span className='text-[13px] text-danger-red'>닉네임 형식을 확인해주세요.</span>
    } else {
      if (!props.usrname.unique) {
        return <span className='text-[13px] text-danger-red'>이미 사용중인 닉네임입니다.</span>
      } else {
        return <span className='text-[13px] text-success-green'>사용 가능한 닉네임입니다.</span>
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
          <span className='ps-[10px] text-[13px] text-danger-red'>비밀번호가 일치하지 않습니다.</span>
      </Collapse>
    </>
  )
}