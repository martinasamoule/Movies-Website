import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../axiosConfig/axiosConfig";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./MoviePage.css";

const MoviePage = () => {
  const params = useParams();
  const [movie, SetMovie] = useState({});
  const loader = useSelector((state) => state.loader.loader);
  console.log(params);

  useEffect(() => {
    axiosInstance
      .get(
        `/${params.id}?api_key=570607981511b286676e5140a2187373&language=en-US`
      )
      .then((res) => {
        SetMovie(res.data);
        // console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {loader && (
        <div className="d-flex justify-content-center loader">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      <p className="Header text-center">{movie.original_title}</p>
      <div className="container">
        <div className="row">
          <div className="contactcol">
            <div className="Imgdiv">
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              />
            </div>
          </div>
          <div className="contactcol">
            <span className="TextHeader">-Overview :</span>
            <p className="Text">{movie.overview}</p>
            <p>
              <span className="TextHeader">-Vote average : </span>
              <span className="Text">{movie.vote_average}</span>
            </p>
            <p>
              <span className="TextHeader">-Release date : </span>
              <span className="Text">{movie.release_date}</span>
            </p>
            <p>
              <span className="TextHeader">-popularity : </span>
              <span className="Text">{movie.popularity}</span>
            </p>
            <div className="d-flex justify-content-center ">
              <button className="btn btn-danger btn-lg my-2">
                <Link to={`/`} id="Link">
                  Back to movies
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MoviePage;
