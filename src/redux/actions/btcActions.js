import requests from "../../helpers/requests";
import { toast } from "react-toastify";

export const postSendBTC = (params) => (dispatch) => {
  dispatch({ type: "post_send_btc_start", payload: params });

  requests
    .postSendBTC(params)
    .then(({ data }) => {
      dispatch({ type: "post_send_btc_success", payload: data });
    })
    .catch(({ response }) => {
      let message1 =
        response?.errors?.senderPhone && response?.errors?.senderPhone[0];
      let message2 = response?.errors?.weight && response?.errors?.weight[0];
      toast.error(message1);
      toast.error(message2);
      dispatch({ type: "post_send_btc_error", payload: response });
    });
};

export const postCalculateBtc = (params) => (dispatch) => {
  dispatch({ type: "post_calculate_btc_start", payload: params });

  requests
    .postCalculateBtc(params)
    .then(({ data }) => {
      dispatch({ type: "post_calculate_btc_success", payload: data });
    })
    .catch(({ response }) => {
      let message =
        response.data?.errors?.receiverCityId &&
        response.data?.errors?.receiverCityId[0];
      toast.error(message);
      dispatch({ type: "post_calculate_btc_error", payload: response });
    });
};

export const getBTCRegions = () => (dispatch) => {
  dispatch({ type: "fetch_btc_regions_start" });

  requests
    .getBTCRegions()
    .then(({ data }) => {
      dispatch({ type: "fetch_btc_regions_success", payload: data });
    })
    .catch(({ response }) => {
      dispatch({ type: "fetch_btc_regions_error", payload: response });
    });
};

export const getBTCCities = (id) => (dispatch) => {
  dispatch({ type: "fetch_btc_cities_start", payload: id });

  requests
    .getBTCCities(id)
    .then(({ data }) => {
      dispatch({ type: "fetch_btc_cities_success", payload: data });
    })
    .catch(({ response }) => {
      dispatch({ type: "fetch_btc_cities_error", payload: response });
    });
};
