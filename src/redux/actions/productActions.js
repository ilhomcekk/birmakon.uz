import requests from "../../helpers/requests";
import { toast } from "react-toastify";

// auth
export const getProductsAll = (params) => (dispatch) => {
  dispatch({ type: "fetch_products_start", payload: params });

  requests
    .getProductsAll(params)
    .then(({ data }) => {
      dispatch({ type: "fetch_products_success", payload: data });
    })
    .catch(({ response }) => {

      dispatch({ type: "fetch_products_error", payload: response });
    });
};

export const getPopularProducts = (params) => (dispatch) => {
  dispatch({ type: "fetch_popular_products_start", payload: params });

  requests
    .getPopularProducts(params)
    .then(({ data }) => {
      dispatch({ type: "fetch_popular_products_success", payload: data });
    })
    .catch(({ response }) => {

      dispatch({ type: "fetch_popular_products_error", payload: response });
    });
};

export const getDiscountProducts = (params) => (dispatch) => {
  dispatch({ type: "fetch_discount_products_start", payload: params });

  requests
    .getDiscountProducts(params)
    .then(({ data }) => {
      dispatch({ type: "fetch_discount_products_success", payload: data });
    })
    .catch(({ response }) => {
      dispatch({ type: "fetch_discount_products_error", payload: response });
    });
};

export const getRecentlyProducts = (params) => (dispatch) => {
  dispatch({ type: "fetch_recently_products_start", payload: params });

  requests
    .getRecentlyProducts(params)
    .then(({ data }) => {
      dispatch({ type: "fetch_recently_products_success", payload: data });
    })
    .catch(({ response }) => {
      dispatch({ type: "fetch_recently_products_error", payload: response });
    });
};

// getProductOne
export const getProductOne = (id) => (dispatch) => {
  dispatch({ type: "fetch_product_one_start", payload: id });

  requests
    .getProductOne(id)
    .then(({ data }) => {
      dispatch({ type: "fetch_product_one_success", payload: data });
    })
    .catch(({ response }) => {
      let message = (response && response.data.message) || "Product list not";
      toast.error(message);

      dispatch({ type: "fetch_product_one_error", payload: message });
    });
};

export const getSliders = (params) => (dispatch) => {
  dispatch({ type: "fetch_sliders_start", payload: params });

  requests
    .getSliders(params)
    .then(({ data }) => {
      dispatch({ type: "fetch_sliders_success", payload: data });
    })
    .catch(({ response }) => {
      let message = (response && response.data.message) || "Product list not";
      toast.error(message);

      dispatch({ type: "fetch_sliders_error", payload: message });
    });
};

export const productsViewed = (params) => (dispatch) => {
  dispatch({ type: "fetch_products_viewed_start", payload: params });

  requests
    .getProductsRecentlyViewed(params)
    .then(({ data }) => {
      dispatch({ type: "fetch_products_viewed_success", payload: data });
    })
    .catch(({ response }) => {

      dispatch({ type: "fetch_products_viewed_error", payload: response });
    });
};

export const relatedProducts = (id) => (dispatch) => {
  dispatch({ type: "fetch_related_products_start", payload: id });

  requests
    .relatedProducts(id)
    .then(({ data }) => {
      dispatch({ type: "fetch_related_products_success", payload: data });
    })
    .catch(({ response }) => {
      let message = (response && response.data.message) || "Product list not";
      toast.error(message);

      dispatch({ type: "fetch_related_products_error", payload: message });
    });
};

export const getBrands = () => (dispatch) => {
  dispatch({ type: "fetch_get_brands_start" });

  requests
    .getBrands()
    .then(({ data }) => {
      dispatch({ type: "fetch_get_brands_success", payload: data });
    })
    .catch(({ response }) => {
      let message = (response && response.data.message) || "Product list not";
      toast.error(message);

      dispatch({ type: "fetch_get_brands_error", payload: message });
    });
};

export const getDelivery = () => (dispatch) => {
  dispatch({ type: "fetch_get_delivery_start" });

  requests
    .getDelivery()
    .then(({ data }) => {
      dispatch({ type: "fetch_get_delivery_success", payload: data });
    })
    .catch(({ response }) => {
      let message = (response && response.data.message) || "Product list not";
      toast.error(message);

      dispatch({ type: "fetch_get_delivery_error", payload: message });
    });
};

export const getPayment = () => (dispatch) => {
  dispatch({ type: "fetch_get_payment_start" });

  requests
    .getPayment()
    .then(({ data }) => {
      dispatch({ type: "fetch_get_payment_success", payload: data });
    })
    .catch(({ response }) => {
      let message = (response && response.data.message) || "Product list not";
      toast.error(message);

      dispatch({ type: "fetch_get_payment_error", payload: message });
    });
};

export const getUnit = () => (dispatch) => {
  dispatch({ type: "fetch_get_unit_start" });

  requests
    .getUnit()
    .then(({ data }) => {
      dispatch({ type: "fetch_get_unit_success", payload: data });
    })
    .catch(({ response }) => {
      let message = (response && response.data.message) || "Product list not";
      toast.error(message);

      dispatch({ type: "fetch_get_unit_error", payload: message });
    });
};
