import requests from "../../helpers/requests";
import { toast } from "react-toastify";

export const getDocument = () => (dispatch) => {
  dispatch({ type: "fetch_documents_start" });

  requests
    .getDocument()
    .then(({ data }) => {
      dispatch({ type: "fetch_documents_success", payload: data });
    })
    .catch(({ response }) => {
      let message = (response && response.data.message) || "News not";

      dispatch({ type: "fetch_documents_error", payload: message });
    });
};
