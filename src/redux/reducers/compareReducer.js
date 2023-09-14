const INITIAL_STATE = {
  list: [],
  loading: false,
  message: null,
  sidebarShow: "responsive",
  data: {},
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = INITIAL_STATE, { type, payload, ...rest }) => {
  switch (type) {
    case "create_compare_start":
      return { ...state, loading: true, message: "" };
    case "create_compare_error":
      return { ...state, message: payload, loading: false };
    case "create_compare_success":
      return {
        ...state,
        loading: false,
        data: payload.data,
      };

    case "fetch_compare_list_start":
      return { ...state, loading: true, message: "" };
    case "fetch_compare_list_error":
      return { ...state, message: payload, loading: false };
    case "fetch_compare_list_success":
      return {
        ...state,
        loading: false,
        list: payload.data,
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
