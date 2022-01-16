import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "./../axiosConfig/axiosConfig";
import Icon from "./Icon";
import { useSelector ,useDispatch } from "react-redux";
import "./Movies.css";
import changeMovies from "../../store/actions/Movies";

const Movies = () => {
  const [movies, SetMovies] = useState([]);
  const [PageNumber, SetPageNumber] = useState(1);
  const [SearchTerm, SetSearchTerm] = useState("");
  const loader = useSelector((state) => state.loader.loader);
  const dispatch = useDispatch();
  // const movies = useSelector((state) => state.Movies);
  const FavoriteArr = useSelector((state) => state.Favorite.Favorite);
  console.log(FavoriteArr)
  const flag = 0;
  const [style,setStyle]=useState("text-gray");
  

  useEffect(() => {
    openPage(1, false);
  }, []);
  // console.log(PageNumber);
  function NextPage() {
    let n = PageNumber + 1;
    SetPageNumber(PageNumber + 1);
    console.log(PageNumber);
    openPage(n, false);
  }
  function BackPage() {
    let n;
    if (PageNumber > 1) {
      SetPageNumber(PageNumber - 1);
      n = PageNumber - 1;
    } else if (PageNumber == 1) {
      n = 1;
    }
    console.log(PageNumber);
    openPage(n, false);
  }
  const openPage = (Page, Api) => {
    // dispatch(changeMovies(Page));
    if (Api) {
      axios
        .get(Api)
        .then((response) => {
          SetMovies(response.data.results);
          console.log(PageNumber);
        })
        .catch((err) => console.log(err));
    } else {
      axiosInstance
        .get(`/popular?api_key=570607981511b286676e5140a2187373&page=${Page}`)
        .then((response) => {
          SetMovies(response.data.results);
        })
        .catch((err) => console.log(err));
    }
  };

  const SearchFun = () => {
    openPage(
      PageNumber,
      `http://api.themoviedb.org/3/search/movie?api_key=570607981511b286676e5140a2187373&language=en-US&query=${SearchTerm}&page=${PageNumber}`
    );
    console.log(SearchTerm)
  };
  const checkFav = (movieID) => {
    for(let i=0 ;i<FavoriteArr.length;i++)
    {
      if(movieID==FavoriteArr[i].id)
      {
       setStyle("text-warning" )  
      }
    }
  };

  

  return (
    <div>
      <p className="text-center Header">Movies</p>
      <div className="container">
        <div className="d-flex justify-content-center my-2">
          <form className="d-flex justify-content-center col-lg-3 col-md-6 col-6">
            <input
              className="form-control me-2 "
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={(event) => {
                SearchFun();
                SetSearchTerm(event.target.value);
                console.log(event.target.value);
              }}
            />
          </form>
        </div>

        {loader && (
          <div className="d-flex justify-content-center loader">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        <div className="row myrow ">
          {movies
            // .filter((movie)=>{
            //   if (SearchTerm =="")
            //   {
            //     return movie ;
            //   }else if(movie.original_title.toLowerCase().includes(SearchTerm.toLowerCase()))
            //   {
            //     return movie ;
            //   }
            // })
            .map((movie) => {
              return (
                <>
                  <div className="col-lg-3 col-md-6 col-6" id={movie.id}>
                    <div className="minimizecol">
                      <div className="imgdiv">
                        <img
                          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                          className="mb-2"
                        />
                        <Icon id={movie.id}  onClick={() => checkFav(movie.id)} />
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
          <div className="col-md-4 col-lg-4 my-4 ">
            <button
              type="button"
              className="btn btn-danger btn-lg"
              onClick={() => BackPage()}
            >
              {PageNumber == 1 ? `No prev page` : `Page ${PageNumber - 1}`}
            </button>
          </div>
          <div className="col-md-4 col-lg-4 my-4 text-center PageText">
            {`Page ${PageNumber}`}
          </div>
          <div className="col-md-4 col-lg-4 d-flex justify-content-end my-4">
            <button
              type="button"
              className="btn btn-danger btn-lg"
              onClick={() => NextPage()}
            >
              {`Page ${PageNumber + 1}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movies;
