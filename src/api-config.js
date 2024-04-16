let backendHost;

const hostname = window && window.location && window.location.hostname;

// if (hostname === "localhost") {
//     backendHost = "http://localhost:8080";
// } else {
    backendHost = process.env.REACT_APP_BACK_BASE_URL
// }

export const API_BASE_URL = `${backendHost}`;