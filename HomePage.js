import React from "react";
import {useNavigate} from "react-router-dom";
import Layout from "../components/layout/Layout";
import Slider from "../components/Slider";

const HomePage = () => {
  const navigate = useNavigate();
  const img1 = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=773&q=80";
  const img2 = "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1073&q=80";
  return (
    <Layout>
        <div className="container mt-3">
          <Slider/>
         <div className="row">
          <h1>Category</h1>
          <div className="col-md-5">
            <div className="ImageContainer">
                <img src={img1} alt="Rent" style={{ width: "100%" }}/>
                <button className="btn" 
                onClick={()=>navigate("/category/rent")}
                >
                  TO RENT</button>
            </div>
          </div>
          <div className="col-md-5">
          <div className="ImageContainer">
              <img src={img2} alt="Rent" style={{ width: "100%" }}/>
              <button className="btn" 
              onClick={()=>navigate("/category/sale")}
              >
                TO SELL</button>
          </div>
          </div>
         </div>
        </div>
    </Layout>
  );
};

export default HomePage;