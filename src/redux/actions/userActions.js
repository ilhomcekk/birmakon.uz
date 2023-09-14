import requests from "../../helpers/requests";
import { toast } from "react-toastify";

// user
export const getMe = (params) => (dispatch) => {
  dispatch({ type: "fetch_user_start", payload: params });

  requests
    .getMe(params)
    .then(({ data }) => {
      dispatch({ type: "fetch_user_success", payload: data });
    })
    .catch(({ response }) => {
      let message = (response && response.data.message) || "User not found";
      // toast.error(message);
      // toast.error("Вам нужно зарегистрироваться");

      dispatch({ type: "fetch_user_error", payload: message });
    });
};

export const recoveryAccount = (params) => (dispatch) => {
  dispatch({ type: "post_recovery_account_start", payload: params });

  requests
    .recoveryAccount(params)
    .then(({ data }) => {
      dispatch({ type: "post_recovery_account_success", payload: data });
    })
    .catch(({ response }) => {
      let message = response.data.errors.phone && response.data.errors.phone[0];
      toast.error(message);

      dispatch({ type: "post_recovery_account_error", payload: message });
    });
};

export const recoveryCode = (params) => (dispatch) => {
  dispatch({ type: "post_recovery_code_start", payload: params });

  requests
    .recoveryCode(params)
    .then(({ data }) => {
      dispatch({ type: "post_recovery_code_success", payload: data });
    })
    .catch(({ response }) => {
      let message = response.data.errors.code && response.data.errors.code[0];
      toast.error(message);

      dispatch({ type: "post_recovery_code_error", payload: message });
    });
};

export const updateProfile = (params) => (dispatch) => {
  dispatch({ type: "update_profile_start", payload: params });

  requests
    .updateProfile(params)
    .then(({ data }) => {
      dispatch({ type: "update_profile_success", payload: data });
      toast.success("Успешно");
    })
    .catch(({ response }) => {
      let message =
        response.data?.errors?.email && response.data?.errors?.email[0];
      let message2 = response.data?.errors?.gender && "Укажите пол";
      let message3 =
        response.data?.errors?.phone &&
        "Номер телефона должен состоять из 12 цифр.";
      toast.error(message);
      toast.error(message2);
      toast.error(message3);

      dispatch({ type: "update_profile_error", payload: message });
    });
};

export const createCard = (params) => (dispatch) => {
  dispatch({ type: "create_card_user_start", payload: params });

  requests
    .createCard(params)
    .then(({ data }) => {
      dispatch({ type: "create_card_user_success", payload: data });
      toast.error(data?.data?.message && data?.data?.message);
    })
    .catch(({ response }) => {
      toast.error(response?.data?.message && response?.data?.message);
      toast.error(
        response?.data?.errors?.card_expire &&
          "Срок действия карты: " + response?.data?.errors?.card_expire[0]
      );
      toast.error(
        response?.data?.errors?.card_number &&
          "Номер карты: " + response?.data?.errors?.card_number[0]
      );
      toast.error(
        response?.data?.errors?.card_phone_number &&
          "Номер телефона: " + response?.data?.errors?.card_phone_number[0]
      );
      dispatch({ type: "create_card_user_error", payload: response });
    });
};

export const backStep = () => (dispatch) => {
  dispatch({ type: "back_step" });
};

export const verifyCart = (params) => (dispatch) => {
  dispatch({ type: "create_verify_cart_start", payload: params });

  requests
    .verifyCart(params)
    .then(({ data }) => {
      dispatch({ type: "create_verify_cart_success", payload: data });
      toast.error(data.error?.message && data.error?.message);
      if (!data?.error) {
        window.location.reload();
      }
    })
    .catch(({ response }) => {
      let message = response && response.data?.message;
      let message2 = response && response?.data?.errors?.card_id;
      toast.error(message);
      toast.error(message2);

      dispatch({ type: "create_verify_cart_error", payload: message });
    });
};

