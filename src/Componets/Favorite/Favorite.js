import React from "react";
import { Redirect, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import Icon from "../Movies/Icon";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "./Favorite.css";
import { deleteFromFavorite } from "../../store/actions/Favorite";
import { changeIcon } from "../../store/actions/Icon";

const Favorite = () => {
  const isAuthenticated = true;
  const Favorite = useSelector((state) => state.Favorite.Favorite);
  const dispatch = useDispatch();

  const HandleDelete = (movieId) => {
    dispatch(deleteFromFavorite(movieId));
    dispatch(changeIcon("text-gray"));
  };

  
  return (
    <>
      <p className="text-center Header">Favorite</p>
      <div className="container">
        <Route
          render={() =>
            isAuthenticated ? (
              <Redirect to="/Favorite" />
            ) : (
              <Redirect to="/Login" />
            )
          }
        />
        <div className="row myrow ">
          {Favorite.map((movie) => {
            return (
              <>
                <div className="col-lg-3 col-md-6 col-6" id={movie.id}>
                  <div className="minimizecol">
                    <div className="imgdiv">
                      <img
                        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                        className="mb-2"
                      />
                      <Icon id={movie.id} style="text-warning"/>
                      <FontAwesomeIcon
                        icon={faTrash}
                        name={movie.id}
                        className="text-danger mx-3"
                        onClick={() => HandleDelete(movie.id)}
                      />
                    </div>
                    <p className="Para my-2">{movie.original_title}</p>
                    <p className="Para">{`Vote average : ${movie.vote_average}`}</p>
                    <button className="btn btn-danger btn-lg my-2">
                      <Link
                        to={`/moviePage/${movie.id}`}
                        key={movie.id}
                        id="Link"
                      >
                        Review More
                      </Link>
                    </button>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Favorite;
