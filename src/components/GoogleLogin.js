import React from 'react';
import { Google } from '../assets/icons'

const GoogleLogin = () => {
  return (
    <div className='max-w-[350px] w-full'>
      <a href='http://localhost:8080/oauth2/authorization/google'>
        <button className="gButton">
          <div className='gButton1'></div>
          <div className='gButton2'>
            <span className='gIcon'><Google className='h-[18px] w-[18px]' /></span>
            <span className="gText">Google 계정으로 계속하기</span>
          </div>
        </button>
      </a>
    </div>

  )
}

export default GoogleLogin