export const removeCart = (id) => (dispatch) => {
  dispatch({ type: "remove_cart_user_start", payload: id });

  requests
    .removeCart(id)
    .then(({ data }) => {
      dispatch({ type: "remove_cart_user_success", payload: { data, id } });
      toast.success("Успешно");
    })
    .catch(({ response }) => {
      let message = (response && response.data.message) || "User not found";
      toast.error(message);

      dispatch({ type: "remove_cart_user_error", payload: message });
    });
};

export const getCards = () => (dispatch) => {
  dispatch({ type: "fetch_get_cart_user_start" });

  requests
    .getCards()
    .then(({ data }) => {
      dispatch({ type: "fetch_get_cart_user_success", payload: data });
    })
    .catch(({ response }) => {
      let message = (response && response.data.message) || "User not found";

      dispatch({ type: "fetch_get_cart_user_error", payload: message });
    });
};

export const chatCreate = (params) => (dispatch) => {
  dispatch({ type: "create_send_start", payload: params });

  requests
    .chatCreate(params)
    .then(({ data }) => {
      dispatch({ type: "create_send_success", payload: data });
    })
    .catch(({ response }) => {
      let message = (response && response.data.message) || "User not found";

      dispatch({ type: "create_send_error", payload: message });
    });
};

export const backFirstChat = () => (dispatch) => {
  dispatch({ type: "back_first_chat" });
};

export const clearChat = () => (dispatch) => {
  dispatch({ type: "clear_chat" });
};

export const createChatAdmin = (params) => (dispatch) => {
  dispatch({ type: "create_send_admin_start", payload: params });

  requests
    .createChatAdmin(params)
    .then(({ data }) => {
      dispatch({ type: "create_send_admin_success", payload: data });
      toast.success("Ваше сообщение было отправлено");
    })
    .catch(({ response }) => {
      let message1 =
        response?.data?.errors?.name &&
        "name: " + response?.data?.errors?.name[0];
      let message2 =
        response?.data?.errors?.email &&
        "email:" + response?.data?.errors?.email[0];
      let message3 =
        response?.data?.errors?.message &&
        "comment:" + response?.data?.errors?.message[0];
      toast.error(message1);
      toast.error(message2);
      toast.error(message3);
      dispatch({ type: "create_send_admin_error", payload: response });
    });
};

export const chatUsers = () => (dispatch) => {
  dispatch({ type: "fetch_chat_users_start" });

  requests
    .chatUsers()
    .then(({ data }) => {
      dispatch({ type: "fetch_chat_users_success", payload: data });
    })
    .catch(({ response }) => {
      let message = (response && response.data.message) || "User not found";
      toast.error(message);

      dispatch({ type: "fetch_chat_users_error", payload: message });
    });
};

export const chatMarkets = () => (dispatch) => {
  dispatch({ type: "fetch_chat_markets_start" });

  requests
    .chatMarkets()
    .then(({ data }) => {
      dispatch({ type: "fetch_chat_markets_success", payload: data });
    })
    .catch(({ response }) => {
      dispatch({ type: "fetch_chat_markets_error", payload: response });
    });
};

export const removeChatRoom = (id) => (dispatch) => {
  dispatch({ type: "remove_chat_room_start", payload: id });

  requests
    .removeChatRoom(id)
    .then(({ data }) => {
      dispatch({ type: "remove_chat_room_success", payload: data });
      toast.success("Чат удален");
    })
    .catch(({ response }) => {
      let message = (response && response.data.message) || "News not";
      toast.error(message);

      dispatch({ type: "remove_chat_room_error", payload: message });
    });
};

export const chatAdmins = () => (dispatch) => {
  dispatch({ type: "fetch_chat_admins_start" });

  requests
    .chatAdmins()
    .then(({ data }) => {
      dispatch({ type: "fetch_chat_admins_success", payload: data });
    })
    .catch(({ response }) => {
      dispatch({ type: "fetch_chat_admins_error", payload: response });
    });
};

