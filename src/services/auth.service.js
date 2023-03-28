import axios from "axios";


class AuthService {
  constructor() {
    
    this.api = axios.create({
      baseURL: process.env.REACT_APP_SERVER_URL || "http://localhost:5006",
    });

    // Automatically set JWT token on the request headers for every request
    this.api.interceptors.request.use((config) => {
      // Retrieve the JWT token from the local storage
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });
  }


  getUser = (userId) =>{
    return this.api.get(`/api/users/${userId}`)
  }

  uploadImage = (file) => {
    return this.api.post("api/upload", file)
  }

  login = (requestBody) => {
    return this.api.post("/auth/login", requestBody);
    // same as
    // return axios.post("http://localhost:5005/auth/login");
  };

  updateUserinfo = (id, requestBody) =>{
    return this.api.put(`/api/users/${id}`, requestBody)
  }

  modifyPassword= (id,requestBody)=>{
    return this.api.put(`/api/users/${id}/modify-password`, requestBody)
  }
  verify = () => {
    return this.api.get("/auth/verify");
    // same as
    // return axios.post("http://localhost:5005/auth/verify");
  };
}

// Create one instance (object) of the service
const authService = new AuthService();

export default authService;
