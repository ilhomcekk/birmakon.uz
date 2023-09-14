const INITIAL_STATE = {
  favoritiesList: [],
  loading: false,
  message: null,
  sidebarShow: "responsive",
  data: {},
  findId: {},
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = INITIAL_STATE, { type, payload, ...rest }) => {
  switch (type) {
    // auth
    case "fetch_favorite_all_start":
      return { ...state, loading: true, message: "" };
    case "fetch_favorite_all_error":
      return { ...state, message: payload, loading: false };
    case "fetch_favorite_all_success":
      return {
        ...state,
        loading: false,
        favoritiesList: payload.data,
      };

    case "create_favorite_start":
      return { ...state, loading: true, message: "" };
    case "create_favorite_error":
      return { ...state, message: payload, loading: false };
    case "create_favorite_success":
      return {
        ...state,
        loading: false,
        favoritiesList:
          payload.data.isFavorite === false
            ? state.favoritiesList.filter((item) => item.id !== payload.data.id)
            : [...state.favoritiesList, payload.data],
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