export const chatDetail = (id) => (dispatch) => {
  dispatch({ type: "fetch_chat_detail_start", payload: id });

  requests
    .chatDetail(id)
    .then(({ data }) => {
      dispatch({ type: "fetch_chat_detail_success", payload: data });
    })
    .catch(({ response }) => {
      let message = (response && response.data.message) || "User not found";

      dispatch({ type: "fetch_chat_detail_error", payload: message });
    });
};

export const callCenter = () => (dispatch) => {
  dispatch({ type: "fetch_call_center_start" });

  requests
    .callCenter()
    .then(({ data }) => {
      dispatch({ type: "fetch_call_center_success", payload: data });
    })
    .catch(({ response }) => {
      let message = (response && response.data.message) || "User not found";
      toast.error(message);

      dispatch({ type: "fetch_call_center_error", payload: message });
    });
};

export const getCurrency = () => (dispatch) => {
  dispatch({ type: "fetch_get_currency_start" });

  requests
    .getCurrency()
    .then(({ data }) => {
      dispatch({ type: "fetch_get_currency_success", payload: data });
    })
    .catch(({ response }) => {
      let message = (response && response.data.message) || "User not found";
      toast.error(message);

      dispatch({ type: "fetch_get_currency_error", payload: message });
    });
};

export const getShopAddress = (id) => (dispatch) => {
  dispatch({ type: "fetch_shop_address_start", payload: id });

  requests
    .getShopAddress(id)
    .then(({ data }) => {
      dispatch({ type: "fetch_shop_address_success", payload: data });
    })
    .catch(({ response }) => {
      dispatch({ type: "fetch_shop_address_error", payload: response });
    });
};

export const getNewNotification = () => (dispatch) => {
  dispatch({ type: "fetch_get_new_notification_start" });

  requests
    .getNewNotification()
    .then(({ data }) => {
      dispatch({ type: "fetch_get_new_notification_success", payload: data });
    })
    .catch(({ response }) => {
      let message = (response && response.data.message) || "User not found";

      dispatch({ type: "fetch_get_new_notification_error", payload: message });
    });
};

export const getNotification = () => (dispatch) => {
  dispatch({ type: "fetch_get_notification_start" });

  requests
    .getNotification()
    .then(({ data }) => {
      dispatch({ type: "fetch_get_notification_success", payload: data });
    })
    .catch(({ response }) => {
      let message = (response && response.data.message) || "User not found";

      dispatch({ type: "fetch_get_notification_error", payload: message });
    });
};

export const setReaded = (params) => (dispatch) => {
  dispatch({ type: "create_set_readed_start", payload: params });

  requests
    .setReaded(params)
    .then(({ data }) => {
      dispatch({ type: "create_set_readed_success", payload: data });
    })
    .catch(({ response }) => {
      let message = (response && response.data.message) || "User not found";

      dispatch({ type: "create_set_readed_error", payload: message });
    });
};

export const getReaded = () => (dispatch) => {
  dispatch({ type: "fetch_get_readed_start" });

  requests
    .getReaded()
    .then(({ data }) => {
      dispatch({ type: "fetch_get_readed_success", payload: data });
    })
    .catch(({ response }) => {
      let message = (response && response.data.message) || "User not found";

      dispatch({ type: "fetch_get_readed_error", payload: message });
    });
};

export const getReadedDetail = (id) => (dispatch) => {
  dispatch({ type: "fetch_get_readed_detail_start", payload: id });

  requests
    .getReadedDetail(id)
    .then(({ data }) => {
      dispatch({ type: "fetch_get_readed_detail_success", payload: data });
    })
    .catch(({ response }) => {
      let message = (response && response.data.message) || "User not found";

      dispatch({ type: "fetch_get_readed_detail_error", payload: message });
    });
};
