import axios from 'axios';

// Function to get CSRF token from cookies
const getCsrfTokenFromCookie = () => {
    const match = document.cookie.match(/XSRF-TOKEN=([^;]*)/);
    return match ? decodeURIComponent(match[1]) : null;
};

// Axios instance with base configuration
const api = axios.create({
    baseURL: 'http://localhost:8080',  // Spring Boot API Gateway
    withCredentials: true,  // Send cookies with requests
});

// Request interceptor to add CSRF token
api.interceptors.request.use((config) => {
    const csrfToken = getCsrfTokenFromCookie();
    if (csrfToken) {
        config.headers['X-XSRF-TOKEN'] = csrfToken;
    }
    return config;
}, (error) => Promise.reject(error));

export default api;

