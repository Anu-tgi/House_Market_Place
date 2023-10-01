import React,{useState} from "react";
import {getAuth,signInWithEmailAndPassword} from "firebase/auth";
import {Link,useNavigate} from "react-router-dom";
import {toast } from 'react-toastify';
import Layout from "../components/layout/Layout";
import {BsFillEyeFill} from "react-icons/bs";
import OAuth from "../components/OAuth";

const Signin = () => {
    const [ShowPassword,setShowPassword] = useState(false);
    const [formData,setFormData] = useState({
        email:'',
        password:''
    });
    const {email,password} = formData;
    const navigate = useNavigate();
    const onchange = (e) =>{
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }));
    };

    const loginHandler = async (e) => {
        e.preventDefault();
        try {
            const auth = getAuth();
            const userCredential = await signInWithEmailAndPassword(auth,email,password);
            if(userCredential.user){
                toast.success("Login Success");
                navigate("/");
            }
        } catch (error) {
            console.log(error);
            toast.error("Invalid Email Or Password");
        }
    }
    return (
        <Layout>
            <div className="d-flex align-items-center justify-content-center w-100 mt-4">
        <form className="bg-light p-4" onSubmit={loginHandler}>
            <h4 className="bg-dark p-2 text-light text-center">Sign In</h4>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                    Email address
                </label>
                <input 
                   type="email" 
                   className="form-control" 
                   value = {email}
                   id="email" 
                   onChange = {onchange}
                   aria-describedby="emailHelp" 
                />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input 
                   type={ShowPassword ? "text":"password"} 
                   value = {password}
                   onChange = {onchange}
                   className="form-control" 
                   id="password" 
                />
                <span>
                   Show Password 
                   <BsFillEyeFill 
                    className="ms-2"
                    style={{cursor: "pointer"}}
                    onClick={()=>{
                        setShowPassword((prevState) => !prevState);
                    }}
                   />
                </span>{" "}
                <Link to="/forgot-password">forgot Password</Link>
            </div>
            <button type="submit" className="btn btn-primary">
                Sign In
            </button>
            <OAuth/>
            <div className="mt-3">
                <span>New User </span><Link to="/signup">Sign Up</Link>
            </div>
        </form>
      </div>
        </Layout>
    );
};

export default Signin;