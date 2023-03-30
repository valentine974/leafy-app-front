
import authService from "../../services/auth.service";
import { Link } from "react-router-dom";
import { useState , useEffect} from "react";


function UsersPage() {

const [users, setUsers] = useState(null)

useEffect(()=>{
    authService.getUsers()
    .then((Users)=>{
        setUsers(Users.data)
    })
    .catch((err)=>console.log('err in loading Users', err))
},[])

    return ( <div>Company Page

    {users?.map((user)=>
        <div>
        <h3>{user.name}</h3>
        <Link to={`/user/${user._id}`} > Go to user profile page </Link>
        </div>

    )
    
    }
    
    
    <Link to="/create-user">
        <button>Create a new user</button>
      </Link>

    </div> );
}

export default UsersPage;