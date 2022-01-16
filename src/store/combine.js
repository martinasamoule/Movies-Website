import { combineReducers } from "redux";
import FavoriteReducer from "./reducers/Favorite"; 
import loaderReducer from './reducers/loader';
import IconReducer from "./reducers/Icon";
import MoviesReducer from "./reducers/Movies";




export default  combineReducers({
     
    Favorite:FavoriteReducer,
    loader:loaderReducer,
    Icon : IconReducer,
    Movies:MoviesReducer

  })