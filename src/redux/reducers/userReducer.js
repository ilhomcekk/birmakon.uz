const INITIAL_STATE = {
  list: [],
  messageList: [],
  adminList: [],
  chatUsers: [],
  chatMarkets: [],
  chatAdmin: [],
  currencyList: [],
  notificationList: [],
  newNotificationList: [],
  firstChat: [],
  shopAddresses: [],
  recoveryAccountLoading: false,
  recoveryAccountStep: 0,
  recoveryCodeLoading: false,
  chatDetail: [],
  cartList: [],
  loading: false,
  callCenterLoading: false,
  adminSendStep: false,
  message: null,
  sidebarShow: "responsive",
  data: {},
  user: {},
  call: {},
  readed: {},
  transaction: {},
  detailData: {},
  reduxToken: null,
  step: false,
  stepChat: false,
  chatRoomStep: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = INITIAL_STATE, { type, payload, ...rest }) => {
  switch (type) {
    // user
    case "fetch_user_start":
      return { ...state, loading: true, message: "" };
    case "fetch_user_error":
      return { ...state, message: payload, loading: false };
    case "fetch_user_success":
      return {
        ...state,
        loading: false,
        reduxToken: payload.data.token,
        user: payload.data,
      };

    case "post_recovery_account_start":
      return { ...state, recoveryAccountLoading: true, message: "" };
    case "post_recovery_account_error":
      return { ...state, message: payload, recoveryAccountLoading: false };
    case "post_recovery_account_success":
      return {
        ...state,
        recoveryAccountLoading: false,
        recoveryAccountStep: 1,
        recoveryAccount: payload.data,
      };

    case "post_recovery_code_start":
      return { ...state, recoveryCodeLoading: true, message: "" };
    case "post_recovery_code_error":
      return { ...state, message: payload, recoveryCodeLoading: false };
    case "post_recovery_code_success":
      return {
        ...state,
        recoveryCodeLoading: false,
        recoveryAccountStep: 2,
        recoveryCode: payload.data,
      };

    case "update_profile_start":
      return { ...state, loading: true, message: "" };
    case "update_profile_error":
      return { ...state, message: payload, loading: false };
    case "update_profile_success":
      return {
        ...state,
        loading: false,
        user: payload,
      };

    case "create_card_user_start":
      return { ...state, loading: true, step: false, message: "" };
    case "create_card_user_error":
      return { ...state, message: payload, step: true, loading: false };
    case "create_card_user_success":
      window.localStorage.setItem("card_id", payload.data.id);
      return {
        ...state,
        loading: false,
        step: true,
      };

    case "back_step":
      return {
        ...state,
        step: false,
      };

    case "create_verify_cart_start":
      return { ...state, loading: true, message: "" };
    case "create_verify_cart_error":
      return { ...state, message: payload, loading: false };
    case "create_verify_cart_success":
      window.localStorage.removeItem("card_id");
      return {
        ...state,
        loading: false,
        data: payload.data,
      };

    case "fetch_get_cart_user_start":
      return { ...state, loading: true, message: "" };
    case "fetch_get_cart_user_error":
      return { ...state, message: payload, loading: false };
    case "fetch_get_cart_user_success":
      return {
        ...state,
        loading: false,
        cartList: payload.data,
      };

    case "create_send_start":
      return { ...state, loading: true, stepChat: false, message: "" };
    case "create_send_error":
      return { ...state, message: payload, loading: false, stepChat: false };
    case "create_send_success":
      return {
        ...state,
        loading: false,
        stepChat: true,
        firstChat: payload.data,
        // chatDetail: payload.data,
      };

    case "back_first_chat":
      return {
        ...state,
        firstChat: [],
      };

    case "create_send_admin_start":
      return { ...state, loading: true, adminSendStep: false, message: "" };
    case "create_send_admin_error":
      return {
        ...state,
        message: payload,
        loading: false,
        adminSendStep: true,
      };
    case "create_send_admin_success":
      return {
        ...state,
        loading: false,
        adminSendStep: true,
        adminList: payload.data,
      };

    case "remove_cart_user_start":
      return { ...state, loading: true, message: "" };
    case "remove_cart_user_error":
      return { ...state, message: payload, loading: false };
    case "remove_cart_user_success":
      const newFilter = state.cartList.filter((item) => item.id !== payload.id);
      window.location.reload();

      return {
        ...state,
        loading: false,
        cartList: newFilter,
      };

    case "fetch_chat_users_start":
      return { ...state, loading: true, message: "" };
    case "fetch_chat_users_error":
      return { ...state, message: payload, loading: false };
    case "fetch_chat_users_success":
      return {
        ...state,
        loading: false,
        chatUsers: payload.data,
      };
    case "fetch_chat_markets_start":
      return { ...state, loading: true, message: "" };
    case "fetch_chat_markets_error":
      return { ...state, message: payload, loading: false };
    case "fetch_chat_markets_success":
      return {
        ...state,
        loading: false,
        chatMarkets: payload.data,
      };
    case "remove_chat_room_start":
      return { ...state, loading: true, chatRoomStep: true, message: "" };
    case "remove_chat_room_error":
      return {
        ...state,
        message: payload,
        chatRoomStep: false,
        loading: false,
      };
    case "remove_chat_room_success":
      return {
        ...state,
        loading: false,
        chatRoomStep: false,
        chatMarkets: payload.data,
      };

    case "fetch_chat_admins_start":
      return { ...state, loading: true, message: "" };
    case "fetch_chat_admins_error":
      return { ...state, message: payload, loading: false };
    case "fetch_chat_admins_success":
      return {
        ...state,
        loading: false,
        chatAdmin: payload.data,
      };

    case "fetch_chat_detail_start":
      return { ...state, loading: true, message: "" };
    case "fetch_chat_detail_error":
      return { ...state, message: payload, loading: false };
    case "fetch_chat_detail_success":
      return {
        ...state,
        loading: false,
        chatDetail: payload.data,
      };

    case "clear_chat":
      return {
        ...state,
        loading: false,
        chatDetail: [],
      };

    case "fetch_call_center_start":
      return { ...state, callCenterLoading: true, message: "" };
    case "fetch_call_center_error":
      return { ...state, message: payload, callCenterLoading: false };
    case "fetch_call_center_success":
      return {
        ...state,
        callCenterLoading: false,
        call: payload.data,
      };

    case "fetch_get_currency_start":
      return { ...state, loading: true, message: "" };
    case "fetch_get_currency_error":
      return { ...state, message: payload, loading: false };
    case "fetch_get_currency_success":
      return {
        ...state,
        loading: false,
        currencyList: payload.data,
      };

    case "fetch_shop_address_start":
      return { ...state, loading: true, message: "" };
    case "fetch_shop_address_error":
      return { ...state, message: payload, loading: false };
    case "fetch_shop_address_success":
      return {
        ...state,
        loading: false,
        shopAddresses: payload.data,
      };

    case "fetch_get_notification_start":
      return { ...state, loading: true, message: "" };
    case "fetch_get_notification_error":
      return { ...state, message: payload, loading: false };
    case "fetch_get_notification_success":
      return {
        ...state,
        loading: false,
        notificationList: payload.data,
      };

    case "fetch_get_new_notification_start":
      return { ...state, loading: true, message: "" };
    case "fetch_get_new_notification_error":
      return { ...state, message: payload, loading: false };
    case "fetch_get_new_notification_success":
      return {
        ...state,
        loading: false,
        newNotificationList: payload.data,
      };

    case "create_set_readed_start":
      return { ...state, loading: true, message: "" };
    case "create_set_readed_error":
      return { ...state, message: payload, loading: false };
    case "create_set_readed_success":
      return {
        ...state,
        loading: false,
        readed: payload.data,
      };

    case "fetch_get_readed_start":
      return { ...state, loading: true, message: "" };
    case "fetch_get_readed_error":
      return { ...state, message: payload, loading: false };
    case "fetch_get_readed_success":
      return {
        ...state,
        loading: false,
        typeReaded: payload.data,
      };

    case "fetch_get_readed_detail_start":
      return { ...state, loading: true, message: "" };
    case "fetch_get_readed_detail_error":
      return { ...state, message: payload, loading: false };
    case "fetch_get_readed_detail_success":
      return {
        ...state,
        loading: false,
        detailData: payload.data,
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
