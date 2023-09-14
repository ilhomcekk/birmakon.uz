import React, { useEffect, useState } from "react";
import Title from "../../component/Title/Title";
import Counter from "../../component/Counter/Counter";
import { MContainer, Link } from "../../element/Elemens";
import { toast } from "react-toastify";
import { VscTrash } from "react-icons/vsc";
import "../../assets/scss/_basket.scss";
import {
  postCartAdd,
  postCartRemove,
  postCartMinus,
  postCartClear,
  getCart,
} from "../../redux/actions/cartActions";
import { useDispatch, useSelector } from "react-redux";
import request from "../../helpers/requests";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { Navigation, Pagination, Scrollbar, A11y, Lazy } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/lazy";
import CreditCard from "../info/CreditCard";
import { getDelivery, getPayment } from "../../redux/actions/productActions";
import { getCards, getShopAddress } from "../../redux/actions/userActions";
import { Button } from "@mui/material";
import MapPayment from "../add/Map";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Tabs, TabList, TabPanel } from "react-tabs";
import { getRegionsSub } from "../../redux/actions/categoryActions";
import { getLogistSort } from "../../redux/actions/filterActions";
import { BsChevronDown } from "react-icons/bs";
import noBasketPhoto from "../../assets/images/noBasketBirmakon.avif";
import {
  getBTCCities,
  getBTCRegions,
  postCalculateBtc,
} from "../../redux/actions/btcActions";
import PreLoader from "../../component/PreLoader/PreLoader";

const URL = "https://admin.birmakon.uz/";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80vw",
  height: "80vh",
  bgcolor: "background.paper",
  background: "#000",
  boxShadow: 24,
  p: 4,
};

const style2 = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: "80%",
  height: "80%",
  background: "#fff",
  boxShadow: 24,
  p: 4,
};

const receiverDeliveryList = [
  {
    id: 0,
    name: "Забрать с офиса БТС",
  },
  {
    id: 1,
    name: "Доставить курьером(город)",
  },
  {
    id: 2,
    name: "Доставить курьером(с дальнего посёлка)",
  },
];

