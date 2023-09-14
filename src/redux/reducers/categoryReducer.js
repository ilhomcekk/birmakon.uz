const INITIAL_STATE = {
  list: [],
  categoryList: [],
  subCategory: [],
  regions: [],
  regions_sub: [],
  loading: false,
  categoryLoading: false,
  subCategoryLoading: false,
  regionsLoading: false,
  message: null,
  sidebarShow: "responsive",
  data: {},
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = INITIAL_STATE, { type, payload, ...rest }) => {
  switch (type) {
    // auth
    case "fetch_categories_start":
      return { ...state, loading: true, message: "" };
    case "fetch_categories_error":
      return { ...state, message: payload, loading: false };
    case "fetch_categories_success":
      return {
        ...state,
        loading: false,
        list: payload.data,
      };

    case "fetch_get_categories_start":
      return { ...state, categoryLoading: true, message: "" };
    case "fetch_get_categories_error":
      return { ...state, message: payload, categoryLoading: false };
    case "fetch_get_categories_success":
      return {
        ...state,
        categoryLoading: false,
        categoryList: payload.data,
      };

    case "fetch_sub_categories_start":
      return { ...state, subCategoryLoading: true, message: "" };
    case "fetch_sub_categories_error":
      return { ...state, message: payload, subCategoryLoading: false };
    case "fetch_sub_categories_success":
      return {
        ...state,
        subCategoryLoading: false,
        subCategory: payload.data,
      };

    case "fetch_sub_category_filter_start":
      return { ...state, loading: true, message: "" };
    case "fetch_sub_category_filter_error":
      return { ...state, message: payload, loading: false };
    case "fetch_sub_category_filter_success":
      return {
        ...state,
        loading: false,
        subCategory: payload.data,
      };

    case "fetch_get_regions_start":
      return { ...state, regionsLoading: true, message: "" };
    case "fetch_get_regions_error":
      return { ...state, message: payload, regionsLoading: false };
    case "fetch_get_regions_success":
      return {
        ...state,
        regionsLoading: false,
        regions: payload.data,
      };

    case "fetch_get_regions_sub_start":
      return { ...state, loading: true, message: "" };
    case "fetch_get_regions_sub_error":
      return { ...state, message: payload, loading: false };
    case "fetch_get_regions_sub_success":
      return {
        ...state,
        loading: false,
        regions_sub: payload.data,
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
