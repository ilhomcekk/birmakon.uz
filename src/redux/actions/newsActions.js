import requests from "../../helpers/requests";
import { toast } from "react-toastify";

export const getLastNews = (params) => (dispatch) => {
  dispatch({ type: "fetch_last_news_start", payload: params });

  requests
    .getLastNews(params)
    .then(({ data }) => {
      dispatch({ type: "fetch_last_news_success", payload: data });
    })
    .catch(({ response }) => {
      dispatch({ type: "fetch_last_news_error", payload: response });
    });
};

export const getNewsDetail = (id) => (dispatch) => {
  dispatch({ type: "fetch_get_news_one_start", payload: id });

  requests
    .getNewsDetail(id)
    .then(({ data }) => {
      dispatch({ type: "fetch_get_news_one_success", payload: data });
    })
    .catch(({ response }) => {
      let message = (response && response.data.message) || "Product list not";
      toast.error(message);

      dispatch({ type: "fetch_get_news_one_error", payload: message });
    });
};

export const getQuestions = () => (dispatch) => {
  dispatch({ type: "fetch_get_questions_start" });

  requests
    .getQuestions()
    .then(({ data }) => {
      dispatch({ type: "fetch_get_questions_success", payload: data });
    })
    .catch(({ response }) => {
      let message = (response && response.data.message) || "Product list not";
      toast.error(message);

      dispatch({ type: "fetch_get_questions_error", payload: message });
    });
};
