import { faFacebook,  faTwitter, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, {useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MovieSearch = () => {
  const [movie ,setMovie]=useState('')
const [movieData,setMovieData]=useState({})
const [hide,setHide]=useState(false)
const fetchData=async()=>{
  try {
    const response = await fetch(`https://www.omdbapi.com/?t=${movie}&apikey=7eae98f7`); 
    const data = await response.json();

    if (data.Response === "True") {
      setMovieData(data);
      console.log(data);
      toast.success(` ${data.Title} movie is here`)
     
    } else {
    
       toast.error("Movie Not Found");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    toast.error("Movie Not found");
  }
};

const search=()=>{
  fetchData();
  setHide(true)
}

const handleKeyDown =(e)=>{
  if(e.key==='Enter'){
    search()
  }
}

const {
  Title,
  Year,
  imdbRating,
  Released,
  Genre,
  Writer,
  Actors,
  Plot,
  Language,
  Awards,
  Poster,
} = movieData;

  return (
    <>
    <div  className="" >
      <div className="container mt-3 d-flex justify-content-between  ">
        <h1>
          <span className="text-light  ">GLAM</span>
          <span className="text-warning">Film</span>
        </h1>
        <div className=" d-flex gap-4 mt-2">
        <FontAwesomeIcon icon={faFacebook} bounce className=" text-warning"/>
        <FontAwesomeIcon icon={faWhatsapp} bounce className=" text-warning"/>
        <FontAwesomeIcon icon={faTwitter} bounce className=" text-warning" />
        </div>
      </div>

      {/* npm install --save @fortawesome/react-fontawesome @fortawesome/free-brands-svg-icons
 */}

      <div className=" d-flex justify-content-center mt-5 gap-2">
        <input
          type="text"
          className=" rounded form-control w-50"
          placeholder="Search the Movies....."
          onChange={(e)=>setMovie(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={search} type="button" className="btn btn-warning">Search</button>

      </div>

  


    { hide&&(<div className="container mt-5">
        <div className="row ">
          <div className="col-md-6 d-flex justify-content-center ">
            <img
              style={{ height: "85%", border: "4px solid white" }}
              src={Poster}
              alt=""
              className="img-fluid"
            />
          </div>
          <div className="col-md-6 text-light">
            <h1 className=" text-warning fst-italic mb-3 ms-5 ">{Title}</h1>
            <div className=" d-flex gap-2">
              <h6><span className=" fw-bold text-warning " >Year : </span>{Year}</h6>
              <h6><span className=" fw-bold text-warning">Ratings : </span>{imdbRating}</h6>
              <h6><span className=" fw-bold text-warning">Released : </span>{Released}</h6>
            </div>
            <p>
              <span className=" fw-bold text-warning">Genre : </span>
              <span>{Genre}</span>
            </p>
            <p>
              <span className=" fw-bold text-warning">Writer : </span>
              <span>{Writer}</span>
            </p>
            <p>
              <span className=" fw-bold text-warning">Actors : </span>
              <span>{Actors}</span>
            </p>
            <p>
              <span className=" fw-bold text-warning">Plot : </span>
              <span>
               {Plot}
              </span>
            </p>
            <p className="text-warning">
              <span className=" fw-bold fst-italic">Language : </span>
              <span className=" fst-italic">{Language}</span>
            </p>
            <p>
              <span className=" fw-bold text-warning">Awards : </span>
              <span>{Awards}</span>
            </p>
          </div>
        </div>
      </div>
      
      )}
     </div>
     <ToastContainer 
    position="top-center"
    theme="colored"
    autoClose={2000}
   />
  
    </>
  );
};

export default MovieSearch;
