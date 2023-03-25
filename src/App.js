
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




function App() {
  return (
    <div className="App">
    <Navbar/>
     <Routes>
      {/* DONE */}
      <Route path="/user" element={ <IsPrivate><ProfilePage /> </IsPrivate> } /> 
      <Route path="/" element={ <HomePage/>  }></Route> 

      {/* TO DO */}
      <Route path="/create-company" element={ <CompanyCreationPage/>  }></Route>
      <Route path="/company/:id" element={ <CompanySettingPage/>  }></Route>
      <Route path="/login" element={<LoginPage />}/>
      <Route path="/user/modify-password" element={ <IsPrivate> <ModifyPasswordPage/> </IsPrivate>   }></Route>
      <Route path="/create-request" element={ <RequestCreationPage></RequestCreationPage> }></Route>
      <Route path="/request/review" element={ <RequestReviewPage/>  }></Route>
      <Route path="/request/:id/setting" element={ <RequestSettingPage/>  }></Route>
      <Route path="/create-user" element={ <UserCreationPage/>  }></Route>
      <Route path="/user/:id/settings" element={ <UserSettingPage/>  }></Route>

  
     </Routes>
    </div>
  );
}

export default App;

 

