const initial = {
  Favorite: [],
};

export default function FavoriteReducer(state = initial, action) {
  switch (action.type) {
    case "SET_FAVORITE":
      return {
        ...state,
        Favorite: [...state.Favorite, action.payload],

      };
    case "DELETE_FAVORITE":
      return {
        ...state,
        Favorite: state.Favorite.filter((movie) => movie.id !== action.payload),
      };
    default:
      return state;
  }
}
