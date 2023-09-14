const INITIAL_STATE = {
  list: [],
  shopList: [],
  brand_list: [],
  logistSort: [],
  searchList: [],
  loading: false,
  loading2: false,
  message: null,
  searchListLoading: null,
  searchListPagination: {},
  pagination: null,
  productGalleryPagination: null,
  sidebarShow: "responsive",
  data: {},
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = INITIAL_STATE, { type, payload, ...rest }) => {
  switch (type) {
    // auth
    case "fetch_products_search_start":
      return { ...state, searchListLoading: true, message: "" };
    case "fetch_products_search_error":
      return { ...state, message: payload, searchListLoading: false };
    case "fetch_products_search_success":
      return {
        ...state,
        searchListLoading: false,
        searchListPagination: payload._meta,
        searchList: payload.data,
      };

    case "fetch_logist_sort_start":
      return { ...state, loading: true, message: "" };
    case "fetch_logist_sort_error":
      return { ...state, message: payload, loading: false };
    case "fetch_logist_sort_success":
      return {
        ...state,
        loading: false,
        logistSort: payload.data,
      };

    case "fetch_shops_filter_start":
      return { ...state, loading: true, message: "" };
    case "fetch_shops_filter_error":
      return { ...state, message: payload, loading: false };
    case "fetch_shops_filter_success":
      return {
        ...state,
        loading: false,
        shopList: payload.data,
      };

    // auth
    case "fetch_product_gallery_start":
      return { ...state, loading2: true, message: "" };
    case "fetch_product_gallery_error":
      return { ...state, message: payload, loading2: false };
    case "fetch_product_gallery_success":
      return {
        ...state,
        loading2: false,
        productGalleryPagination: payload._meta,
        list: payload.data,
      };

    case "fetch_product_price_down_start":
      return { ...state, loading2: true, message: "" };
    case "fetch_product_price_down_error":
      return { ...state, message: payload, loading2: false };
    case "fetch_product_price_down_success":
      return {
        ...state,
        loading2: false,
        list: payload.data,
      };

    case "fetch_product_price_up_start":
      return { ...state, loading2: true, message: "" };
    case "fetch_product_price_up_error":
      return { ...state, message: payload, loading2: false };
    case "fetch_product_price_up_success":
      return {
        ...state,
        loading2: false,
        list: payload.data,
      };

    case "fetch_product_sort_new_start":
      return { ...state, loading2: true, message: "" };
    case "fetch_product_sort_new_error":
      return { ...state, message: payload, loading2: false };
    case "fetch_product_sort_new_success":
      return {
        ...state,
        loading2: false,
        list: payload.data,
      };

    // case "fetch_category_brand_start":
    //   return { ...state, loading: true, message: "" };
    // case "fetch_category_brand_error":
    //   return { ...state, message: payload, loading: false };
    // case "fetch_category_brand_success":
    //   return {
    //     ...state,
    //     loading: false,
    //     brand_list: payload.data,
    //   };

    case "fetch_get_brands_start":
      return { ...state, loading: true, message: "" };
    case "fetch_get_brands_error":
      return { ...state, message: payload, loading: false };
    case "fetch_get_brands_success":
      return {
        ...state,
        loading: false,
        brand_list: payload.data,
      };

    // profile
    case "logout":
      return { ...INITIAL_STATE };

    //sidebar toggle reducer
    case "sidebar_toggle":
      return { ...state, ...rest };

    /* other */
    default:
      return state;
  }
};
