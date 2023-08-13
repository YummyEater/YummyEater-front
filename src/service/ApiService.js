import { _ } from "core-js";
import { API_BASE_URL } from "../api-config";
import { useEffect } from 'react';

export async function call(api, method, request) {
  let options = {
    headers: new Headers({
      "Content-Type": "application/json",
    }),
    url: API_BASE_URL + api,
    method: method,
  };

  if (request) {
    options.body = JSON.stringify(request);
  }

  return fetch(options.url, options).then(async (response) => {
    console.log(`&&& ${response.status}`)
    if (response.status === 200) {
      return response.json();
    }
    return response.text().then(text => { throw new Error(text) })
  })
}

// Authorization 헤더 필요한 API
export async function callH(api, method, request) {
  let headers = new Headers({
    "Content-Type": "application/json",
  });
  // 토큰
  const accessToken = localStorage.getItem("ACCESS_TOKEN");
  if (accessToken && accessToken != null) {
    headers.append("Authorization", "Bearer " + accessToken);
  }

  let options = {
    headers: headers,
    url: API_BASE_URL + api,
    method: method,
  };

  if (request) {
    options.body = JSON.stringify(request);
  }

  return fetch(options.url, options).then(async (response) => {
    console.log(`&&& ${response.status}`)
    if (response.status === 200) {
      return response.json();
    }
    return response.text().then(text => { throw new Error(text) })
  })
}

// 토큰 처리
// - 만료 여부 판단 : 30분
export function checkLogged() {
  const now = new Date();
  const loginTime = localStorage.getItem("SAVED_TIME");
  let elapsed = now.getTime() - loginTime;
  if (elapsed < 30 * 1000 * 60) {
    return true
  } else {
    return false
  }
}

// - accessToken 재발급
export async function refreshAccessToken(navigate) {
  const access = localStorage.getItem("ACCESS_TOKEN");
  const refresh = localStorage.getItem("REFRESH_TOKEN");

  const tokens = { "accessToken": access, "refreshToken": refresh }

  return call("/api/user/refreshAccessToken", "POST", tokens)
    .then((response) => {
      console.log(response);
      if (response.errorCode === "C00000") {
        const date = new Date();
        localStorage.setItem("ACCESS_TOKEN", response.data.accessToken);
        // // refresh token도 재발급하는 경우
        // localStorage.setItem("REFRESH_TOKEN", response.data.refreshToken);
        localStorage.setItem("SAVED_TIME", date.getTime());
      }
      // else if (response.errorCode === "C10001") {
      //   alert("로그인이 유효하지 않습니다.")
      // } else if (response.errorCode === "FORBIDDEN") {
      //   alert("로그인이 유효하지 않습니다.")
      // }
    })
    .catch((error) => {
      alert("로그인이 유효하지 않습니다. 다시 로그인해주세요.")
      signout(navigate)
    })
}


// 로그인 요청
export async function signin(userDTO, navigate) {
  return call("/api/user/signIn", "POST", userDTO)
    .then((response) => {
      console.log(response);
      if (response.errorCode === "C00000") {
        const date = new Date();
        localStorage.setItem("ACCESS_TOKEN", response.data.accessToken);
        localStorage.setItem("REFRESH_TOKEN", response.data.refreshToken);
        localStorage.setItem("SAVED_TIME", date.getTime());
        // window.location.href = "/";
        navigate("/");
      }
    }).catch((error) => {
      console.error(error)
      if (error.errorCode === "UL00000") {
        alert("로그인에 실패했습니다. 입력 정보를 다시 확인해주세요.");
      }
    });
}

// 로그아웃 요청
export function signout(navigate) {
  localStorage.removeItem("ACCESS_TOKEN");
  localStorage.removeItem("REFRESH_TOKEN");
  localStorage.removeItem("SAVED_TIME");
  navigate(0);
}

// 비밀번호 재설정 요청
export async function sendPWResetLink(userDTO) {
  return call("/api/user/sendResetPasswordLink", "POST", userDTO)
    .then((response) => {
      console.log(response);
    });
}

// 회원가입 요청
export async function register(nav, userDTO) {
  return call("/api/user/join", "POST", userDTO)
    .then((response) => {
      if (response.errorCode === "C00000") {
        alert("성공적으로 가입되었습니다.");
        nav('/dashboard');
      }
    }).catch((error) => {
      console.error(error)
      if (error.errorCode === "C100000") {
        alert("가입에 실패했습니다. 입력 정보를 다시 확인해주세요.");
      }
    });
}

// 회원정보 조회
export async function getUserinfo(setUserinfo) {
  callH("/api/user/info", "GET", null)
    .then((response) => {
      console.log(response);
      if (response.errorCode === "C00000") {
        setUserinfo(response.data);
      }
    }).catch((error) => {
      if (error.errorCode === "C10000" || error.errorCode === "C10001") {
        alert("회원정보 조회를 실패했습니다. 페이지를 새로고침하거나 다시 로그인해주세요.");
      }
    });
}

// 회원정보 변경 요청
export async function modifyuser(nav, userDTO) {
  return callH("/api/user/info", "PATCH", userDTO)
    .then((response) => {
      console.log(response)
      if (response.errorCode === "C00000") {
        alert("정보가 성공적으로 수정되었습니다.");
        nav('/userinfo');
      } else if (response.errorCode === "UM00000") {
        alert(response.message);
        console.log(response);
      }
    })
    .catch((error) => {
      if (error.errorCode === "UM00000") {
        alert(error.message);
      } else if (error.errorCode === "C10001") {
        alert("정보 수정 요청을 처리하지 못했습니다. 다시 로그인해 시도해주세요.");
      }
    });
}

export async function uploadImg(blob) {
  const formData = new FormData();
  formData.append('resource', blob);

  let options = {
    headers: new Headers({}),
    url: API_BASE_URL + '/upload',
    method: "POST",
    body: formData,
  };

  return fetch(options.url, options).then((response) => {
    if (response.status === 200) {
      return response.json();
    }
  }).catch((error) => {
    console.log("http error");
    console.log(error);
    alert('이미지 업로드를 실패했습니다. 다시 시도해주세요.')
  });
}

// 게시물 삭제
export async function deleteArticle(articleId, navigate) {
  let apiUrl = `/api/food/${articleId}`;
  return callH(apiUrl, "DELETE", null)
    .then((response) => {
      console.log(response.errorCode);
      if (response.errorCode === "C00000") {
        alert("게시물이 삭제되었습니다.");
        navigate(-1);
      }
    }).catch((error) => { 
      if (error.errorCode === "C100000" || "C10002") {
        alert('게시물 삭제를 실패했습니다. 다시 시도해주세요.') 
      } else if (error.errorCode === "C10001") {
        alert("게시물 삭제를 실패했습니다. 다시 로그인해 시도해주세요.");
      }
    })
}

// 리뷰 삭제
export async function deleteReview(reviewId, updateReview) {
  let apiUrl = `/api/food/review/${reviewId}`;
  return callH(apiUrl, "DELETE", null)
    .then((response) => {
      console.log(response.errorCode);
      if (response.errorCode === "C00000") {
        alert("리뷰가 삭제되었습니다.");
        updateReview();
      }
    }).catch(
      (error) => { alert('리뷰 삭제를 실패했습니다. 다시 시도해주세요.') }
    )
}

// for OAUTH
export const useScript = (url, onload) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = url;
    script.onload = onload;

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    }
  }, [url, onload])
}