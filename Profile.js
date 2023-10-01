import React,{useState} from "react";
import {useNavigate,Link} from "react-router-dom";
import {toast } from 'react-toastify';
import Layout from "../components/layout/Layout";
import {getAuth, updateProfile} from "firebase/auth";
import {db} from "../firebase.config";
import {FaEdit,FaArrowAltCircleRight} from "react-icons/fa";
import {MdDoneAll} from "react-icons/md";
import { doc, setDoc, updateDoc } from "firebase/firestore";

const Profile = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [changeDetails,setChangeDetails] = useState(false);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const {name,email} = formData;
  const logoutHandler = () =>{
    auth.signOut(); 
    toast.success("Successfully Logout");
    navigate("/");
  };
  
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onsubmit = async() => {
    try {
      if(auth.currentUser.displayName !== name){
        await updateProfile(auth.currentUser,{
          displayName: name
        });
        const userRef = doc(db,"users",auth.currentUser.uid);
        await updateDoc(userRef,{name});
        toast.success("User Updated!");
      }
    } catch (error) {
      console.log(error);
      toast("Something Went Wrong");
    }
  };

  return(
    <Layout>
      <div className="container mt-4 w-50 d-flex justify-content-between"> 
        <h4>Profile Details</h4>
        <button className="btn btn-danger" onClick={logoutHandler}>
          Logout
        </button>
      </div>
      <div className="container mt-4 card" style = {{width: "18rem"}}>
      <div className="card-holder">
        <div className="d-flex justify-content-between">
          <p>User Personal Details</p>
          <span 
            style={{cursor: "pointer"}}
            onClick={() => {
            changeDetails && onsubmit(); 
            setChangeDetails((prevState) => !prevState);
            }}
          >
            {changeDetails ? (
             <MdDoneAll color="green"/>):(
             <FaEdit color="red"/>
            )}
          </span>
        </div>
      </div>
        <div class="card-body">  
          <form>
          <div className="mb-3">
              <label htmlFor="exampleInputPassword1" 
                className="form-label">
                  Name
              </label>
              <input type="text" 
                className="form-control" 
                id="name"
                value={name} 
                onChange={onChange}
                disabled = {!changeDetails}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" 
                className="form-label">
                Email address
              </label>
              <input type="email" 
                value={email}
                className="form-control" 
                id="email" 
                aria-describedby="emailHelp" 
                onChange={onChange}
                disabled={!changeDetails}
              />
            </div>
        </form>
        </div>
    </div>
    <div className="container mt-4 w-50 d-flex justify-content-between">
      <Link to="/create-listing">
          <FaArrowAltCircleRight color="primary"/> Sell or Rent Your Home
      </Link>
    </div>
    </Layout>
  );
};

export default Profile;