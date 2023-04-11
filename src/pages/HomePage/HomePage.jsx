import "./HomePage.css";
import FeatureBox from "../../components/Features/FeatureBox";

const features = [
  {
    featureName: "One",
    featureLogo: "🚀",
    featureImg: "https://picsum.photos/200",
    featureDescription:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit dignissimos culpa rem sunt quia ab ullam debitis minima provident! Et amet officia distinctio atque ducimus enim facilis nulla sequi natus!",
  },
  {
    featureName: "Two",
    featureLogo: "🚀",
    featureImg: "https://picsum.photos/200",
    featureDescription:
      "lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit dignissimos culpa rem sunt quia ab ullam debitis minima provident! Et amet officia distinctio atque ducimus enim facilis nulla sequi natus!",
  },
  {
    featureName: "Three",
    featureLogo: "🚀",
    featureImg: "https://picsum.photos/200",
    featureDescription:
      "lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit dignissimos culpa rem sunt quia ab ullam debitis minima provident! Et amet officia distinctio atque ducimus enim facilis nulla sequi natus!",
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
      <p>
          Nice features of LEAFY to help you manage <br /> your team's vacations
          with zen inside
        </p>
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
