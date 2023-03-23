
import './App.css';
import {Routes, Route} from "react-router-dom"
import CompanyCreationPage from './pages/CompanyCreationPage';
import CompanySettingPage from "./pages/CompanySettingPage";
import HomePage from './pages/HomePage';
import LoginPage from "./pages/LoginPage";
import ModifyPasswordPage from "./pages/ModifyPasswordPage"
import RequestCreationPage from "./pages/RequestCreationPage"
import RequestReviewPage from "./pages/RequestReviewPage"
import RequestSettingPage from "./pages/RequestSettingPage"
import UserCreationPage from "./pages/UserCreationPage"
import UserSettingPage from "./pages/UserSettingPage"


function App() {
  return (
    <div className="App">
     <Routes>
      <Route path="/create-company" element={ <CompanyCreationPage/>  }></Route>
      <Route path="/company/:id" element={ <CompanySettingPage/>  }></Route>
      <Route path="/" element={ <HomePage/>  }></Route>
      <Route path="/login" element={ <LoginPage/>  }></Route>
      <Route path="/users/:id/modify-password" element={ <ModifyPasswordPage/>  }></Route>
      <Route path="/create-request" element={ <RequestCreationPage></RequestCreationPage> }></Route>
      <Route path="/request/review" element={ <RequestReviewPage/>  }></Route>
      <Route path="/request/:id/setting" element={ <RequestSettingPage/>  }></Route>
      <Route path="/create-user" element={ <UserCreationPage/>  }></Route>
      <Route path="/users/:id/settings" element={ <UserSettingPage/>  }></Route>
     </Routes>
    </div>
  );
}

export default App;
