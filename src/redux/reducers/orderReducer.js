const INITIAL_STATE = {
  list: [],
  transactionList: [],
  orderList: [],
  refundList: [],
  loading: false,
  message: null,
  sidebarShow: "responsive",
  data: {},
  refund: {},
  checkData: {},
  step: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = INITIAL_STATE, { type, payload, ...rest }) => {
  switch (type) {
    // order
    case "fetch_send_order_start":
      return { ...state, loading: true, step: false, message: "" };
    case "fetch_send_order_error":
      return { ...state, message: payload, loading: false, step: false };
    case "fetch_send_order_success":
      window.localStorage.setItem("order_id", payload.data.id);
      return {
        ...state,
        loading: false,
        step: true,
      };

    case "fetch_wait_oplata_status_start":
      return { ...state, loading: true, message: "" };
    case "fetch_wait_oplata_status_error":
      return { ...state, message: payload, loading: false };
    case "fetch_wait_oplata_status_success":
      return {
        ...state,
        loading: false,
        list: payload.data,
        waitOplataStatus: payload.data,
      };

    case "fetch_wait_send_status_start":
      return { ...state, loading: true, message: "" };
    case "fetch_wait_send_status_error":
      return { ...state, message: payload, loading: false };
    case "fetch_wait_send_status_success":
      return {
        ...state,
        loading: false,
        list: payload.data,
        waitSendStatus: payload.data,
      };

    case "fetch_order_send_status_start":
      return { ...state, loading: true, message: "" };
    case "fetch_order_send_status_error":
      return { ...state, message: payload, loading: false };
    case "fetch_order_send_status_success":
      return {
        ...state,
        loading: false,
        list: payload.data,
        orderSendStatus: payload.data,
      };

    case "fetch_wait_review_status_start":
      return { ...state, loading: true, message: "" };
    case "fetch_wait_review_status_error":
      return { ...state, message: payload, loading: false };
    case "fetch_wait_review_status_success":
      return {
        ...state,
        loading: false,
        list: payload.data,
        waitReviewStatus: payload.data,
      };

    case "fetch_end_order_status_start":
      return { ...state, loading: true, message: "" };
    case "fetch_end_order_status_error":
      return { ...state, message: payload, loading: false };
    case "fetch_end_order_status_success":
      return {
        ...state,
        loading: false,
        list: payload.data,
        endOrderStatus: payload.data,
      };

    case "create_check_start":
      return { ...state, loading: true, message: "" };
    case "create_check_error":
      return { ...state, message: payload, loading: false, step: false };
    case "create_check_success":
      window.localStorage.setItem("order_receipt_id", payload.data.id);
      return {
        ...state,
        loading: false,
        step: false,
        checkData: payload.data,
      };

    case "create_oplata_start":
      return { ...state, loading: true, message: "" };
    case "create_oplata_error":
      return { ...state, message: payload, loading: false };
    case "create_oplata_success":
      window.localStorage.removeItem("order_id");
      window.localStorage.removeItem("order_receipt_id");
      return {
        ...state,
        loading: false,
        checkData: payload.data,
      };

    case "fetch_get_transaction_start":
      return { ...state, loading: true, message: "" };
    case "fetch_get_transaction_error":
      return { ...state, message: payload, loading: false };
    case "fetch_get_transaction_success":
      return {
        ...state,
        loading: false,
        transactionList: payload.data,
      };

    case "create_refund_start":
      return { ...state, loading: true, message: "" };
    case "create_refund_error":
      return { ...state, message: payload, loading: false };
    case "create_refund_success":
      return {
        ...state,
        loading: false,
        refundList: [...state.refundList, payload.data],
      };

    case "fetch_refunds_start":
      return { ...state, loading: true, message: "" };
    case "fetch_refunds_error":
      return { ...state, message: payload, loading: false };
    case "fetch_refunds_success":
      return {
        ...state,
        loading: false,
        refundList: payload.data,
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
