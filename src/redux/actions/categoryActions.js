import requests from "../../helpers/requests";
import { toast } from "react-toastify";

export const getCategoriesAll = (params) => (dispatch) => {
  dispatch({ type: "fetch_categories_start", payload: params });

  requests
    .getCategoriesAll(params)
    .then(({ data }) => {
      dispatch({ type: "fetch_categories_success", payload: data });
    })
    .catch(({ response }) => {
      let message = (response && response.data.message) || "Product list not";
      toast.error(message);

      dispatch({ type: "fetch_categories_error", payload: message });
    });
};

export const getSubCategoriesAll = (id) => (dispatch) => {
  dispatch({ type: "fetch_sub_categories_start", payload: id });

  requests
    .getSubCategoriesAll(id)
    .then(({ data }) => {
      dispatch({ type: "fetch_sub_categories_success", payload: data });
    })
    .catch(({ response }) => {
      let message = (response && response.data.message) || "Product list not";
      toast.error(message);

      dispatch({ type: "fetch_sub_categories_error", payload: message });
    });
};

// export const getSubCategoriesAll = (id) => (dispatch) => {
//   // console.log('getSubCategoriesAll')
//   dispatch({ type: "fetch_sub_categories_start", payload: id });

//   requests
//     .getSubCategoriesAll(id)
//     .then((res) => {
//       console.log('res: ', res)
//       // сonsole.log('res: ', res)
//       const { data } = res
//       dispatch({ type: "fetch_sub_categories_success", payload: res?.data  });
//     })
//     .catch((response) => {
//       console.log('error: ', response)
//       let message = (response && response.data.message) || "Product list not";
//       toast.error(message);

//       dispatch({ type: "fetch_sub_categories_error", payload: message });
//     });
// };

export const getCategory = (params) => (dispatch) => {
  dispatch({ type: "fetch_get_categories_start", payload: params });

  requests
    .getCategory(params)
    .then(({ data }) => {
      dispatch({ type: "fetch_get_categories_success", payload: data });
    })
    .catch(({ response }) => {
      let message = (response && response.data.message) || "Product list not";
      toast.error(message);

      dispatch({ type: "fetch_get_categories_error", payload: message });
    });
};

export const subCategoryFilter = (id) => (dispatch) => {
  dispatch({ type: "fetch_sub_category_filter_start", payload: id });

  requests
    .subCategoryFilter(id)
    .then(({ data }) => {
      dispatch({ type: "fetch_sub_category_filter_success", payload: data });
    })
    .catch(({ response }) => {
      let message = (response && response.data.message) || "Product list not";
      toast.error(message);

      dispatch({ type: "fetch_sub_category_filter_error", payload: message });
    });
};

export const getRegions = () => (dispatch) => {
  dispatch({ type: "fetch_get_regions_start" });

  requests
    .getRegions()
    .then(({ data }) => {
      dispatch({ type: "fetch_get_regions_success", payload: data });
    })
    .catch(({ response }) => {
      let message = (response && response.data.message) || "Product list not";
      toast.error(message);

      dispatch({ type: "fetch_get_regions_error", payload: message });
    });
};

export const getRegionsSub = (id) => (dispatch) => {
  dispatch({ type: "fetch_get_regions_sub_start" });

  requests
    .getRegionsSub(id)
    .then(({ data }) => {
      dispatch({ type: "fetch_get_regions_sub_success", payload: data });
    })
    .catch(({ response }) => {
      let message = (response && response.data.message) || "Product list not";
      toast.error(message);

      dispatch({ type: "fetch_get_regions_sub_error", payload: message });
    });
};
