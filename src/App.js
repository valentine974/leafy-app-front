
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


// font awesome
import {library} from "@fortawesome/fontawesome-svg-core";
import {fab} from "@fortawesome/free-brands-svg-icons";
import {faMessage}  from "@fortawesome/free-solid-svg-icons";
library.add(fab, faMessage)


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

       {/* need to add isPrivate */}
      <Route path="/user/modify-password" element={ <IsPrivate> <ModifyPasswordPage togglePage={togglePage}/> </IsPrivate>   }></Route>
      <Route path="/user/:id/settings" element={ <IsPrivate><UserSettingPage togglePage={togglePage}/> </IsPrivate>}></Route>
      <Route path="/create-company" element={ <IsPrivate><CompanyCreationPage togglePage={togglePage}/> </IsPrivate>     }></Route>
      <Route path="/company/:id/settings" element={  <IsPrivate><CompanySettingPage togglePage={togglePage}/></IsPrivate>   }></Route>
      <Route path="/companies" element={  <IsPrivate><CompaniesPage togglePage={togglePage}/></IsPrivate>  }></Route>
      <Route path="/company/:id" element={ <IsPrivate><CompanyPage togglePage={togglePage}/> </IsPrivate>  }></Route>
      <Route path="/users" element={ <IsPrivate><UsersPage togglePage={togglePage}/></IsPrivate> }></Route>
      <Route path="/create-user" element={ <IsPrivate><UserCreationPage togglePage={togglePage}/></IsPrivate>}></Route>
      <Route path="/handle-request" element={ <IsPrivate><RequestHandlingPage togglePage={togglePage}/> </IsPrivate> }></Route>
      <Route path="/create-request" element={ <IsPrivate><RequestCreationPage togglePage={togglePage}/></IsPrivate>  }></Route>
      <Route path="/request/review" element={ <IsPrivate><RequestReviewPage togglePage={togglePage}/> </IsPrivate>  }></Route>
      <Route path="/request/:id/settings" element={  <IsPrivate><RequestSettingPage togglePage={togglePage}/> </IsPrivate> }></Route>
      <Route path="/conversations" element={  <IsPrivate><ConversationListPage togglePage={togglePage}/></IsPrivate> }></Route>
      <Route path="/conversation/:id" element={ <IsPrivate><ConversationPage togglePage={togglePage}/></IsPrivate>  }></Route>
      
      {/* old ones
      <Route path="/user/modify-password" element={ <IsPrivate> <ModifyPasswordPage/> </IsPrivate>   }></Route>
      <Route path="/user/:id/settings" element={ <IsPrivate><UserSettingPage/> </IsPrivate>}></Route>
      
      <Route path="/create-company" element={ <IsPrivate><CompanyCreationPage/> </IsPrivate>  }></Route>
      <Route path="/company/:id/settings" element={  <IsPrivate><CompanySettingPage/></IsPrivate>  }></Route>
      <Route path="/companies" element={ <IsPrivate><CompaniesPage/></IsPrivate>   }></Route>
      <Route path="/company/:id" element={ <IsPrivate><CompanyPage/></IsPrivate>   }></Route>
      <Route path="/users" element={ <IsPrivate><UsersPage/></IsPrivate>}></Route>
      <Route path="/create-user" element={ <IsPrivate> <UserCreationPage/></IsPrivate>}></Route>
      <Route path="/handle-request" element={ <IsPrivate><RequestHandlingPage/></IsPrivate>  }></Route>
      <Route path="/create-request" element={ <IsPrivate><RequestCreationPage/></IsPrivate> }></Route>
      <Route path="/request/review" element={<IsPrivate><RequestReviewPage/> </IsPrivate>  }></Route>
      <Route path="/request/:id/settings" element={ <IsPrivate><RequestSettingPage/></IsPrivate>  }></Route>
      
      <Route path="/conversations" element={<IsPrivate><ConversationListPage/></IsPrivate>  }></Route>
      <Route path="/conversation/:id" element={ <IsPrivate><ConversationPage/></IsPrivate> }></Route>*/}

     </Routes>
     </div>
    
    </div>
  );
}

export default App;

 

