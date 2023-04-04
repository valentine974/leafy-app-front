
import './App.css';
import {Routes, Route} from "react-router-dom"
import CompanyCreationPage from './pages/Company/CompanyCreationPage';
import CompanySettingPage from "./pages/Company/CompanySettingPage"; 
import ModifyPasswordPage from "./pages/LoginPage/ModifyPasswordPage"
import RequestCreationPage from "./pages/Requests/RequestCreationPage"
import RequestReviewPage from "./pages/Requests/RequestReviewPage"
import RequestSettingPage from "./pages/Requests/RequestSettingPage"
import UserCreationPage from "./pages/ProfilePage/UserCreationPage"
import UserSettingPage from "./pages/ProfilePage/UserSettingPage"
import HomePage from "./pages/HomePage/HomePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage"; 
import LoginPage from "./pages/LoginPage/LoginPage";
import Navbar from "./components/Navbar/Navbar";
import IsPrivate from "./components/IsPrivate/IsPrivate";
import IsAnon from "./components/IsAnon/IsAnon";
import CompaniesPage from './pages/Company/CompaniesPage';
import CompanyPage from './pages/Company/CompanyPage';
import UsersPage from './pages/ProfilePage/UsersPage';
import RequestHandlingPage from './pages/Requests/RequestHandlingPage';

function App() {
  return (
    <div className="App">
    <Navbar/>
     <Routes>
      {/* DONE */}
      <Route path="/user/:id" element={ <IsPrivate><ProfilePage /> </IsPrivate> } /> 
      <Route path="/" element={ <HomePage/>  }></Route> 
      <Route path="/login" element={<LoginPage />}/>
      <Route path="/user/modify-password" element={ <IsPrivate> <ModifyPasswordPage/> </IsPrivate>   }></Route>
      <Route path="/user/:id/settings" element={ <IsPrivate><UserSettingPage/> </IsPrivate>}></Route>
      <Route path="/create-company" element={ <CompanyCreationPage/>  }></Route>
      <Route path="/company/:id/settings" element={ <CompanySettingPage/>  }></Route>
      <Route path="/companies" element={ <CompaniesPage/>  }></Route>
      <Route path="/company/:id" element={ <CompanyPage/>  }></Route>
      <Route path="/users" element={ <UsersPage/>}></Route>
      <Route path="/create-user" element={ <UserCreationPage/>}></Route>

      {/* TO DO */}
      {/* users route */}
      <Route path="/handle-request" element={ <RequestHandlingPage/>  }></Route>
      <Route path="/create-request" element={ <RequestCreationPage></RequestCreationPage> }></Route>
      <Route path="/request/review" element={ <RequestReviewPage/>  }></Route>
      <Route path="/request/:id/settings" element={ <RequestSettingPage/>  }></Route>

     </Routes>
    </div>
  );
}

export default App;

 

