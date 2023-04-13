import "./HomePage.css";
import FeatureBox from "../../components/Features/FeatureBox";

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
  return (

    <div className={`pageContainer ${togglePage}`}>
      <div className={`pageTitle ${togglePage}`}>
        <h1>
          WELCOME TO LEAFY
        </h1> <p>a bug-us adventure</p>
      </div>
      <div className="pageContent">
      <h2>
      Empower Your Team & Optimize Workflow with Leafy
        </h2>
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
      </div>
    </div>
  );
}

export default HomePage;
