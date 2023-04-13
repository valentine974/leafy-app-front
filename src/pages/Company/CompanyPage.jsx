import { AuthContext } from "../../context/auth.context";
import { useContext, useEffect, useState } from "react";
import authService from "../../services/auth.service";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import ChatBtn from "../../components/Chat/ChatBtn";
import "./CompanyPage.css";
import addressImage from '../../Images/maps-and-flags.png'
import Loading from "../../components/Loading/Loading";

function CompanyPage(props) {
  const { togglePage } = props;
  const navigate = useNavigate();
  const { user, isLoggedIn } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [siret, setSiret] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [numberOfVacationDays, setNumberOfVacationDays] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [allEmployees, setAllEmployees] = useState([]);
  const { id } = useParams();

  const handleChat = (receiverId) => {
    // verify if the conversation already exists

    authService
      .getUserConversations(user._id)
      .then((conversations) => {
        return conversations.data.filter((conversation) => {
          const participantIds = conversation.participants.map(
            (participant) => participant._id
          );
          return participantIds.every((id) =>
            [user._id, receiverId].includes(id)
          );
        });
      })
      .then((conversationArr) => {
        if (conversationArr.length > 0) {
          // if it exists, redirect to the conversation page
          navigate(`/conversation/${conversationArr[0]._id}`);
        } else {
          // if not, create conversation then redirect to the conversation page
          authService
            .createConversation({ participants: [user._id, receiverId] })
            .then((response) => {
              navigate(`/conversation/${response.data._id}`);
            })
            .catch((err) => console.log(err));
        }
      });
  };

  useEffect(() => {
    user &&
      authService.getCompany(id).then((foundCompany) => {
        const { name, address, siret, imageUrl, numberOfVacationDays, _id } =
          foundCompany.data;
        setCompanyId(_id);
        setName(name);
        setAddress(address);
        setSiret(siret);
        setImageUrl(imageUrl);
        setNumberOfVacationDays(numberOfVacationDays);
      });
  }, [user]);

  useEffect(() => {
    authService.getUsers().then((foundUsers) => {
      setAllEmployees(
        foundUsers.data.filter((user) => user.companyId._id === companyId)
      );
      // console.log(allEmployees)
    });
  }, [companyId]);

  return (
    
    <div className={`pageContainer ${togglePage}`}>
    {name? (<>
      <div className={`pageTitle ${togglePage}`} > 
       
        <><h1>{name}</h1>
            {(user.position === "hr" || user.position === "admin") && (
              <Link to={`/company/${id}/settings`}>
                <button className="blueButton">Modify company informations</button>
              </Link>
            )}</>
        
      </div>
      <div className="pageContent">
         
          <>
            <div className="imageContainer profile">
              <img src={imageUrl} alt="logo"   />
            </div>
            <p style={{"margin":"10px", "display":"flex","flexFlow":"row nowrap", "alignItems":"center", "color":"#026162"}} ><img src={addressImage} alt="address:" style={{"width":"30px", "marginRight":"10px"}} /> {address}</p>
            {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d20167.388123479293!2d4.310304228205223!3d50.81405575549326!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c3c46de30bb961%3A0xfec0c86e0044474e!2sForest%2C%20Belgique!5e0!3m2!1sfr!2sfr!4v1681239911248!5m2!1sfr!2sfr" style={{"border":"0","height":"450", "width":"600"}} /> */}
          </>
         

        {allEmployees && (
          <>
            <div className="cards">
              {allEmployees.map((employee) => (
                <div key={employee._id} className="userCard">
                  <div className="imageContainer">
                    <img src={employee.imageUrl} alt="avatar" />
                  </div>

                  <h3>{employee.name}</h3>
                  <p>{employee.position}</p>
                  <p className="running-email">{employee.email}</p>
                  {employee._id !== user._id && isLoggedIn && (
                    <button
                      className="chatBtn"
                      onClick={() => handleChat(employee._id)}
                    >
                      <ChatBtn/>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div></>): <Loading/> }

    </div>
  );
}

export default CompanyPage;
