export default function changeFavorite(data) {
  return {
    type: "SET_FAVORITE",
    payload: data,
  };
}

export  function deleteFromFavorite(data) {
  return {
    type: "DELETE_FAVORITE",
    payload: data,
  };
}