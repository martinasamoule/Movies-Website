import axiosInstance from '../../Componets/axiosConfig/axiosConfig';

export default function changeMovies(Page){
    return (dispatch)=>{
        axiosInstance
        .get(`/popular?api_key=570607981511b286676e5140a2187373&page=${Page}`)
        .then((response) => {
        //   SetMovies(response.data.results);
          dispatch({type:"SET_MOVIES",payload:response.data.results})
        })
        .catch((err) => console.log(err));
    }
}