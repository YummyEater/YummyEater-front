import { API_BASE_URL } from "src/api-config";
export function call (api, method, request) {
    let options = {
        headers: new Headers({
            "Content-Type": "application/json",
        }),
        url: API_BASE_URL + api,
        method: method,
    };

    if (request) {
        //GET method
        options.body = JSON.stringify(request);
    }
    
    return fetch(options.url, options).then((response) => {
        if (response.status === 200) {
            return response.json();
        }
    }).catch((error) => {
        console.log("http error");
        console.log(error);
    });
}

// 로그인 요청
export function signin(userDTO) {
    return call("/api/user/signIn", "POST", userDTO)
        .then((response) => {
            console.log(response);
        });
}

export function sendPWResetLink(userDTO) {
    return call("/api/user/sendResetPasswordLink", "POST", userDTO)
        .then((response) => {
            console.log(response);
        });
}