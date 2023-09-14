import axios from "axios";
import store from "../redux/store";
// import https from "node:https";
// const agent = new https.Agent({
//   rejectUnauthorized: false,
// });

// const URL = en;
const URL = `${process.env.REACT_APP_API_DOMAIN}api`;
const token = window.localStorage.getItem("@token");

const language = window.localStorage.getItem("Content-language");
const region = window.localStorage.getItem("Content-region");
const currency = window.localStorage.getItem("Content-currency");
const langFunc = () => {
  if (language === null) {
    window.location.reload();
  }
};
langFunc();

const config = {
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-language": language || "uz",
    "Content-region": region || "г.Ташкент",
    "Content-rate": currency || "sum",
  },
};

// const httpsAgent = new https.Agent({
//   rejectUnauthorized: false,
// });
const tokenBTC = "8b9841c071a863dc468fadd9d511c4e8f214fb7f";

const configBTC = {
  headers: {
    Authorization: `Bearer ${tokenBTC}`,
    Accept: "application/json",
  },
};

const packageData = (data) => {
  const form = new FormData();
  for (const key in data) {
    if (Array.isArray(data[key])) {
      for (const childKey in data[key]) {
        form.append(`${key}[${childKey}]`, data[key][childKey]);
      }
    } else {
      form.append(key, data[key]);
    }
  }
  return form;
};

// axios.interceptors.request.use((e) => {
//   e.headers = {
//     ...config.headers,
//     Authorization: store.getState().auth.reduxToken
//       ? `Bearer ${store.getState().auth.reduxToken}`
//       : "",
//   };
//   return e;
// });

