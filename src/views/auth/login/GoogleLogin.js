import React from 'react';
// import { google } from '../../../assets/icons';

export const GoogleLogin = () => {
  return (
    <div>
      {/* <div id="google-login-api" ref={googleSignInButton} /> */}
      <a href='http://localhost:8080/oauth2/authorization/google'>
        <button className="gButton">
          <div className='gButton1'></div>
          <div className='gButton2'>
            {/* <span className="gIcon"><CIcon icon={google} height={18} width={18} /></span> */}
            <span className="gText">Google 계정으로 계속하기</span>
          </div>
        </button>
      </a>

    </div>
  )
}