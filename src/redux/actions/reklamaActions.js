import requests from "../../helpers/requests";
import { toast } from "react-toastify";

export const getReklama = () => (dispatch) => {
  dispatch({ type: "fetch_reklama_start" });

  requests
    .getReklama()
    .then(({ data }) => {
      dispatch({ type: "fetch_reklama_success", payload: data });
    })
    .catch(({ response }) => {
      let message = (response && response.data.message) || "Product list not";
      toast.error(message);

      dispatch({ type: "fetch_reklama_error", payload: message });
    });
};