const request = {
  // BTC
  getBTCRegions: () =>
    axios.get(`https://api.bts.uz/index.php?r=directory/regions`, configBTC),
  getBTCCities: (id) =>
    axios.get(
      `https://api.bts.uz/index.php?r=directory/cities&regionId=${id}`,
      configBTC
    ),
  postCalculateBtc: (params) =>
    axios.post(
      "https://api.bts.uz/index.php?r=v1/order/calculate",
      packageData(params),
      configBTC
    ),
  postSendBTC: (params) =>
    axios.post(
      `http://api.bts.uz:8080/index.php?r=v1/order/add`,
      packageData(params),
      configBTC
    ),
  // Регистрация/Авторизация start --------------
  authSignUp: (params) =>
    axios.post(`${URL}/user/sign-up`, packageData(params)),
  authSignIn: (params) =>
    axios.post(`${URL}/user/sign-in`, packageData(params)),
  getMe: () => axios.get(`${URL}/user/profile`, config),
  postGetCode: (params) =>
    axios.post(`${URL}/user/send-code`, packageData(params), config),
  removeAccount: (params) =>
    axios.post(`${URL}/user/remove-account`, params, config),
  recoveryAccount: (params) =>
    axios.post(`${URL}/user/recover-password`, packageData(params)),
  recoveryCode: (params) =>
    axios.post(`${URL}/user/accept-recover-code`, packageData(params)),

  // Товары start => Сортировка =========================
  getCategoriesAll: () => axios.get(`${URL}/category`, config),
  getSubCategoriesAll: (id) =>
    axios.get(`${URL}/category/sub-category?id=${id}`, config),
  subCategoryFilter: (id) =>
    axios.get(`${URL}/category/filter?category_id=${id}`, config),
  getProductsByCategory: (id) =>
    axios.get(`${URL}/product/by-category?id=${id}`, config),
  getProductsByBrand: (id) => axios.get(`${URL}/product/by-brand?id=${id}`),
  relatedProducts: (id) =>
    axios.get(`${URL}/product/related-products?product_id=${id}`, config),
  getProductGalleryAll: (id, params) =>
    axios.get(`${URL}/product/by-filter?category_id=${id}`, {
      params,
      ...config,
    }),
  getPopularProducts: (params) =>
    axios.get(`${URL}/product?sort=popular`, { params, ...config }),
  getDiscountProducts: (params) =>
    axios.get(`${URL}/product?sort=discount`, { params, ...config }),
  getRecentlyProducts: (params) =>
    axios.get(`${URL}/product?sort=recently`, { params, ...config }),
  getProductPriceDown: () => axios.get(`${URL}/product?sort=price_down`),
  getProductPriceUp: () => axios.get(`${URL}/product?sort=price_up`),
  getProductSortNew: () => axios.get(`${URL}/product?sort=new`),
  // // Товары end => =========================
  // Компания logystic start ===================
  getLogistSort: (params) =>
    axios.get(`${URL}/logist/sort`, { params, ...config }),
  // Компания logystic end ================

  getRegions: () => axios.get(`${URL}/category?type=region`, config),
  getRegionsSub: (id) => axios.get(`${URL}/category/sub-category?id=${id}`, config),

  getProductsAll: (params) =>
    axios.get(`${URL}/product`, { params, ...config }),
  getProductOne: (id) => axios.get(`${URL}/product/detail?id=${id}`, config),
  // Слайдер =========================
  getSliders: () => axios.get(`${URL}/slider`),
  getLastNews: (params) => axios.get(`${URL}/news/last`, { params, ...config }),
  getProductsRecentlyViewed: (params) =>
    axios.get(`${URL}/product/recently-viewed`, { params, ...config }),
  createFavorite: (params) =>
    axios.post(`${URL}/product/set-favorite`, params, config),

  createCard: (params) =>
    axios.post(`${URL}/card/send`, packageData(params), config),
  verifyCart: (params) =>
    axios.post(`${URL}/card/send-verify-code`, packageData(params), config),
  removeCart: (id) => axios.post(`${URL}/user/card-remove`, id, config),
  statusCard: (id) => axios.post(`${URL}/card/check`, packageData(id), config),
  getCards: () => axios.get(`${URL}/card`, config),

  getFavoriteAll: () => axios.get(`${URL}/product/favorites`, config),
  // Корзинка start =========================
  getCart: () => axios.get(`${URL}/cart`, config),
  postCartAdd: (params) =>
    axios.post(`${URL}/cart/add`, packageData(params), config),
  postCartMinus: (params) => axios.post(`${URL}/cart/minus`, params, config),
  postCartRemove: (id) => axios.post(`${URL}/cart/remove`, id, config),
  postCartClear: (params) => axios.post(`${URL}/cart/clear`, params, config),
  updateProfile: (params) =>
    axios.post(`${URL}/user/update`, packageData(params), config),
  // Корзинка end =========================
  // Новости start =========================
  getNewsDetail: (id) => axios.get(`${URL}/news/detail?id=${id}`),
  getNewsLast: () => axios.get(`${URL}/news/last`),
  getNews: () => axios.get(`${URL}/news`),
  getNewsSearch: () => axios.get(`${URL}/news/search?query=test`),
  getProductSearch: (params) =>
    axios.get(`${URL}/product/search`, { params, ...config }),
  getShopSearch: (params) =>
    axios.get(`${URL}/shop/search`, { params, ...config }),
  // Новости end =========================
  // // Справочник start -----------------
  getCategory: () => axios.get(`${URL}/category?type=product`),
  // Заказы start =========================
  getOrder: () => axios.get(`${URL}/order`),
  waitOplataStatus: (params) => axios.get(`${URL}/order?status=6`, config),
  waitSendStatus: (params) => axios.get(`${URL}/order?status=3`, config),
  orderSendStatus: (params) => axios.get(`${URL}/order?status=4`, config),
  waitReviewStatus: (params) => axios.get(`${URL}/order?status=9`, config),
  endOrderStatus: (params) => axios.get(`${URL}/order?status=5`, config),
  sendOrder: (params) => axios.post(`${URL}/order/send`, params, config),
  createCheck: (params) =>
    axios.post(`${URL}/order/set-receipt`, params, config),
  createOplata: (params) =>
    axios.post(`${URL}/order/pay-receipt`, params, config),
  // getOrderDetail: axios.get(() => `${URL}/order/detail?id=12`),
  // Заказы end =========================
  getComments: (id) =>
    axios.get(`${URL}/product/reviews?product_id=${id}`, config),
  createComment: (params) =>
    axios.post(`${URL}/product/set-review`, params, config),
  getCommentFilterWithRate: (id) =>
    axios.get(`${URL}/product/reviews?product_id=${id}&sort_rating=asc`),
  getCommentFilterWithDate: (id) =>
    axios.get(`${URL}/product/reviews?product_id=${id}&sort_date=asc`),
  getBrands: () => axios.get(`${URL}/brand`),
  // Магазин
  // getShop: () => axios.get(`${URL}/shop-advertising`, config),
  getShopList: (params) => axios.get(`${URL}/shop`, { params, ...config }),
  createShop: (params) =>
    axios.post(`${URL}/shop/set-favorite`, params, config),
  getShopFavoriteAll: () => axios.get(`${URL}/shop/favorites`, config),
  getShopDetail: (id) => axios.get(`${URL}/shop/detail?id=${id}`),
  getShopProducts: (id, params) =>
    axios.get(`${URL}/product/by-shop?id=${id}`, { params, ...config }),
  // Сравнения
  compareList: () => axios.get(`${URL}/product/compares`, config),
  addCompare: (params) =>
    axios.post(`${URL}/product/set-compare`, params, config),

  chatCreate: (params) =>
    axios.post(`${URL}/chat/send`, packageData(params), config),
  createChatAdmin: (params) =>
    axios.post(`${URL}/feedback/send`, packageData(params), config),
  chatUsers: () => axios.get(`${URL}/chat/users?type_user=user`, config),
  chatMarkets: () => axios.get(`${URL}/chat/users?type_user=shop`, config),
  chatAdmins: () => axios.get(`${URL}/chat/users?type_user=admin`, config),
  chatDetail: (id) => axios.get(`${URL}/chat/messages?id=${id}`, config),
  removeChatRoom: (id) =>
    axios.post(`${URL}/chat/remove`, packageData(id), config),
  callCenter: () => axios.get(`${URL}/settings/call-center`, config),
  getCurrency: () => axios.get(`${URL}/category?type=currency`, config),
  getShopAddress: (id) => axios.get(`${URL}/category/addresses?shop_id=${id}`),
  getDelivery: () => axios.get(`${URL}/delivery`, config),
  getPayment: () => axios.get(`${URL}/category?type=payment`, config),
  getUnit: () => axios.get(`${URL}/category?type=unit`, config),
  // Уведомления
  getNotification: () => axios.get(`${URL}/notification`, config),
  getNewNotification: () => axios.get(`${URL}/notification?type=new`, config),
  setReaded: (params) =>
    axios.post(`${URL}/notification/set-readed`, params, config),
  getReaded: () => axios.get(`${URL}/notification?type=readed`, config),
  getReadedDetail: (id) =>
    axios.get(`${URL}/notification/detail?id=${id}`, config),
  // Транзакции
  getTransaction: () => axios.get(`${URL}/transaction`, config),
  // Возвраты
  postRefund: (params) =>
    axios.post(`${URL}/order/refund-send`, params, config),
  refundList: () => axios.get(`${URL}/order/refunds`, config),
  // Частые вопросы
  getQuestions: () => axios.get(`${URL}/question`),
  // Мои договора
  getDocument: () => axios.get(`${URL}/chat/documents`, config),
  getReklama: () => axios.get(`${URL}/shop-advertising`),
};

export default request;
