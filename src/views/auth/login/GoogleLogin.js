import React from 'react';

export const GoogleLogin = () => {
  return (
    <div>
      <a href='http://localhost:8080/oauth2/authorization/google'>
        <button className="gButton">
          <div className='gButton1'></div>
          <div className='gButton2'>
            <span className="gText">Google 계정으로 계속하기</span>
          </div>
        </button>
      </a>
    </div>
  )
}