const Basket = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

  const [address, setAddress] = useState(user?.last_address);
  const [payment_id, setPaymentId] = useState(0);
  const [receiver, setReceiver] = useState(0);
  const [name, setName] = useState(user?.name);
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState(user?.email);
  const [phone, setPhone] = useState(user?.phone);
  const [delivery_id, setDeliveryId] = useState(0);
  const [card_id, setCardId] = useState();
  const [openBox, setOpenBox] = useState(false);
  const currency = window.localStorage.getItem("Content-currency");

  const [selectAddres, setSelectAddres] = React.useState("");

  const handleChange = (event) => {
    setSelectAddres(event.target.value);
  };
  // const defaultProps = {
  //   center: {
  //     lat: 10.99835602,
  //     lng: 77.01502627,
  //   },
  //   zoom: 11,
  // };

  const [addressMap, setAddressMap] = useState("");
  const [coordinate, setCoordinate] = useState("");
  const { oneCart } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getDelivery());
    dispatch(getPayment());
    dispatch(getCards());
    dispatch(getBTCRegions());
  }, []);
  useEffect(() => {
    dispatch(getCart());
  }, [oneCart]);

  const [showModal, setShowModal] = useState(false);
  const regions = useSelector((state) => state.category.regions);
  const regions_sub = useSelector((state) => state.category.regions_sub);
  const sortLists = useSelector((state) => state.filter.logistSort);
  const units = useSelector((state) => state.product.unitList);
  const [logist, setLogist] = useState(null);
  const [logistId, setLogistId] = useState(null);
  const [logistId2, setLogistId2] = useState();
  const [logist2, setLogist2] = useState(null);
  let logist2Split = logist2?.split(" ");
  const [openModal, setOpenModal] = useState(false);
  const [delivery, setDelivery] = useState();
  const [delivery2, setDelivery2] = useState();

  const { step } = useSelector((state) => state.order);
  const cartList = useSelector((state) => state.cart.list);
  const { loading } = useSelector((state) => state.cart);
  const { toBuy } = useSelector((state) => state.cart);
  const deliveries = useSelector((state) => state.product.deliveryList);
  const payments = useSelector((state) => state.product.paymentList);
  const carts = useSelector((state) => state.user.cartList);
  const shopAddresses = useSelector((state) => state.user.shopAddresses);
  const [shop_address_id, setShopAddressId] = useState();
  const [shop_id, setShopId] = useState("");
  const [selectedShopId, setSelectedShopId] = useState();
  const [fakeSelectedShopId, setFakeSelectedShopId] = useState();
  const [product_id, setProductId] = useState("");

  let cart_amount = 0;
  if (selectedShopId) {
    selectedShopId?.cart?.forEach((item) => {
      return (cart_amount += item?.amount);
    });
  }
  if (product_id?.product?.id) {
    cart_amount += product_id?.amount;
  }
  // useEffect(() => {
  //   selectedShopId?.cart?.forEach((item) => (cart_amount += item?.amount));
  // }, [selectedShopId]);
  const [filter, setFilter] = useState({
    region_id: 0,
    unit_id: 38,
    amount: cart_amount,
  });
  useEffect(() => {
    let newFilter = {
      ...filter,
      amount: cart_amount,
    };
    setFilter(newFilter);
  }, [cart_amount]);
  const [selectedLogistCity, setSelectedLogistCity] = useState("");
  const region_name = regions_sub?.find((obj) => {
    return obj.id === Number(filter?.region_id);
  });

  // const selectedCard = carts?.find((item) => item.id === card_id);

  let total_amount = 0;
  function myTotalState(item) {
    let newPrice = 0;
    newPrice += item?.price;
    console.log(newPrice);
    return (total_amount += newPrice);
  }

  // if (shop_id) {
  //   selectedShopId?.cart?.forEach((subitem) => {
  //     total_amount += subitem?.price;
  //   });
  // }
  // if (product_id) {
  //   total_amount += product_id?.price;
  // }
  if (selectedShopId) {
    selectedShopId?.cart?.forEach(myTotalState);
  }
  if (product_id) {
    myTotalState(product_id);
  }

  useEffect(() => {
    if (selectedShopId) {
      setProductId("");
    }
    if (product_id) {
      setSelectedShopId("");
    }
  }, [selectedShopId, product_id]);

  // cart
  const sendOrder = (params) => {
    dispatch({ type: "fetch_send_order_start", payload: params });

    request
      .sendOrder(params)
      .then(({ data }) => {
        dispatch({ type: "fetch_send_order_success", payload: data });
        navigate("/deliverycart");
        // window.location.reload();
        toast.success("Успешно пошел на заказ");
      })
      .catch(({ response }) => {
        let message =
          response.data.errors.logist_id && response.data.errors.logist_id;
        let message2 =
          response.data.errors.payment_id &&
          "Идентификатор платежа недействителен.";
        let message3 = response.data.errors.address && "Заполните адрес";
        let message4 = response.data.errors.cart && response.data.errors.cart;
        toast.error(message);
        toast.error(message2);
        toast.error(message3);
        toast.error(message4);

        dispatch({ type: "fetch_send_order_error", payload: message });
      });
  };

  const createCheck = (params) => {
    dispatch({ type: "create_check_start", payload: params });

    request
      .createCheck(params)
      .then(({ data }) => {
        dispatch({ type: "create_check_success", payload: data });
        let message = data.data?.error?.message && data.data?.error?.message;
        toast.error(message);
      })
      .catch(({ response }) => {
        let message = response && response.data.errors.message;
        toast.error(message);

        dispatch({ type: "create_check_error", payload: message });
      });
  };

  const order_id = window.localStorage.getItem("order_id");
  const order_receipt_id = window.localStorage.getItem("order_receipt_id");

  const createOplata = (params) => {
    dispatch({ type: "create_oplata_start", payload: params });

    request
      .createOplata(params)
      .then(({ data }) => {
        dispatch({ type: "create_oplata_success", payload: data });
        navigate("/deliverycart");
        toast.success("Оплачено");
      })
      .catch(({ response }) => {
        let message = response && response.data.errors;
        // toast.error(message);
        dispatch({ type: "create_oplata_error", payload: message });
      });
  };

  useEffect(() => {
    if (step === true) {
      createCheck({ order_id: order_id });
      if (payment_id === 37) {
        createOplata({
          order_receipt_id: order_receipt_id,
          card_id: card_id,
        });
      }
    }
  }, [step]);

  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [openBtc, setOpenBtc] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleOpenBtc = () => setOpenBtc(true);
  const handleOpen2 = () => {
    let newFilter = {
      ...filter,
      amount: cart_amount,
    };
    setFilter(newFilter);
    dispatch(getLogistSort(newFilter));
    setOpen2(true);
  };
  const handleClose = () => setOpen(false);
  const handleCloseBtc = () => setOpenBtc(false);
  const handleClose2 = () => setOpen2(false);

  // const [sendButtonState, setSendButtonState] = useState(false);
  // useEffect(() => {
  //   cartList?.forEach((item) => {
  //     if (item?.product?.shop?.id !== cartList[0]?.product?.shop?.id) {
  //       setSendButtonState(true);
  //     } else {
  //       setSendButtonState(false);
  //     }
  //   });
  //   cartList && dispatch(getShopAddress(cartList[0]?.product?.shop?.id));
  // }, [cartList]);

  useEffect(() => {
    const cartListFind = cartList?.find((item) => item.id === shop_id);
    setFakeSelectedShopId(cartListFind);
    if (!product_id) {
      setSelectedShopId(cartListFind);
    } else {
      setSelectedShopId("");
    }
  }, [cartList, shop_id, product_id]);

  const handleChangeShopId = (event) => {
    setShopAddressId(event.target.value);
  };

  useEffect(() => {
    if (delivery_id === 1) {
      setShopAddressId();
      setBtcDeliveryPrice(0);
    }
    if (delivery_id === 2) {
      setLogistId2("");
      setLogist2("");
      setBtcDeliveryPrice(0);
      dispatch(getShopAddress(selectedShopId?.id));
    }
    if (delivery_id === 3) {
      setLogistId2("");
      setLogist2("");
      setShopAddressId();
    }
  }, [delivery_id]);

  const onClickDecrementFunc = (product_id_count) => {
    dispatch(
      postCartAdd({
        amount: 1,
        product_id: product_id_count,
      })
    );
    dispatch(getCart());
  };

  const [btcReceiverId, setBtcReceiverId] = useState();
  let btcWeight = 0;
  const handleWeight = async () => {
    if (selectedShopId) {
      await selectedShopId?.cart?.forEach((item) => {
        btcWeight += item?.amount * item?.product?.weight;
        console.log(btcWeight);
      });
    }
  };
  handleWeight();
  let btcVolume = 0;
  const handleVolume = async () => {
    if (selectedShopId) {
      await selectedShopId?.cart?.forEach((item) => {
        let length = item?.amount * item?.product?.length;
        let height = item?.amount * item?.product?.height;
        let width = item?.amount * item?.product?.width;
        let S = length * height * width;
        btcVolume += S;
      });
    }
    if (product_id) {
      let length = product_id?.amount * product_id?.product?.length;
      let height = product_id?.amount * product_id?.product?.height;
      let width = product_id?.amount * product_id?.product?.width;
      let S = length * height * width;
      btcVolume += S;
    }
  };
  handleVolume();
  const [btcCity, setBtcCity] = useState("");
  const date = new Date();
  const today =
    date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
  const btcRegions = useSelector((state) => state.btc.btcRegions);
  const btcCities = useSelector((state) => state.btc.btcCities);
  const { calculateBtc } = useSelector((state) => state.btc);
  const { calculateLoading } = useSelector((state) => state.btc);
  const [btcDeliveryPrice, setBtcDeliveryPrice] = useState(0);
  let logist2Last = logist2
    ? logist2Split[logist2Split.length - 1]
    : btcDeliveryPrice;
    console.log(btcRegions);
  // const { removeCart } = useSelector((state) => state.cart);
  // console.log(removeCart);
  // useEffect(() => {
  //   if (removeCart === true) {
  //     console.log("asd");
  //   }
  // }, [removeCart]);
  const total = total_amount + (logist2Last ? Number(logist2Last) : 0);

  return (
    <>
      {/* <Map
        onClickMapsValue={(mapsValue) => {
          setMapLocation(mapsValue);
          console.log(mapsValue);
        }}
        onClickCoordinateValue={(coordinateValue) => {
          setCoordinate(coordinateValue);
          console.log(coordinateValue);
        }}
      /> */}
      <MContainer>
        <div className="pages-link">
          <Link to="/">Главная страница / </Link>
          <Link to="">Корзина</Link>
        </div>
      </MContainer>
      <MContainer className="md:py-8 py-4">
        <Title name="Корзина" />
        <div className="grid grid-cols-10 gap-4 pb-6">
          <div className="col-span-7">
            {cartList?.length > 0 ? (
              cartList?.map((cart, index) => (
                <div
                  key={index}
                  onChange={(e) => {
                    setShopId(cart?.id);
                    setSelectedShopId("");
                    toast.info(`Выбрано ${e.target.value} товар`);
                  }}
                >
                  <div className="basket__title flex items-center flex-wrap cursor-pointer mb-2">
                    Продавец:{" "}
                    <span
                      className="pl-2"
                      onClick={() => navigate(`/selleradres/${cart?.id}`)}
                    >
                      {cart?.name}
                    </span>
                    <Button
                      variant={
                        selectedShopId?.id === cart?.id
                          ? "contained"
                          : "outlined"
                      }
                      color="primary"
                      className="!normal-case !ml-auto"
                      onClick={() => {
                        setShopId(cart?.id);
                        setProductId("");
                        toast.info(`Выбрано все товары магазина`);
                        // dispatch(getShopAddress(cart?.id));
                      }}
                    >
                      {selectedShopId?.id === cart?.id ? "Выбрано" : "Выбрать"}
                    </Button>
                  </div>
                  {cart?.cart?.map((cart, idx) => (
                    <div key={idx} className="basket__item">
                      <VscTrash
                        className="korzina-trash"
                        fill="#EE4927"
                        size={28}
                        onClick={() => {
                          dispatch(
                            postCartRemove({ product_id: cart?.product?.id })
                          );
                        }}
                      />
                      <div className="basket__left">
                        <input
                          id="check__input"
                          type="checkbox"
                          name="basket-cart"
                          checked={
                            cart?.product?.id === +product_id?.product?.id
                              ? true
                              : false
                          }
                          onChange={() => {
                            setProductId(cart);
                          }}
                          value={cart?.amount}
                        />
                        <Link
                          to={`/add/${cart?.product?.id}`}
                          className="basket__image relative"
                        >
                          <img src={`${URL}${cart?.product?.photo}`} alt="" />
                          {cart?.product?.discount ? (
                            <div className="basket-discount absolute bottom-0 right-0">
                              {cart?.product?.discount}%
                            </div>
                          ) : null}
                        </Link>
                        <div className="basket__box">
                          <div className="grid-item">
                            <h4 className="mb-4">{cart?.product?.name}</h4>
                            <h5 className="mb-4">
                              <span className="flex flex-wrap">
                                {cart?.product?.color?.name}{" "}
                                {cart?.productFilter?.map((item) => (
                                  <div
                                    style={{
                                      height: "max-content",
                                      width: "max-content",
                                      color: "#fff",
                                      fontSize: "14px",
                                      padding: "1px",
                                      marginLeft: "2px",
                                      background: "#131e3d",
                                    }}
                                  >
                                    {item?.value_ru}
                                  </div>
                                ))}
                              </span>
                            </h5>
                            <div className="basket__price">
                              {cart?.product?.price_old ? (
                                <span className="basket-price_old">
                                  {cart?.product?.price_old?.toLocaleString(
                                    "ru-RU"
                                  )}{" "}
                                  {/* {cart.product?.currency?.name} */}
                                  {currency === "sum" ? "сум" : "у.е"}
                                </span>
                              ) : null}
                              <h3>
                                {cart?.product?.price?.toLocaleString("ru-RU")}{" "}
                                {/* {cart.product?.currency?.name} */}
                                {currency === "sum" ? "сум" : "у.е"}
                              </h3>
                            </div>
                          </div>
                          <div className="grid-item">
                            {cart?.product?.delivery && (
                              <div className="bank">
                                В Узбекистан через {cart?.product?.delivery}
                              </div>
                            )}
                          </div>
                          <div className="grid-item self-end">
                            <div className="basket__count">
                              <Counter
                                product_id={cart?.product?.id}
                                count_product={
                                  cart?.amount + " " + cart?.product?.unit?.name
                                }
                                onClickIncrement={(product_id) => {
                                  dispatch(postCartMinus({ product_id }));
                                  setProductId("");
                                }}
                                onClickDecrement={(product_id_count) => {
                                  onClickDecrementFunc(product_id_count);
                                  setProductId("");
                                }}
                              />
                              <h5>
                                Осталось {cart?.amount_left}{" "}
                                {cart?.product?.unit?.name}
                              </h5>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))
            ) : (
              <div className="text-center relative">
                <Button
                  onClick={() => navigate("/filter/0")}
                  className="!absolute !top-0 !left-0"
                  variant="outlined"
                  color="primary"
                >
                  Добавить товар
                </Button>
                <img
                  style={{ maxWidth: "250px", margin: "0 auto" }}
                  src={noBasketPhoto}
                  alt=""
                />
                Ваша корзина пуста
              </div>
            )}
            {cartList?.length > 0 && (
              <div className="flex justify-end mt-8">
                <Button
                  onClick={() => {
                    dispatch(postCartClear());
                  }}
                  variant="outlined"
                >
                  Очистить корзину
                </Button>
              </div>
            )}
            <div className="my-2 text-lg text-center">
              Вы можете заказать только товары 1 магазина
            </div>
            <div className="basket__delivery mt-8">
              <div className="basket-50 mt-4">
                <h5>Способ получения товара</h5>
                <div className="inputss mt-4">
                  {deliveries?.map((del, idx) => (
                    <div onChange={() => setDeliveryId(del.id)} key={idx}>
                      <input
                        id={`samo${idx}`}
                        className="mr-2"
                        type="radio"
                        name="delivery"
                        value={del.id}
                      />
                      <label htmlFor={`samo${idx}`}>{del.name}</label>
                    </div>
                  ))}
                </div>
              </div>
              <div className={`basket-50 mt-4`}>
                {delivery_id === 1 && (
                  <>
                    <h5>Адрес доставки</h5>
                    <div className="choosed__adress mt-4">
                      {`Узбекистан, ${
                        region_name?.name ? region_name?.name + "," : ""
                      } ${address ? address + "," : ""} ` || "Не выбрано"}
                    </div>
                    {addressMap && (
                      <div className="mt-2">
                        Адрес через карты: {addressMap} (
                        {coordinate?.lat + "," + coordinate?.lng})
                      </div>
                    )}
                    {/* <button className="choose__adress mt-4">
                    Выбрать адрес доставки
                  </button> */}
                  </>
                )}

                {delivery_id === 2 &&
                  (fakeSelectedShopId ? (
                    <>
                      <h5>Пункт выдачи</h5>
                      <div className="mt-4">
                        {fakeSelectedShopId?.region_full?.length > 0
                          ? fakeSelectedShopId?.region_full
                          : "Нет региона"}
                      </div>
                      {/* <FormControl fullWidth className="!mt-4">
                        <InputLabel id="demo-simple-select-label">
                          Выберите пункт выдачи
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={shop_address_id}
                          label="ShopId"
                          size="small"
                          onChange={handleChangeShopId}
                        >
                          {shopAddresses?.map((item, idx) => (
                            <MenuItem key={idx} value={item?.id}>
                              {item?.address}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl> */}
                    </>
                  ) : (
                    <div>Сначало выберите магазин</div>
                  ))}
              </div>
            </div>
            {delivery_id === 1 && (
              <>
                {delivery_id === 1 && (
                  <div className="md:flex items-center justify-between basket__delivery mt-8">
                    <h5
                      className="flex items-center cursor-pointer"
                      onClick={handleOpen2}
                    >
                      Выберите логистическую компанию
                      <BsChevronDown className="ml-2" size={22} />
                    </h5>
                    <div>
                      {logist2 !== null && logist2 !== undefined
                        ? "В Узбекистан через " + logist2
                        : "Не выбрано"}
                    </div>
                  </div>
                )}
              </>
            )}
            {delivery_id === 3 && (
              <div className="md:flex items-center justify-between basket__delivery mt-8">
                <h5
                  className="flex items-center cursor-pointer"
                  onClick={handleOpenBtc}
                >
                  Выберите филиал БТС
                  <BsChevronDown className="ml-2" size={22} />
                </h5>
              </div>
            )}
            <div>
              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open2}
                onClose={handleClose2}
                closeAfterTransition
                center
              >
                <Fade in={open2}>
                  <Box style={style2} className="!bg-white">
                    <Typography
                      id="transition-modal-description"
                      sx={{ mt: 2 }}
                    >
                      <div className="flex bg-white flex-col justify-between h-full AddPageDelivery">
                        <div className="delivery__box">
                          <div className="flex justify-end delivery__cancel"></div>
                          <div className="delivery__title flex items-center justify-between">
                            <h5>Укажите регион</h5>
                          </div>
                          <Tabs>
                            <div className="!grid !grid-cols-2 delivery__select items-center gap-4 my-4">
                              <div className="!w-full self-end">
                                <TextField
                                  disabled
                                  className="select justify-center"
                                  size="small"
                                  value={"Узбекистан"}
                                />
                              </div>
                              <div className="!w-full">
                                <span className="mt-2">Выберите город</span>
                                <select
                                  className="select mt-1"
                                  name=""
                                  id=""
                                  onChange={(e) => {
                                    let newFilter = {
                                      ...filter,
                                      region_id: e.target.value,
                                    };
                                    setSelectedLogistCity(e.target.value);
                                    setFilter(newFilter);
                                    // dispatch(getRegionsSub(e.target.value));
                                    dispatch(getRegionsSub(e.target.value));
                                    dispatch(getLogistSort(newFilter));
                                  }}
                                >
                                  <option value="">Выберите</option>
                                  {regions?.map((region) => (
                                    <option
                                      selected={
                                        selectedLogistCity === region.id
                                      }
                                      value={region.id}
                                      key={region.id}
                                    >
                                      {region.name}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <div className="!w-full">
                                <span className="mt-2">Выберите район</span>
                                <select
                                  onChange={(e) => {
                                    let newFilter = {
                                      ...filter,
                                      unit_id: 38,
                                      region_id: e.target.value,
                                    };

                                    setFilter(newFilter);
                                    dispatch(getLogistSort(newFilter));
                                  }}
                                  className="select mt-1"
                                  name=""
                                  id=""
                                >
                                  <option value="">Выберите</option>
                                  {regions_sub?.map((item) => (
                                    <option
                                      selected={filter.region_id === item.id}
                                      value={item.id}
                                      key={item.id}
                                    >
                                      {item.name}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <div className="!w-full">
                                <span className="mt-2">Напишите адрес</span>
                                <TextField
                                  id="outlined-basic"
                                  label="Напишите адрес"
                                  className="inputProps select w-full"
                                  variant="outlined"
                                  onChange={(e) => setAddress(e.target.value)}
                                />
                              </div>
                            </div>
                            <TabPanel className="mt-4">
                              {sortLists?.map((logist, idx) => (
                                <label
                                  key={idx}
                                  onChange={(e) => {
                                    setLogist(e.target.value);
                                    setLogistId(logist.id);
                                  }}
                                  className="flex items-center mb-3 punkt"
                                >
                                  <input
                                    className="mr-4"
                                    value={
                                      logist.name +
                                      " " +
                                      logist.logistRegions?.tariffs?.price
                                    }
                                    name="company"
                                    type="radio"
                                  />
                                  {logist.name} -{" "}
                                  {logist.logistRegions?.tariffs?.price +
                                    " сум"}{" "}
                                  ({logist.logistRegions?.tariffs?.unit})
                                </label>
                              ))}
                            </TabPanel>
                          </Tabs>
                        </div>
                        <div className="delivery__bottom">
                          <button
                            onClick={handleOpen}
                            className="delivery__pick mb-2 w-full"
                          >
                            Выбрать на карте
                          </button>
                          <div className="flex justify-between">
                            <button
                              onClick={() => {
                                setDelivery2(delivery);
                                setOpen2(false);
                                setLogist2(logist);
                                setLogistId2(logistId);
                              }}
                              className="save"
                              type="submit"
                            >
                              Сохранить
                            </button>
                            <button
                              onClick={() => {
                                setOpen2(false);
                                setDelivery2();
                                setLogist2();
                                setLogistId2();
                              }}
                              className="cancel"
                            >
                              Отменить
                            </button>
                          </div>
                        </div>
                      </div>
                    </Typography>
                  </Box>
                </Fade>
              </Modal>
            </div>
            <div>
              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openBtc}
                onClose={handleCloseBtc}
                closeAfterTransition
                center
              >
                <Fade in={openBtc}>
                  <Box style={style2}>
                    <Typography
                      id="transition-modal-description"
                      sx={{ mt: 2 }}
                    >
                      <div className="flex bg-white flex-col justify-between h-full AddPageDelivery">
                        <div className="delivery__box">
                          <div className="flex justify-end delivery__cancel"></div>
                          <div className="delivery__title flex items-center justify-between">
                            <h5>Выберите филиал БТС</h5>
                          </div>
                          <Tabs>
                            <div className="!grid !grid-cols-2 delivery__select items-center gap-4 my-4">
                              <div className="!w-full self-end">
                                <TextField
                                  disabled
                                  className="select justify-center"
                                  size="small"
                                  value={"Узбекистан"}
                                />
                              </div>
                              <div className="!w-full">
                                <span className="mt-2">Выберите город</span>
                                <select
                                  className="select mt-1"
                                  onChange={(e) => {
                                    dispatch(getBTCCities(e.target.value));
                                  }}
                                >
                                  <option value="">Выберите</option>
                                  {btcRegions?.map((region) => (
                                    <option value={region.id} key={region.id}>
                                      {region.name}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <div className="!w-full">
                                <span className="mt-2">Выберите район</span>
                                <select
                                  onChange={(e) => setBtcCity(e.target.value)}
                                  className="select mt-1"
                                >
                                  <option value="">Выберите</option>
                                  {btcCities?.map((city) => (
                                    <option
                                      selected={city.id === +btcCity}
                                      value={city.id}
                                      key={city.id}
                                    >
                                      {city.name}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <div className="!w-full">
                                <span className="mt-2">
                                  Выберите способ доставки
                                </span>
                                <select
                                  onChange={(e) =>
                                    setBtcReceiverId(e.target.value)
                                  }
                                  className="select mt-1"
                                >
                                  <option value="">Выберите</option>
                                  {receiverDeliveryList?.map((item) => (
                                    <option
                                      selected={item.id === +btcReceiverId}
                                      value={item.id}
                                      key={item.id}
                                    >
                                      {item.name}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              {btcCity && btcReceiverId && (
                                <div className="!w-full flex flex-col justify-end h-full">
                                  <Button
                                    // onClick={() => {
                                    //   if (sendButtonState === true) {
                                    //     toast.error(
                                    //       "Вы можете заказать только товары 1 магазина"
                                    //     );
                                    //   } else {
                                    //     dispatch(
                                    //       postCalculateBtc({
                                    //         senderDate: today,
                                    //         senderCityId: btcCity,
                                    //         receiverCityId: btcCity,
                                    //         senderDelivery: 2,
                                    //         receiverDelivery: 2,
                                    //         volume: btcVolume,
                                    //         weight: btcWeight,
                                    //       })
                                    //     );
                                    //   }
                                    // }}
                                    onClick={() => {
                                      if (!shop_id) {
                                        toast.error("Сначала выберите магазин");
                                      } else {
                                        dispatch(
                                          postCalculateBtc({
                                            senderDate: today,
                                            senderCityId:
                                              fakeSelectedShopId?.region
                                                ?.bts_city_id,
                                            receiverCityId: btcCity,
                                            senderDelivery: 2,
                                            receiverDelivery: btcReceiverId,
                                            volume: btcVolume,
                                            weight: btcWeight,
                                          })
                                        );
                                      }
                                    }}
                                    size="large"
                                    variant="outlined"
                                    color="primary"
                                    className="!normal-case !text-lg"
                                  >
                                    Рассчитать стоимость
                                  </Button>
                                </div>
                              )}
                              {calculateLoading ? (
                                <div className="text-center">Loading...</div>
                              ) : (
                                <div className="btc-price text-center flex items-center justify-center">
                                  {calculateBtc &&
                                    btcCity &&
                                    btcReceiverId &&
                                    "Доставка:"}
                                  <div className="font-bold ml-1">
                                    {calculateBtc && btcCity && btcReceiverId
                                      ? `${calculateBtc?.toLocaleString(
                                          "ru-RU"
                                        )} сум`
                                      : "Выберите регион, чтобы узнать стоимость доставки"}
                                  </div>
                                </div>
                              )}
                            </div>
                          </Tabs>
                        </div>
                        <div className="delivery__bottom">
                          <div className="flex justify-between">
                            <button
                              onClick={() => {
                                setBtcDeliveryPrice(calculateBtc);
                                handleCloseBtc();
                              }}
                              className="save"
                              type="submit"
                            >
                              Сохранить
                            </button>
                            <button
                              onClick={() => {
                                setBtcDeliveryPrice();
                                setBtcReceiverId();
                                setBtcCity();
                                handleCloseBtc();
                              }}
                              className="cancel"
                            >
                              Отменить
                            </button>
                          </div>
                        </div>
                      </div>
                    </Typography>
                  </Box>
                </Fade>
              </Modal>
            </div>
            {open && (
              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                center
              >
                <Box style={style2}>
                  <div className="p-8">
                    <MapPayment
                      onClickMapsValue={(mapsValue) => {
                        setAddressMap(mapsValue);
                      }}
                      onClickCoordinateValue={(coordinateValue) => {
                        setCoordinate(coordinateValue);
                      }}
                      clickCoordinate={(coordinate) => {
                        setCoordinate(coordinate);
                      }}
                      // google={google}
                      // center={{ lat: 39.6405719, lng: 66.8030781 }}
                      // height="300px"
                      // zoom={15}
                    />
                  </div>
                </Box>
              </Modal>
            )}
            <div className="grid grid-cols-2 a111 gap-4">
              <div className="payment__item">
                <div className="payment__box">
                  <h5>Способ оплаты</h5>
                  <p>Для оформления заказа , выбрат адрес доставки</p>
                  <div className="inputss">
                    {payments?.map((payment, idx) => (
                      <div onChange={() => setPaymentId(payment.id)} key={idx}>
                        <input
                          id={`input${idx}`}
                          className="mr-2"
                          type="radio"
                          name="payments"
                        />
                        <label htmlFor={`input${idx}`}>{payment.name}</label>
                      </div>
                    ))}
                  </div>
                  {payment_id === 37 && (
                    <>
                      <Swiper
                        modules={[
                          Navigation,
                          Pagination,
                          Scrollbar,
                          A11y,
                          Lazy,
                        ]}
                        spaceBetween={10}
                        slidesPerView={1}
                        navigation
                        pagination={{ clickable: true }}
                        lazy={true}
                      >
                        {carts?.map((cart, index) => (
                          <SwiperSlide
                            className={`swiper-slide bg-white shadow-2xl`}
                            key={index}
                          >
                            <CreditCard
                              onClickCartId={(id) => {
                                setCardId(id);
                              }}
                              payment_id={payment_id}
                              cart={cart}
                            />
                          </SwiperSlide>
                        ))}
                        {/* <div>
                          {card_id &&
                            "card number: " + selectedCard.card_number}
                        </div>
                        <div>
                          {card_id &&
                            "card phone number: " +
                              selectedCard.card_phone_number}
                        </div> */}
                      </Swiper>
                      <Button className="!mt-4" variant="outlined">
                        <Link to="/info">Добавить карту</Link>
                      </Button>
                    </>
                  )}
                  {/* {payment_id === 37 && (
                    <img
                      src="https://docs.click.uz/wp-content/themes/click_help/assets/images/logo.png"
                      alt=""
                    />
                  )} */}
                </div>
              </div>
              <div className={` login__box`}>
                <div className="login__title">
                  <h4>Получатель</h4>
                  {/* <button>Войти</button> */}
                  {user.phone ? null : <Link to="/firstregister">Войти</Link>}
                </div>
                <div className="message mt-4">
                  <label htmlFor="input6">Получать буду не я</label>
                  <input
                    onClick={() => setOpenBox((value) => !value)}
                    id="input6"
                    type="checkbox"
                    onChange={(e) => setReceiver(e.target.checked ? 1 : 0)}
                  />
                </div>
                <div className={`${openBox ? "!hidden" : "!block"}`}>
                  <div className="flex justify-between mt-4">
                    <div className="login__item mr-2">
                      <h5>Имя</h5>
                      <input
                        type="text"
                        value={user.name}
                        placeholder="Ваше имя"
                        // onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="login__item ml-2">
                      <h5>Фамилия</h5>
                      <input
                        type="text"
                        placeholder="Ваш фамилия"
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="login__item w-full mt-4 mr-2">
                      <h5>Контактный телефон</h5>
                      <input
                        type="text"
                        pattern="[0-9]"
                        value={user.phone}
                        placeholder="Телефон"
                        // onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                    {/* <div className="login__item mt-4 ml-2">
                      <h5>Адрес</h5>
                      <input
                        type="text"
                        placeholder="Ваш адрес"
                        onChange={(e) => setAddress(e.target.value)}
                        value={user?.last_address}
                      />
                    </div> */}
                  </div>
                  <div className="login__item mt-4">
                    <h5>Электронная почта</h5>
                    <input
                      type="email"
                      value={user.email}
                      placeholder="info@mail.ru"
                      // onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="login__agree mt-4">
                    <input defaultChecked id="input5" type="checkbox" />
                    <label htmlFor="input5">
                      Получать эксклюзивные скидки вSMS‑рассылке от Birmakon
                    </label>
                  </div>
                </div>
                <div className={`${openBox ? "!block" : "!hidden"}`}>
                  <div className="flex justify-between mt-4">
                    <div className="login__item mr-2">
                      <h5>Имя</h5>
                      <input
                        type="text"
                        placeholder={"Ваше имя"}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="login__item ml-2">
                      <h5>Фамилия</h5>
                      <input
                        type="text"
                        placeholder="Ваш фамилия"
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="login__item mt-4 mr-2">
                      <h5>Контактный телефон</h5>
                      <input
                        type="number"
                        placeholder={"Телефон"}
                        pattern="[0-9]"
                      />
                    </div>
                    {/* <div className="login__item mt-4 ml-2">
                      <h5>Адрес</h5>
                      <input
                        type="text"
                        placeholder="Ваш адрес"
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div> */}
                  </div>
                  <div className="login__item mt-4">
                    <h5>Электронная почта</h5>
                    <input
                      type="email"
                      placeholder="Емаил"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="login__agree mt-4">
                    <input defaultChecked id="input5" type="checkbox" />
                    <label htmlFor="input5">
                      Получать эксклюзивные скидки вSMS‑рассылке от Birmakon
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-3">
            <div className="total__box">
              <div className="flex justify-between mt-4">
                <h5 className="total__title">Итого</h5>
                <h3 className="total__price">
                  {total?.toLocaleString("ru-RU")} сум
                </h3>
              </div>
              <div className="flex justify-between mt-4">
                <h5 className="total__left">Товары ({cart_amount})</h5>
                <p className="total__right">
                  {total_amount?.toLocaleString("ru-RU")} сум
                </p>
              </div>
              <div className="flex justify-between flex-wrap mt-2">
                <h5 className="total__delivery">Стоимость доставки:</h5>
                <button className="total__pick">
                  {logist2Last && logist2Last?.toLocaleString("ru-RU") + "сум"}
                </button>
              </div>
              <div className="my-5">
                {product_id && (
                  <button
                    onClick={() => {
                      if (logistId2) {
                        sendOrder({
                          // address: user?.last_address || address,
                          address: address,
                          map_location: `Узбекистан, ${
                            addressMap ? addressMap : ""
                          } ${address ? address + "," : ""} ${
                            region_name?.name ? region_name?.name + "," : ""
                          } ${coordinate?.lat ? coordinate?.lat + "," : ""} ${
                            coordinate?.lng ? coordinate?.lng + "," : ""
                          }`,
                          name,
                          lastName,
                          email,
                          phone,
                          receiver,
                          logist_id: logistId2,
                          delivery_id,
                          payment_id,
                          shop_id: shop_id,
                          product_id: product_id?.product?.id,
                        });
                      }
                      if (!logistId2) {
                        sendOrder({
                          // address: user?.last_address || address,
                          address: address,
                          map_location: `Узбекистан, ${
                            address ? address + "," : ""
                          } ${
                            region_name?.name ? region_name?.name + "," : ""
                          } ${coordinate?.lat ? coordinate?.lat + "," : ""} ${
                            coordinate?.lng ? coordinate?.lng + "," : ""
                          }`,
                          name,
                          lastName,
                          email,
                          phone,
                          receiver,
                          delivery_id,
                          payment_id,
                          // shop_address_id,
                          shop_id: shop_id,
                          product_id: product_id?.product?.id,
                        });
                      }
                      dispatch(getCart());
                    }}
                    className="total__button"
                  >
                    Заказать
                  </button>
                )}
                {selectedShopId && (
                  <button
                    onClick={() => {
                      if (logistId2) {
                        sendOrder({
                          // address: user?.last_address || address,
                          address: address,
                          map_location: `Узбекистан, ${
                            addressMap ? addressMap : ""
                          } ${address ? address + "," : ""} ${
                            region_name?.name ? region_name?.name + "," : ""
                          } ${coordinate?.lat ? coordinate?.lat + "," : ""} ${
                            coordinate?.lng ? coordinate?.lng + "," : ""
                          }`,
                          name,
                          lastName,
                          email,
                          phone,
                          receiver,
                          logist_id: logistId2,
                          delivery_id,
                          payment_id,
                          shop_id: shop_id,
                        });
                      }
                      if (!logistId2) {
                        sendOrder({
                          // address: user?.last_address || address,
                          address: address,
                          map_location: `Узбекистан, ${
                            address ? address + "," : ""
                          } ${
                            region_name?.name ? region_name?.name + "," : ""
                          } ${coordinate?.lat ? coordinate?.lat + "," : ""} ${
                            coordinate?.lng ? coordinate?.lng + "," : ""
                          }`,
                          name,
                          lastName,
                          email,
                          phone,
                          receiver,
                          delivery_id,
                          payment_id,
                          // shop_address_id,
                          shop_id: shop_id,
                        });
                      }
                      dispatch(getCart());
                    }}
                    className="total__button"
                  >
                    Заказать
                  </button>
                )}
                {!shop_id && (
                  <button
                    className="total__button"
                    onClick={() => toast.error("Выберите товар или магазин")}
                  >
                    Заказать
                  </button>
                )}
              </div>
              <div className="total__agree">
                <label className="basket__spec flex items-center">
                  <input defaultChecked className="mr-2" type="checkbox" />
                  <Link style={{ whiteSpace: "pre-wrap" }} to="">
                    Правил пользования торговой площадкой и правилами возврата
                  </Link>
                </label>
              </div>
            </div>
          </div>
        </div>
      </MContainer>
    </>
  );
};

export default Basket;
