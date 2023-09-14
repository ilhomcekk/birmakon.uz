const INITIAL_STATE = {
  list: [],
  shopList: [],
  shopFavoriteList: [],
  loading: false,
  message: null,
  sidebarShow: "responsive",
  pagination: null,
  shopPagination: null,
  data: {},
  is_data: 0,
};

export default (state = INITIAL_STATE, { type, payload, ...rest }) => {
  switch (type) {
    case "fetch_get_shop_list_start":
      return { ...state, loading: true, message: "" };
    case "fetch_get_shop_list_error":
      return { ...state, message: payload, loading: false };
    case "fetch_get_shop_list_success":
      return {
        ...state,
        loading: false,
        shopPagination: payload._meta,
        shopList: payload.data,
      };

    // case "fetch_get_shop_start":
    //   return { ...state, loading: true, message: "" };
    // case "fetch_get_shop_error":
    //   return { ...state, message: payload, loading: false };
    // case "fetch_get_shop_success":
    //   return {
    //     ...state,
    //     loading: false,
    //     list: payload.data,
    //   };

    case "fetch_get_all_shop_start":
      return { ...state, loading: true, message: "" };
    case "fetch_get_all_shop_error":
      return { ...state, message: payload, loading: false };
    case "fetch_get_all_shop_success":
      return {
        ...state,
        loading: false,
        shopFavoriteList: payload.data,
      };

    case "create_shop_start":
      return { ...state, loading: true, message: "" };
    case "create_shop_error":
      return { ...state, message: payload, loading: false };
    case "create_shop_success":
      return {
        ...state,
        loading: false,
        shopFavoriteList:
          payload.data.isFavorite === false
            ? state.shopFavoriteList.filter(
                (item) => item.id !== payload.data.id
              )
            : [...state.shopFavoriteList, payload.data],
        // data: payload.data,
      };

    case "create_shop_detail_start":
      return { ...state, loading: true, message: "" };
    case "create_shop_detail_error":
      return { ...state, message: payload, loading: false };
    case "create_shop_detail_success":
      return {
        ...state,
        loading: false,
        data: payload.data,
      };

    case "fetch_shop_products_start":
      return { ...state, loading: true, message: "" };
    case "fetch_shop_products_error":
      return { ...state, message: payload, loading: false };
    case "fetch_shop_products_success":
      return {
        ...state,
        loading: false,
        pagination: payload._meta,
        list: payload.data,
      };

    case "sidebar_toggle":
      return { ...state, ...rest };
    default:
      return state;
  }
};
