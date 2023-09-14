const INITIAL_STATE = {
  list: [],
  commentList: [],
  loading: false,
  loading3: false,
  message: null,
  sidebarShow: "responsive",
  data: {},
  oneCart: {},
  cartData: {},
  minusCart: false,
  toBuy: false,
  removeCart: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = INITIAL_STATE, { type, payload, ...rest }) => {
  switch (type) {
    // auth
    case "fetch_cart_start":
      return { ...state, loading: true, message: "" };
    case "fetch_cart_error":
      return { ...state, message: payload, loading: false };
    case "fetch_cart_success":
      return {
        ...state,
        loading: false,
        list: payload.data,
      };

    case "create_cart_start":
      return { ...state, loading: true, toBuy: false, message: "" };
    case "create_cart_error":
      return { ...state, message: payload, toBuy: false, loading: false };
    case "create_cart_success":
      return {
        ...state,
        loading: false,
        toBuy: true,
        oneCart: payload.data,
        // list: [
        //   ...state.list.map((item) =>
        //     item.id === payload.data.id ? payload.data : ""
        //   ),
        // ],
        // list: [...state.list, payload.data],
      };

    case "increment_cart_start":
      return { ...state, loading: true, toBuy: false, message: "" };
    case "increment_cart_error":
      return { ...state, message: payload, toBuy: false, loading: false };
    case "increment_cart_success":
      return {
        ...state,
        loading: false,
        toBuy: true,
        // list: payload.data,
      };

    case "remove_cart_start":
      return { ...state, loading: true, removeCart: false, message: "" };
    case "remove_cart_error":
      return { ...state, message: payload, removeCart: false, loading: false };
    case "remove_cart_success":
      return {
        ...state,
        loading: false,
        removeCart: true,
        // list: payload.data,
      };

    case "clear_cart_start":
      return { ...state, loading: true, message: "" };
    case "clear_cart_error":
      return { ...state, message: payload, loading: false };
    case "clear_cart_success":
      return {
        ...state,
        loading: false,
        list: payload.data,
      };

    case "fetch_get_comments_start":
      return { ...state, loading3: false, message: "" };
    case "fetch_get_comments_error":
      return { ...state, message: payload, loading3: false };
    case "fetch_get_comments_success":
      return {
        ...state,
        loading3: false,
        commentList: payload.data,
      };

    case "create_comment_start":
      return { ...state, loading3: false, message: "" };
    case "create_comment_error":
      return { ...state, message: payload, loading3: false };
    case "create_comment_success":
      return {
        ...state,
        loading3: false,
        commentList: payload.data.reviews,
      };

    case "fetch_get_comment_rate_start":
      return { ...state, loading: true, message: "" };
    case "fetch_get_comment_rate_error":
      return { ...state, message: payload, loading: false };
    case "fetch_get_comment_rate_success":
      return {
        ...state,
        loading: false,
        commentList: payload.data,
      };

    case "fetch_get_comment_date_start":
      return { ...state, loading: true, message: "" };
    case "fetch_get_comment_date_error":
      return { ...state, message: payload, loading: false };
    case "fetch_get_comment_date_success":
      return {
        ...state,
        loading: false,
        commentList: payload.data,
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
