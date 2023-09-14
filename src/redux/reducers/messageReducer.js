const INITIAL_STATE = {
  list: [],
  loading: false,
  message: null,
  sidebarShow: "responsive",
  data: {},
};

export default (state = INITIAL_STATE, { type, payload, ...rest }) => {
  switch (type) {
    case "fetch_documents_start":
      return { ...state, loading: true, message: "" };
    case "fetch_documents_error":
      return { ...state, message: payload, loading: false };
    case "fetch_documents_success":
      return {
        ...state,
        loading: false,
        list: payload.data,
      };

    case "sidebar_toggle":
      return { ...state, ...rest };
    default:
      return state;
  }
};
