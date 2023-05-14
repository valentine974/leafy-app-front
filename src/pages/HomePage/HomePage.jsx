import "./HomePage.css";
import FeatureBox from "../../components/Features/FeatureBox";
import authService from "../../services/auth.service";
import { useState } from "react";

const features = [
  {
    featureName: "1. Company leaves",
    featureLogo: "🚀",
    featureImg: "https://picsum.photos/200",
    featureDescription:
      "Easily manage leaves and absences. Record sick days and annual leave and watch leaves counter update automatically.",
  },
  {
    featureName: "2. HR management ",
    featureLogo: "🚀",
    featureImg: "https://picsum.photos/200",
    featureDescription:
      "Give the tools to your employees to communicate with the HRs and their management.",
  },
  {
    featureName: "3. Seamless experience",
    featureLogo: "🚀",
    featureImg: "https://picsum.photos/200",
    featureDescription:
      "It will never as easy as with LEAFY to manage your employee's Holidays.",
  },
];

function HomePage(props) {
  const { togglePage } = props;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    authService.testerRequest({ name, email})
    .then((response) => {
      console.log("request sent:",response);
      setMessage(response.data);
      setName("");
      setEmail("");
    })
    .catch((err) => {
      console.log("request sending error:",err);
    });
  };
  return (
    <div className={`pageContainer ${togglePage}`}>
      <div className={`pageTitle ${togglePage}`}>
        <h1>WELCOME TO LEAFY</h1> <p>a bug-us adventure</p>
      </div>
      <div className="pageContent">
        <h2>Empower Your Team & Optimize Workflow with Leafy</h2>
        <div className="cards">
          {features.map((feature) => (
            <FeatureBox
              key={feature.featureName}
              featureName={feature.featureName}
              featureLogo={feature.featureLogo}
              featureImg={feature.featureImg}
              featureDescription={feature.featureDescription}
            />
          ))}
        </div>
        <h2>Request your testing account today!</h2>

        <form className="requestForm" onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input  type="text" name="name" id="name" value={name} onChange={(e)=>setName(e.target.value)} />
          <label htmlFor="email">Email</label>
          <input  type="email" name="email" id="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
          <button type="submit">Submit</button>
          {message!=="" && <p className="requestMessage">{message}</p>}
        </form>
        
      </div>
    </div>
  );
}

export default HomePage;
