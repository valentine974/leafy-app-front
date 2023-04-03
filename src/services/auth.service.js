import axios from "axios"; 


// centralize all the API calls in this service
// so that we can easily change the base URL

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

  
  createCompany = (requestBody) => {
    return this.api.post(`/api/create-company`,requestBody)
  }

  updateCompany = (id,requestBody) => {
    return this.api.put(`/api/companies/${id}`,requestBody)
  }

  getCompanies = ()=> {

    return this.api.get(`/api/companies`)
  }

  getCompany = (companyId) =>{
    return this.api.get(`/api/companies/${companyId}`)
  }

  createUser = (requestBody) => {
    return this.api.post(`/auth/create-user`,requestBody)
  }

  getUsers = ()=> {
    return this.api.get(`/api/users`)
  }

  getUser = (userId) =>{
    return this.api.get(`/api/users/${userId}`)
  }

  updateUser = (id, requestBody) =>{
    return this.api.put(`/api/users/${id}`, requestBody)
  }

  createRequest = (requestBody) => { 
    return this.api.post(`/api/user/create-request`,requestBody)
  }

  updateRequest = (id, requestBody) => { 
    return this.api.put(`/api/request/${id}/settings`,requestBody)
  }

  deleteRequest = (id)=>{
    return this.api.delete(`/api/request/${id}`)
  }

  getRequests = () =>{
  
    return this.api.get(`/api/requests`)
  }
  getRequest = (id) =>{
  
    return this.api.get(`/api/request/${id}`)
  }
  

  uploadImage = (file) => {
    return this.api.post(`/api/upload`, file)
  }

  login = (requestBody) => {
    return this.api.post("/auth/login", requestBody);
  };



  modifyPassword= (id,requestBody)=>{
    return this.api.put(`/api/users/${id}/modify-password`, requestBody)
  }
  verify = () => {
    return this.api.get("/auth/verify");
  };
}

// Create one instance (object) of the service
const authService = new AuthService();

export default authService;
