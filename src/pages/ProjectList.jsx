import React, { useEffect, useState } from "react";
import ProjectCard from "../components/ProjectCard";

import axios from "axios";
import { Col, Row } from "react-bootstrap";

const ProductList = () => {
  const [project, setProject] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);


 
  const BASE_URL = "https://655b152bab37729791a8849a.mockapi.io/project";

  const getData = async () => {
    try {
      const { data } = await axios(
        BASE_URL
      );
      console.log(data);
      setProject(data);
      setError(false); // işlem başarılı olursa erroru false a çekiyorum
    } catch (error) {
      console.log(error);
      setError(true); //catche düştüğünde error ini true değerine çekiyorum
    } finally {
      setLoading(false); // işlem try a da catche de girse farketmez her türlü loadingi false çekiyoruz ki ne olduğunu kullancıya yansıtabilelim
    }
  };
useEffect(() => {
  getData();
}, [])

  

  if (error) {
    return <p>Something went wrong..... </p>;
  }

  return (
    <div className="container mt-3">
     <h1 className="text-center">Project list</h1>
      <div className="d-sm-block d-md-flex">
        {loading === true ? (
          <p> Loading....</p>
        ) : (
          <>

            <article id="product-panel">
            <Row className="justify-content-center">
              {project.map((project) => (
               
                <Col md={6} lg={4} xl={3} key={project.id}>
                <ProjectCard  project={project} getData={getData}/></Col>
              ))}</Row>
            </article>
            
          </>
        )}
      </div>
    </div>
  );
};

export default ProductList;
