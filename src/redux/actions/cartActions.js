import requests from "../../helpers/requests";
import { toast } from "react-toastify";

// cart
export const getCart = (params) => (dispatch) => {
  dispatch({ type: "fetch_cart_start", payload: params });

  requests
    .getCart(params)
    .then(({ data }) => {
      dispatch({ type: "fetch_cart_success", payload: data });
    })
    .catch(({ response }) => {
      let message = (response && response.data.message) || "Product list not";
      // toast.error(message);
      // toast.error("Вам нужно зарегистрироваться");

      dispatch({ type: "fetch_cart_error", payload: message });
    });
};

export const postCartAdd = (params) => (dispatch) => {
  dispatch({ type: "create_cart_start", payload: params });

  requests
    .postCartAdd(params)
    .then(({ data }) => {
      dispatch({
        type: "create_cart_success",
        payload: data,
      });
      toast.success("Добавлено");
    })
    .catch(({ response }) => {
      let message =
        response?.data?.errors?.amount &&
        "Кол-во товара на складе меньше чем вы указали";
      let message2 =
        response?.data?.errors?.product_id &&
        response?.data?.errors?.product_id[0];
      toast.error(message);
      toast.error(message2);

      dispatch({ type: "create_cart_error", payload: message });
    });
};

export const postCartMinus = (params) => (dispatch) => {
  dispatch({ type: "increment_cart_start", payload: params });

  requests
    .postCartMinus(params)
    .then(({ data }) => {
      dispatch({ type: "increment_cart_success", payload: data });
    })
    .catch(({ response }) => {
      let message =
        response?.data?.errors?.product_id && "Такого товара не существует";
      toast.error(message);

      dispatch({ type: "increment_cart_error", payload: message });
    });
};

export const postCartRemove = (id) => (dispatch) => {
  dispatch({ type: "remove_cart_start", payload: id });

  requests
    .postCartRemove(id)
    .then(({ data }) => {
      dispatch({ type: "remove_cart_success", payload: data });
    })
    .catch(({ response }) => {
      let message = (response && response.data.message) || "Product list not";
      toast.error(message);

      dispatch({ type: "remove_cart_error", payload: message });
    });
};

export const postCartClear = (params) => (dispatch) => {
  dispatch({ type: "clear_cart_start", payload: params });

  requests
    .postCartClear(params)
    .then(({ data }) => {
      dispatch({ type: "clear_cart_success", payload: data });
    })
    .catch(({ response }) => {
      let message = (response && response.data.message) || "Product list not";
      toast.error(message);

      dispatch({ type: "clear_cart_error", payload: message });
    });
};

export const getComments = (id) => (dispatch) => {
  dispatch({ type: "fetch_get_comments_start", payload: id });

  requests
    .getComments(id)
    .then(({ data }) => {
      dispatch({ type: "fetch_get_comments_success", payload: data });
    })
    .catch(({ response }) => {
      let message =
        (response && response.data.message) ||
        "Вы можете оставить 1 комментарий";
      toast.error("Зарегистрируйтесь, чтобы оставить комментарий");

      dispatch({ type: "fetch_get_comments_error", payload: message });
    });
};

export const createComment = (params) => (dispatch) => {
  dispatch({ type: "create_comment_start", payload: params });

  requests
    .createComment(params)
    .then(({ data }) => {
      dispatch({ type: "create_comment_success", payload: data });
      toast.success("Добавлен");
      // window.location.reload();
    })
    .catch(({ response }) => {
      let message1 = response.data?.errors?.rate && "Оценка: заполните поля";
      let message2 = response.data?.errors?.review && "Напишите коммент";
      let message3 =
        response.data?.message && "Регистрируйте чтобы оставить комментарии";
      let message4 = response.data?.data?.error && response.data?.data?.error;
      toast.error(message1);
      toast.error(message2);
      toast.error(message3);
      toast.error(message4);

      dispatch({ type: "create_comment_error", payload: response });
    });
};

export const getCommentFilterWithRate = (id) => (dispatch) => {
  dispatch({ type: "fetch_get_comment_rate_start", payload: id });

  requests
    .getCommentFilterWithRate(id)
    .then(({ data }) => {
      dispatch({ type: "fetch_get_comment_rate_success", payload: data });
    })
    .catch(({ response }) => {
      let message =
        (response && response.data.message) ||
        dispatch({ type: "fetch_get_comment_rate_error", payload: message });
    });
};

export const getCommentFilterWithDate = (id) => (dispatch) => {
  dispatch({ type: "fetch_get_comment_date_start", payload: id });

  requests
    .getCommentFilterWithDate(id)
    .then(({ data }) => {
      dispatch({ type: "fetch_get_comment_date_success", payload: data });
    })
    .catch(({ response }) => {
      let message =
        (response && response.data.message) ||
        dispatch({ type: "fetch_get_comment_date_error", payload: message });
    });
};
