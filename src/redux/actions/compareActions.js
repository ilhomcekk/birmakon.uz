import requests from "../../helpers/requests";
import { toast } from "react-toastify";

export const compareList = () => (dispatch) => {
  dispatch({ type: "fetch_compare_list_start" });

  requests
    .compareList()
    .then(({ data }) => {
      dispatch({ type: "fetch_compare_list_success", payload: data });
    })
    .catch(({ response }) => {
      let message = (response && response.data.message) || "List not found";
      // toast.error(message);

      dispatch({ type: "fetch_compare_list_error", payload: message });
    });
};

export const addCompare = (params) => (dispatch) => {
  dispatch({ type: "create_compare_start", payload: params });

  requests
    .addCompare(params)
    .then(({ data }) => {
      dispatch({ type: "create_compare_success", payload: data });
      toast.success("Успешно");
    })
    .catch(({ response }) => {
      let message = (response && response.data.message) || "List not found";
      // toast.error(message);

      dispatch({ type: "create_compare_error", payload: message });
    });
};
