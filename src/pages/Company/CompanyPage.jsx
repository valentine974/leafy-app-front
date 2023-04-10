import { AuthContext } from "../../context/auth.context";
import { useContext, useEffect, useState } from "react";
import authService from "../../services/auth.service";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import ChatBtn from "../../components/Chat/ChatBtn";

function CompanyPage() {
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
    .then(conversations => {
      return conversations.data.filter(conversation => {
        const participantIds = conversation.participants.map(
          participant => participant._id
        );
      return participantIds.every(id => [user._id, receiverId].includes(id))
    })
  })
    .then((conversationArr) => {
      if (conversationArr.length > 0) {
        // if it exists, redirect to the conversation page
        navigate(`/conversation/${conversationArr[0]._id}`);
      } else {
        // if not, create conversation then redirect to the conversation page
        authService
        .createConversation({participants: [user._id, receiverId]})
        .then((response) => {
          navigate(`/conversation/${response.data._id}`);
        })
        .catch((err) => console.log(err));
      }
  })
}

  useEffect(() => {
    user && authService.getCompany(id).then((foundCompany) => {
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
    authService.getUsers()
    .then((foundUsers) => {
      setAllEmployees(foundUsers.data.filter((user) => user.companyId._id === companyId))
      // console.log(allEmployees)
    });
  }, [companyId]);

  return (
    <div className="pageContainer">
      <h1 className="pageTitle">{name}</h1>
      {name && (
        <>
          <div className="imageContainer">
          <img src={imageUrl} alt="logo" />
          </div>
          <p>Address: {address}</p>
          {(user.position === "hr" || user.position === "admin") && (
            <Link to={`/company/${id}/settings`}>
              To modify company informations
            </Link>
          )}
        </>
      )}

      <h1 className="pageTitle"> The Team</h1>
      {
        allEmployees && (
          <>  
            <div className="cards">
              {allEmployees.map((employee) => (
                <div key={employee._id} className="userCard">
                  <div className="imageContainer">
                  <img src={employee.imageUrl} alt="avatar" />
                  </div>
                  
                  <h3>{employee.name}</h3>
                  <p>{employee.position}</p>
                  <p>{employee.email}</p>
                  {employee._id !== user._id && isLoggedIn && <button className="chatBtn" onClick={()=>handleChat(employee._id)}><ChatBtn/></button>}
                </div>))}
            </div>
          </>
        )
      }
    </div>
  );
}

export default CompanyPage;
