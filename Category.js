import React,{useEffect,useState} from "react";
import Layout from "../components/layout/Layout";
import { useParams } from "react-router-dom";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import { collection, getDocs, query, where, orderBy,limit, startAfter } from "firebase/firestore";
import spinner from "../components/spinner";
import ListingItem from "../components/ListingItem";

const Category = () => {
  const [listing,setListing] = useState("");
  const [loading,setLoading] = useState(true);
  const Params = useParams();

  //fetch Listings
  useEffect(()=>{
    const fetchListing = async ()=>{
      try {
        //reference
        const listingsRef = collection(db,"listings");
        //query
        const q = query(listingsRef,
          where("type","==",Params.categoryName),
          orderBy("timestamp","desc"),
          limit(10)
          );
        //execute query
        const querySnap = await getDocs(q);
        const listings = [];
        querySnap.forEach((doc)=>{
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setListing(listings);
        setLoading(false);
      } catch (error) {
        console.log(error);
        toast.error("unable to fetch data");
      }
    };
    //function call
    fetchListing();
  },[Params.categoryName]);
  return (
  <Layout>
    <div className="mt-3 container-fluid">
      <h1>
        {Params.categoryName === "rent" 
        ? "Places For Rent" 
        : "Places For Sale" }
      </h1>
      { loading ? (
        <spinner/>
        ) : listing && listing.length > 0 ? (
        <>
         <div>
           {listing.map((list) => (
            <ListingItem listing = {list.data} id = {list.id} key = {list.id} />
           ))}
         </div>
        </>
        ) : (
          <p>No Listing For {Params.categoryName}</p>
        )}
    </div>
  </Layout>
  );
};

export default Category;