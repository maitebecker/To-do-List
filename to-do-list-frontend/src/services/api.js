import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5088'
});

// Add a request interceptor
api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );


  // Add a response interceptor
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
  
      if (error.response && error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
  
        try {
          const refreshToken = localStorage.getItem('refreshToken');
          const response = await axios.post('http://localhost:5088/auth/refresh-token', { refreshToken });
          const { token } = response.data;
  
          localStorage.setItem('token', token);
  
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return axios(originalRequest);
        } catch (refreshError) {
          // lidar com erro de refresh token
          console.log("refresh")
        }
      }
  
      return Promise.reject(error);
    }
  );
  
  

export { api }