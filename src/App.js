
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
import menuImage from '../src/Images/menu.png'
import ConversationPage from './pages/ConversationPage/ConversationPage';
import ConversationListPage from './pages/ConversationPage/ConversationListPage';

import { useState } from 'react';


function App() {
  const [toggleMenuPage, setToggleMenuPage] = useState("closeNavbar")
  const [togglePage, setTogglePage] = useState("openPage")
  console.log("menu state in page ini",toggleMenuPage)


  const handleMenu =()=>{

    toggleMenuPage ==="displayNavbar"?setToggleMenuPage("closeNavbar"):setToggleMenuPage("displayNavbar") 
    toggleMenuPage ==="closeNavbar"?setTogglePage("closePage"):setTogglePage("displayPage") 
     
   
    
  }
 
  return (
    <div className="App"> 
    <Navbar handleMenu={handleMenu} toggleMenuPage={toggleMenuPage}/>
     
    <div className={`page ${togglePage}`} onClick={()=>handleMenu()}> 


    <div className="header">
    <img src={menuImage} alt="Menu" onClick={()=>handleMenu()}/> 
    </div>

    <Routes>
      {/* DONE */}
      <Route path="/user/:id" element={ <IsPrivate><ProfilePage /> </IsPrivate> } /> 
      <Route path="/" element={ <HomePage togglePage={togglePage}/>  }></Route> 
      <Route path="/login" element={<LoginPage />}/>
      <Route path="/user/modify-password" element={ <IsPrivate> <ModifyPasswordPage togglePage={togglePage}/> </IsPrivate>   }></Route>
      <Route path="/user/:id/settings" element={ <IsPrivate><UserSettingPage togglePage={togglePage}/> </IsPrivate>}></Route>
      <Route path="/create-company" element={ <CompanyCreationPage togglePage={togglePage}/>  }></Route>
      <Route path="/company/:id/settings" element={ <CompanySettingPage togglePage={togglePage}/>  }></Route>
      <Route path="/companies" element={ <CompaniesPage togglePage={togglePage}/>  }></Route>
      <Route path="/company/:id" element={ <CompanyPage togglePage={togglePage}/>  }></Route>
      <Route path="/users" element={ <UsersPage togglePage={togglePage}/>}></Route>
      <Route path="/create-user" element={ <UserCreationPage togglePage={togglePage}/>}></Route>
      <Route path="/handle-request" element={ <RequestHandlingPage togglePage={togglePage}/>  }></Route>
      <Route path="/create-request" element={ <RequestCreationPage togglePage={togglePage}/> }></Route>
      <Route path="/request/review" element={ <RequestReviewPage togglePage={togglePage}/>  }></Route>
      <Route path="/request/:id/settings" element={ <RequestSettingPage togglePage={togglePage}/>  }></Route>

      {/* TO DO */}
      {/* conversation route */}
      <Route path="/conversations" element={ <ConversationListPage togglePage={togglePage}/> }></Route>
      <Route path="/conversation/:id" element={ <ConversationPage togglePage={togglePage}/> }></Route>
     </Routes>
     </div>
    
    </div>
  );
}

export default App;

 

