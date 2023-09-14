const INITIAL_STATE = {
  list: [],
  sliders: [],
  products_viewed: [],
  related_products: [],
  brands_main: [],
  deliveryList: [],
  paymentList: [],
  unitList: [],
  popularProducts: [],
  recentlyProducts: [],
  discountProducts: [],
  discountProductsLoading: false,
  popularProductsLoading: false,
  recentlyProductsLoading: false,
  products_viewedLoading: false,
  oneProductLoading: false,
  loading: false,
  message: null,
  sidebarShow: "responsive",
  data: {},
  is_data: 0,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = INITIAL_STATE, { type, payload, ...rest }) => {
  switch (type) {
    // auth
    case "fetch_products_start":
      return { ...state, loading: true, message: "" };
    case "fetch_products_error":
      return { ...state, message: payload, loading: false };
    case "fetch_products_success":
      return {
        ...state,
        loading: false,
        list: payload.data,
      };

    case "fetch_popular_products_start":
      return { ...state, popularProductsLoading: true, message: "" };
    case "fetch_popular_products_error":
      return { ...state, message: payload, popularProductsLoading: false };
    case "fetch_popular_products_success":
      return {
        ...state,
        popularProductsLoading: false,
        popularProducts: payload.data,
      };

    case "fetch_discount_products_start":
      return { ...state, discountProductsLoading: true, message: "" };
    case "fetch_discount_products_error":
      return { ...state, message: payload, discountProductsLoading: false };
    case "fetch_discount_products_success":
      return {
        ...state,
        discountProductsLoading: false,
        discountProducts: payload.data,
      };

    case "fetch_recently_products_start":
      return { ...state, recentlyProductsLoading: true, message: "" };
    case "fetch_recently_products_error":
      return { ...state, message: payload, recentlyProductsLoading: false };
    case "fetch_recently_products_success":
      return {
        ...state,
        recentlyProductsLoading: false,
        recentlyProducts: payload.data,
      };

    // Fetch product one
    case "fetch_product_one_start":
      return { ...state, oneProductLoading: true, message: "" };
    case "fetch_product_one_error":
      return { ...state, message: payload, oneProductLoading: false };
    case "fetch_product_one_success":
      return {
        ...state,
        oneProductLoading: false,
        is_data: 1,
        data: payload.data,
      };

    // sliders
    case "fetch_sliders_start":
      return { ...state, loading: true, message: "" };
    case "fetch_sliders_error":
      return { ...state, message: payload, loading: false };
    case "fetch_sliders_success":
      return {
        ...state,
        loading: false,
        sliders: payload.data,
      };
    // products viewed
    case "fetch_products_viewed_start":
      return { ...state, products_viewedLoading: true, message: "" };
    case "fetch_products_viewed_error":
      return { ...state, message: payload, products_viewedLoading: false };
    case "fetch_products_viewed_success":
      return {
        ...state,
        products_viewedLoading: false,
        products_viewed: payload.data,
      };

    case "fetch_related_products_start":
      return { ...state, loading: true, message: "" };
    case "fetch_related_products_error":
      return { ...state, message: payload, loading: false };
    case "fetch_related_products_success":
      return {
        ...state,
        loading: false,
        related_products: payload.data,
      };

    // brands
    case "fetch_get_brands_start":
      return { ...state, loading: true, message: "" };
    case "fetch_get_brands_error":
      return { ...state, message: payload, loading: false };
    case "fetch_get_brands_success":
      return {
        ...state,
        loading: false,
        brands_main: payload.data,
      };

    case "fetch_get_delivery_start":
      return { ...state, loading: true, message: "" };
    case "fetch_get_delivery_error":
      return { ...state, message: payload, loading: false };
    case "fetch_get_delivery_success":
      return {
        ...state,
        loading: false,
        deliveryList: payload.data,
      };

    case "fetch_get_payment_start":
      return { ...state, loading: true, message: "" };
    case "fetch_get_payment_error":
      return { ...state, message: payload, loading: false };
    case "fetch_get_payment_success":
      return {
        ...state,
        loading: false,
        paymentList: payload.data,
      };

    case "fetch_get_unit_start":
      return { ...state, loading: true, message: "" };
    case "fetch_get_unit_error":
      return { ...state, message: payload, loading: false };
    case "fetch_get_unit_success":
      return {
        ...state,
        loading: false,
        unitList: payload.data,
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
