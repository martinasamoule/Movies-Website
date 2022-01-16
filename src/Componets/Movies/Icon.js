import React from "react";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import axiosInstance from "../axiosConfig/axiosConfig";
import { useSelector , useDispatch} from "react-redux";
import changeFavorite from "../../store/actions/Favorite";
import { changeIcon } from "../../store/actions/Icon";

const Icon = (props) => {
  
  const [movie, SetMovie] = useState({});
  const [style,setstyle]=useState("text-gray")
  const FavoriteArr = useSelector((state) => state.Favorite.Favorite);
  const dispatch = useDispatch();
  let flag = 0;
  // const style="text-gray";
  useEffect(()=>{
    for(let i=0 ;i<FavoriteArr.length;i++)
    {
      if(props.id==FavoriteArr[i].id)
      {
        flag=1;   
      }
    }
    if(flag==1)
    {
      setstyle("text-warning")
      
    }},[])

  const HandleClick = (movieid) => {
    console.log(movieid);
    // dispatch(changeIcon(style == "text-gray" ? "text-warning" : "text-gray"));
    // style == "text-gray" ? setstyle("text-warning") : setstyle("text-gray");
    axiosInstance
        .get(
          `/${props.id}?api_key=570607981511b286676e5140a2187373&language=en-US`
        )
        .then((res) => {
          SetMovie(res.data);
          console.log(res.data.id);
          for(let i=0 ;i<FavoriteArr.length;i++)
          {
            if(res.data.id==FavoriteArr[i].id)
            {
              flag=1;   
            }
          }
          if(flag==0)
          {
            dispatch(changeFavorite(res.data));
            setstyle("text-warning")
            
          }
        })
        .catch((err) => console.log(err));
  };
  
  

  return (
    <FontAwesomeIcon
      icon={faStar}
      name={props.id}
      className={props.style?props.style:style}
      onClick={() => HandleClick(props.id)}
    />
  );
};

export default Icon;
