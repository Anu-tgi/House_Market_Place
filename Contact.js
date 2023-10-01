import React,{useState,useEffect} from "react";
import Layout from "../components/layout/Layout";
import { db } from "../firebase.config";
import { doc,getDoc } from "firebase/firestore";
import { useParams,useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

const Contact = () => {
    const [message,setMessage] = useState("");
    const [landlord,setLandlord] = useState("");
    const [SearchParams,setSearchParams] = useSearchParams();
    const params = useParams();

    useEffect(() =>{
        const getLandlord = async () => {
            const docRef = doc(db,"users",params.landlordId);
            const docSnap = await getDoc(docRef);
            if(docSnap.exists()){
                setLandlord(docSnap.data());
            }else{
                toast.error("Unable to fetch data");
            }
        };
        getLandlord();
    },[params.landlordId]);

  return (
    <Layout>
        <div className="container mt-4">
            <h3>Contact Details</h3>
            <div>
                {landlord !== "" && (
                    <main>
                        <h3>Name: {landlord?.name}</h3>
                        <form>
                            <div className="form-floating">
                                <textarea 
                                    className="form-control" 
                                    placeholder="Leave a comment here" 
                                    value={message}
                                    id="message" 
                                    onChange={(e) => {
                                        setMessage(e.target.value);
                                    }}
                                />
                                <label htmlFor="floatingTextarea">Your message</label>
                            </div>
                            <a
                              href={`mailto:${landlord.email}?Subject=${SearchParams.get(
                                "listingName"
                              )}&body=${message}`} 
                            >
                              <button className="btn btn-primary mt-2">Send Message</button>
                            </a>
                        </form>
                    </main>
                )}
            </div>
        </div>
    </Layout>
  );
};

export default Contact;