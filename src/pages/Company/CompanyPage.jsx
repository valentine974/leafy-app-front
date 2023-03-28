
import { AuthContext } from "../../context/auth.context";
import { useContext, useEffect, useState } from "react";
import authService from "../../services/auth.service";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

function CompanyPage() {
  
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [siret, setSiret] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [numberOfVacationDays, setNumberOfVacationDays] = useState("");
  const {id} = useParams()
 
  useEffect(() => {
    authService.getCompany(id).then((foundCompany) => { 
      const { name, address, siret, imageUrl,numberOfVacationDays } = foundCompany.data;
      setName(name);
      setAddress(address);
      setSiret(siret); 
      setImageUrl(imageUrl); 
      setNumberOfVacationDays(numberOfVacationDays); 
    });
  }, []);

    return ( <div className="pageContainer"> 

    {name && 

    <>

    <img src={imageUrl} alt='logo' /> 

    
    <Link to={`/company/${id}/settings`}>To modify company informations</Link>

    </>
    
    }



    
    </div> );
}

export default CompanyPage;