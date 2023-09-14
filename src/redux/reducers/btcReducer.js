const INITIAL_STATE = {
  btcRegions: [],
  btcCities: [],
  btc: {},
  calculateBtc: null,
  loading: false,
  calculateLoading: false,
  sendLoading: false,
  message: null,
  sidebarShow: "responsive",
};

const btcReducer = (state = INITIAL_STATE, { type, payload, ...rest }) => {
  switch (type) {
    case "post_send_btc_start":
      return { ...state, sendLoading: true, message: "" };
    case "post_send_btc_error":
      return { ...state, message: payload, sendLoading: false };
    case "post_send_btc_success":
      return {
        ...state,
        sendLoading: false,
        btc: payload.summaryPrice,
      };

    case "post_calculate_btc_start":
      return { ...state, calculateLoading: true, message: "" };
    case "post_calculate_btc_error":
      return { ...state, message: payload, calculateLoading: false };
    case "post_calculate_btc_success":
      return {
        ...state,
        calculateLoading: false,
        calculateBtc: payload?.summaryPrice,
      };

    case "fetch_btc_regions_start":
      return { ...state, loading: true, step: false, message: "" };
    case "fetch_btc_regions_error":
      return { ...state, message: payload, loading: false };
    case "fetch_btc_regions_success":
      return {
        ...state,
        loading: false,
        btcRegions: payload.data,
      };

    case "fetch_btc_cities_start":
      return { ...state, loading: true, step: false, message: "" };
    case "fetch_btc_cities_error":
      return { ...state, message: payload, loading: false };
    case "fetch_btc_cities_success":
      return {
        ...state,
        loading: false,
        btcCities: payload.data,
      };

    case "sidebar_toggle":
      return { ...state, ...rest };
    default:
      return state;
  }
};

export default btcReducer;
