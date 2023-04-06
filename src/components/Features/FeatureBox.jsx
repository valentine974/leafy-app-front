
function FeatureBox(props) {
    const {featureName, featureImg, featureLogo, featureDescription} = props;
    return ( 
        <>
            <div className="feature-box card">
                <div className="feature-box__icon">
                    <i className="fas fa-rocket"> {featureLogo} </i>
                    {/* <img src={featureImg} alt="feature" /> */}
                </div>
                <div className="feature-box__text">
                    <h3> {featureName} </h3>
                    <p> {featureDescription} </p>
                </div>
            </div>
        </>
     );
}

export default FeatureBox;