import requests from "../../helpers/requests";
import { toast } from "react-toastify";

export const getShopList = (params) => (dispatch) => {
  dispatch({ type: "fetch_get_shop_list_start", payload: params });

  requests
    .getShopList(params)
    .then(({ data }) => {
      dispatch({ type: "fetch_get_shop_list_success", payload: data });
    })
    .catch(({ response }) => {
      let message = (response && response.data.message) || "News not";
      toast.error(message);

      dispatch({ type: "fetch_get_shop_list_error", payload: message });
    });
};

// export const getShop = () => (dispatch) => {
//   dispatch({ type: "fetch_get_shop_start" });

//   requests
//     .getShop()
//     .then(({ data }) => {
//       dispatch({ type: "fetch_get_shop_success", payload: data });
//     })
//     .catch(({ response }) => {
//       let message = (response && response.data.message) || "News not";
//       toast.error(message);

//       dispatch({ type: "fetch_get_shop_error", payload: message });
//     });
// };

export const getShopFavoriteAll = () => (dispatch) => {
  dispatch({ type: "fetch_get_all_shop_start" });

  requests
    .getShopFavoriteAll()
    .then(({ data }) => {
      dispatch({ type: "fetch_get_all_shop_success", payload: data });
    })
    .catch(({ response }) => {
      let message = (response && response.data.message) || "News not";
      toast.error(message);

      dispatch({ type: "fetch_get_all_shop_error", payload: message });
    });
};

export const createShop = (params) => (dispatch) => {
  dispatch({ type: "create_shop_start", payload: params });

  requests
    .createShop(params)
    .then(({ data }) => {
      dispatch({ type: "create_shop_success", payload: data });
      // window.location.reload();
    })
    .catch(({ response }) => {
      let message = (response && response.data.message) || "News not";
      toast.error(message);

      dispatch({ type: "create_shop_error", payload: message });
    });
};

export const getShopDetail = (id) => (dispatch) => {
  dispatch({ type: "create_shop_detail_start", payload: id });

  requests
    .getShopDetail(id)
    .then(({ data }) => {
      dispatch({ type: "create_shop_detail_success", payload: data });
    })
    .catch(({ response }) => {
      let message = (response && response.data.message) || "News not";
      toast.error(message);

      dispatch({ type: "create_shop_detail_error", payload: message });
    });
};

export const getShopProducts = (id,params) => (dispatch) => {
  dispatch({ type: "fetch_shop_products_start", payload: id,params });

  requests
    .getShopProducts(id,params)
    .then(({ data }) => {
      dispatch({ type: "fetch_shop_products_success", payload: data });
    })
    .catch(({ response }) => {

      dispatch({ type: "fetch_shop_products_error", payload: response });
    });
};
