import requests from "../../helpers/requests";
import { toast } from "react-toastify";

// auth
export const getProductSearch = (params) => (dispatch) => {
  dispatch({ type: "fetch_products_search_start", payload: params });

  requests
    .getProductSearch(params)
    .then(({ data }) => {
      dispatch({ type: "fetch_products_search_success", payload: data });
    })
    .catch(({ response }) => {
      dispatch({ type: "fetch_products_search_error", payload: response });
    });
};

export const getShopsByFilter = (params) => (dispatch) => {
  dispatch({ type: "fetch_shops_filter_start", payload: params });

  requests
    .getShopSearch(params)
    .then(({ data }) => {
      dispatch({ type: "fetch_shops_filter_success", payload: data });
    })
    .catch(({ response }) => {
      let message = (response && response.data.message) || "Product list not";
      toast.error(message);

      dispatch({ type: "fetch_shops_filter_error", payload: message });
    });
};

// auth
export const getProductGalleryAll = (id, params) => (dispatch) => {
  dispatch({ type: "fetch_product_gallery_start", payload: id, params });
  requests
    .getProductGalleryAll(id, params)
    .then(({ data }) => {
      dispatch({ type: "fetch_product_gallery_success", payload: data });
    })
    .catch(({ response }) => {
      let message = (response && response.data.message) || "Product list not";

      dispatch({ type: "fetch_product_gallery_error", payload: message });
    });
};

export const getProductPriceDown = () => (dispatch) => {
  dispatch({ type: "fetch_product_price_down_start" });

  requests
    .getProductPriceDown()
    .then(({ data }) => {
      dispatch({ type: "fetch_product_price_down_success", payload: data });
    })
    .catch(({ response }) => {
      let message = (response && response.data.message) || "Product list not";

      dispatch({ type: "fetch_product_price_down_error", payload: message });
    });
};

export const getProductPriceUp = () => (dispatch) => {
  dispatch({ type: "fetch_product_price_up_start" });

  requests
    .getProductPriceUp()
    .then(({ data }) => {
      dispatch({ type: "fetch_product_price_up_success", payload: data });
    })
    .catch(({ response }) => {
      let message = (response && response.data.message) || "Product list not";

      dispatch({ type: "fetch_product_price_up_error", payload: message });
    });
};

export const getProductSortNew = () => (dispatch) => {
  dispatch({ type: "fetch_product_sort_new_start" });

  requests
    .getProductSortNew()
    .then(({ data }) => {
      dispatch({ type: "fetch_product_sort_new_success", payload: data });
    })
    .catch(({ response }) => {
      let message = (response && response.data.message) || "Product list not";

      dispatch({ type: "fetch_product_sort_new_error", payload: message });
    });
};

export const getLogistSort = (params) => (dispatch) => {
  dispatch({ type: "fetch_logist_sort_start", payload: params });

  requests
    .getLogistSort(params)
    .then(({ data }) => {
      dispatch({ type: "fetch_logist_sort_success", payload: data });
    })
    .catch(({ response }) => {
      let message = (response && response.data.message) || "Product list not";

      dispatch({ type: "fetch_logist_sort_error", payload: message });
    });
};

export const getProductsByBrand = (params) => (dispatch) => {
  dispatch({ type: "fetch_category_brand_start", payload: params });

  requests
    .getProductsByBrand(params)
    .then(({ data }) => {
      dispatch({ type: "fetch_category_brand_success", payload: data });
    })
    .catch(({ response }) => {
      let message = (response && response.data.message) || "Product list not";
      toast.error(message);

      dispatch({ type: "fetch_category_brand_error", payload: message });
    });
};

export const getBrands = (params) => (dispatch) => {
  dispatch({ type: "fetch_get_brands_start", payload: params });

  requests
    .getBrands(params)
    .then(({ data }) => {
      dispatch({ type: "fetch_get_brands_success", payload: data });
    })
    .catch(({ response }) => {
      let message = (response && response.data.message) || "Product list not";
      toast.error(message);

      dispatch({ type: "fetch_get_brands_error", payload: message });
    });
};
