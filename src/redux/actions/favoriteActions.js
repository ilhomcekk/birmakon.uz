import requests from "../../helpers/requests";
import { toast } from "react-toastify";

// auth
export const createFavorite = (params) => (dispatch) => {
  dispatch({ type: "create_favorite_start", payload: params });
  requests
    .createFavorite(params)
    .then(({ data }) => {
      dispatch({ type: "create_favorite_success", payload: data });
      // window.location.reload();
    })
    .catch(({ response }) => {
      let message = (response && response.data.message) || "Product list not";
      toast.error(message);
      dispatch({ type: "create_favorite_error", payload: message });
    });
};

export const getFavoriteAll = () => (dispatch) => {
  dispatch({ type: "fetch_favorite_all_start" });

  requests
    .getFavoriteAll()
    .then(({ data }) => {
      dispatch({ type: "fetch_favorite_all_success", payload: data });
    })
    .catch(({ response }) => {
      let message = (response && response.data.message) || "Product list not";
      // toast.error(message);
      // toast.error("Вам нужно зарегистрироваться");
      dispatch({ type: "fetch_favorite_all_error", payload: message });
    });
};
