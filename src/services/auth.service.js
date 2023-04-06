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

  /* --------------------- company ----------------------- */
  
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

  /* ---------------------- messagings ----------------------  */

  createConversation = (requestBody) => {
    return this.api.post(`/api/create-conversation`,requestBody)
  }

  getConversations = ()=> { 
    return this.api.get(`/api/conversations`)
  }

  getConversation = (conversationId) =>{
    return this.api.get(`/api/conversation/${conversationId}`)
  }

  deleteConversation = (conversationId) =>{
    return this.api.delete(`/api/conversation/${conversationId}`)
  }

  getUserConversations = (userId) =>{
    return this.api.get(`/api/user/${userId}/conversations`)
  }

  sendMessage = (conversationId, requestBody) =>{
    return this.api.post(`/api/conversation/${conversationId}/send-message`, requestBody)
  }

  deleteMessage = (conversationId, messageId) =>{
    return this.api.delete(`/api/conversation/${conversationId}/delete-message/${messageId}`)
  }

  addParticipant = (conversationId, requestBody) =>{
    return this.api.post(`/api/conversation/${conversationId}/add-participant`, requestBody)
  }

  removeParticipant = (conversationId, userId) =>{
    return this.api.delete(`/api/conversation/${conversationId}/remove-participant/${userId}`)
  }

  /* ---------------------- users ---------------------- */


  createUser = (requestBody) => {
    return this.api.post(`/auth/create-user`,requestBody)
  }

  getUsers = ()=> {
    return this.api.get(`/api/users`)
  }

  getUser = (userId) =>{
    return this.api.get(`/api/user/${userId}`)
  }

  deleteUser = (id) =>{
    return this.api.delete(`/api/user/${id}`)
  }
  updateUser = (id, requestBody) =>{
    return this.api.put(`/api/user/${id}/settings`, requestBody)
  }

  modifyPassword= (id,requestBody)=>{
    return this.api.put(`/api/user/${id}/modify-password`, requestBody)
  }


  /* ---------------------- requests ---------------------- */

  createRequest = (requestBody) => { 
    return this.api.post(`/api/user/create-request`,requestBody)
  }

  updateRequest = (id, requestBody) => { 
    return this.api.put(`/api/request/${id}/settings`,requestBody)
  }

  deleteRequest = (id)=>{
    return this.api.delete(`/api/request/${id}`)
  }
  getUserRequests = (userId) =>{  
    return this.api.get(`/api/user/${userId}/requests`)
  }
  
  getRequests = () =>{
  
    return this.api.get(`/api/requests`)
  }
  getRequest = (id) =>{
  
    return this.api.get(`/api/request/${id}`)
  }
  
  /* ---------------------- auth ---------------------- */


  login = (requestBody) => {
    return this.api.post("/auth/login", requestBody);
  };

  verify = () => {
    return this.api.get("/auth/verify");
  };

  /* --------------------- utils -------------------- */
  uploadImage = (file) => {
    return this.api.post(`/api/upload`, file)
  }

}

// Create one instance (object) of the service
const authService = new AuthService();

export default authService;
