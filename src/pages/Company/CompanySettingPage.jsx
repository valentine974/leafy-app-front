import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import authService from "../../services/auth.service";
import { AuthContext } from "../../context/auth.context";
import Loading from "../../components/Loading/Loading";

function CompanySettingPage(props) {
  const {togglePage} =props
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [siret, setSiret] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [numberOfVacationDays, setNumberOfVacationDays] = useState("");
  let companyImageUrl;
  const { id } = useParams();

  const [errorMessage, setErrorMessage] = useState(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    authService.getCompany(id).then((foundCompany) => {
      const { name, address, siret, imageUrl, numberOfVacationDays } =
        foundCompany.data;
      setName(name);
      setAddress(address);
      setSiret(siret);
      companyImageUrl = imageUrl;
      console.log("companylogo before change:", companyImageUrl);
      setNumberOfVacationDays(numberOfVacationDays);
    });
  }, []);

  const handleSiret = (e) => setSiret(e.target.value);
  const handleName = (e) => setName(e.target.value);
  const handleAddress = (e) => setAddress(e.target.value);
  const handleNumberOfVacationDays = (e) =>
    setNumberOfVacationDays(e.target.value);

  const handleFileUpload = (e) => {
    // file dialog box when clicked on the file button
    const uploadData = new FormData();

    // append the image to the uploadData object
    uploadData.append("imageUrl", e.target.files[0]);

    authService
      .uploadImage(uploadData)
      .then((response) => {
        console.log("new logo url is: ", response.data.image_url);
        // response carries "fileUrl" which we can use to update the state
        setImageUrl(response.data.image_url);
      })
      .catch((err) => console.log("Error while uploading the file: ", err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      siret === "" ||
      name === "" ||
      address === "" ||
      numberOfVacationDays === "" ||
      imageUrl === ""
    ) {
      setErrorMessage(
        "SIRET, name, image, number of vacation days and address can not be empty"
      );
      return;
    }
    const siretRegex = /^\d{14}$/;
    if (!siretRegex.test(siret)) {
      setErrorMessage("Provide a valid SIRET.");
      return;
    }
    console.log("image url", imageUrl);
    imageUrl === "" ? setImageUrl(companyImageUrl) : setImageUrl(imageUrl);
    console.log("image url", imageUrl);
    authService
      .updateCompany(id, {
        siret,
        name,
        address,
        imageUrl,
        numberOfVacationDays,
      })
      .then(() => navigate(`/company/${id}`))
      .catch((err) => console.log("error in creating company info", err));
  };

  return (
    <div className={`pageContainer ${togglePage}`}>
    <div className={`pageTitle ${togglePage}`}><h1>Update company information</h1></div>
    <div className="pageContent">
    {name? (
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" name="name" value={name} onChange={handleName} />
          </label>

          <label>
            SIRET:
            <input
              type="text"
              name="siret"
              value={siret}
              onChange={handleSiret}
            />
          </label>

          <label>
            Address:
            <input
              type="text"
              name="address"
              value={address}
              onChange={handleAddress}
            />
          </label>

          <label>
            Number of Vacation:
            <input
              type="number"
              name="numberOfVacationDays"
              value={numberOfVacationDays}
              onChange={handleNumberOfVacationDays}
            />
          </label>

          <label>
            Logo:
            <input
              type="file"
              name="imageUrl"
              onChange={(e) => handleFileUpload(e)}
            />
          </label>

          <button type="submit">Update</button>
        </form>
      ): <Loading/>}

      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
      

      
    </div>
  );
}

export default CompanySettingPage;
