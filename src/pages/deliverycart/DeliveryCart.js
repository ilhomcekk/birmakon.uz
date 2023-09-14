import React, { useState } from "react";
import { MContainer } from "../../element/Elemens";
import { AiOutlineComment, AiOutlineCreditCard } from "react-icons/ai";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { AiOutlineCar } from "react-icons/ai";
import { FiEdit, FiEdit3 } from "react-icons/fi";
import OrderCart from "../../component/Cart/OrderCart";
import "../../assets/scss/_deliverycart.scss";
import SecondNavbar from "../../component/layout/SecondNavbar";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { refundList } from "../../redux/actions/orderActions";
import { MdCancelScheduleSend } from "react-icons/md";
import Button from "@mui/material/Button";
import PreLoader from "../../component/PreLoader/PreLoader";
import {
  chatCreate,
  createChatAdmin,
  getMe,
} from "../../redux/actions/userActions";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import {
  postRefund,
  endOrderStatus,
  waitOplataStatus,
  waitSendStatus,
  orderSendStatus,
  waitReviewStatus,
} from "../../redux/actions/orderActions";
import { createComment, getCart } from "../../redux/actions/cartActions";
import { Link, useNavigate } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
const URL = `${process.env.REACT_APP_API_DOMAIN}`;
const language = window.localStorage.getItem("Content-language");

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #e6e6e6",
  background: "#fff",
  boxShadow: 24,
  p: 4,
};

const style2 = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  bgcolor: "background.paper",
  border: "2px solid #e6e6e6",
  background: "#fff",
  boxShadow: 24,
  p: 4,
};

const DeliveryCart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [filter, setFilter] = useState(6);
  const [active, setActive] = useState("");
  const [returnProduct, setReturnProduct] = useState(false);

  const [product_id, setProductId] = useState();
  const [productIdByComment, setProductIdByComment] = useState();
  const [message, setMessage] = useState();
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const handleOpen = (e) => {
    setOpen(true);
    setProductId(e);
  };
  const handleOpen2 = (order) => {
    setOpen2(true);
    setProductId(order);
  };
  const handleOpen3 = (e) => {
    setOpen3(true);
    setProductIdByComment(e);
  };

  const handleClose = () => setOpen(false);
  const handleClose2 = () => setOpen2(false);
  const handleClose3 = () => setOpen3(false);

  useEffect(() => {
    dispatch(refundList());
    dispatch(waitSendStatus());
    dispatch(orderSendStatus());
    dispatch(waitReviewStatus());
    dispatch(endOrderStatus());
    dispatch(waitOplataStatus());
    dispatch(getMe());
    dispatch(getCart());
  }, []);

  const [rate, setRate] = useState("");
  const [review, setReview] = useState("");
  const ratingChanged = (newRating) => {
    setRate(newRating);
  };

  const { loading } = useSelector((state) => state.order);
  const profile = useSelector((state) => state.user.user);

  const refunds = useSelector((state) => state.order.refundList);
  const { reduxToken } = useSelector((state) => state.user);
  // orders by status
  const waitOplataStatusList = useSelector(
    (state) => state.order.waitOplataStatus
  );
  const waitSendStatusList = useSelector((state) => state.order.waitSendStatus);
  const orderSendStatusList = useSelector(
    (state) => state.order.orderSendStatus
  );
  const waitReviewStatusList = useSelector(
    (state) => state.order.waitReviewStatus
  );
  const endOrderStatusList = useSelector(
    (state) => state.order.waitOplataStatus
  );
  const orderList = useSelector((state) => state.order.list);

  return (
    <>
      {reduxToken ? (
        <>
          <SecondNavbar />
          <div className="back" style={{ minHeight: "70vh" }}>
            <MContainer className="md:py-16 py-8 delivery-carts">
              <div className="delivery-cart__title">
                Мои заказы{" "}
                <span
                  className={`${
                    filter === 5 ? "text-red-600" : "!text-black"
                  } cursor-pointer`}
                  onClick={() => {
                    setFilter(5);
                    dispatch(endOrderStatus());
                    setReturnProduct(false);
                  }}
                >
                  Завершенные заказы
                </span>
              </div>
              <ul className="cart__list py-4 mt-4">
                <li
                  className={`${filter === 6 && "text-red-600"}`}
                  onClick={() => {
                    setFilter(6);
                    dispatch(waitOplataStatus());
                    setReturnProduct(false);
                  }}
                >
                  <div className="svg">
                    <AiOutlineCreditCard
                      fill={`${filter === 6 && "#ee4927"}`}
                      size={34}
                    />
                    <span>{waitOplataStatusList?.length}</span>
                  </div>
                  Ожидается оплата
                </li>
                <li
                  className={`${filter === 3 && "text-red-600"}`}
                  onClick={() => {
                    setFilter(3);
                    dispatch(waitSendStatus());
                    setReturnProduct(false);
                  }}
                >
                  <div className="svg">
                    <HiOutlineShoppingBag
                      fill={`${filter === 3 ? "#ee4927" : "#fff"}`}
                      size={30}
                    />
                    <span>{waitSendStatusList?.length}</span>
                  </div>
                  Ожидается отправка
                </li>
                <li
                  className={`${filter === 4 && "text-red-600"}`}
                  onClick={() => {
                    setFilter(4);
                    dispatch(orderSendStatus());
                    setReturnProduct(false);
                  }}
                >
                  <div className="svg">
                    <AiOutlineCar
                      fill={`${filter?.status === 4 && "#ee4927"}`}
                      size={30}
                    />
                    <span>{orderSendStatusList?.length}</span>
                  </div>
                  Заказ отправлен
                </li>
                <li
                  className={`${filter === 9 && "text-red-600"}`}
                  onClick={() => {
                    setFilter(9);
                    setReturnProduct(false);
                    dispatch(waitReviewStatus());
                  }}
                >
                  <div className="svg">
                    <FiEdit
                      fill={`${filter?.status === 9 ? "#ee4927" : "#fff"}`}
                      size={30}
                    />
                    <span>{waitReviewStatusList?.length}</span>
                  </div>
                  Ожидается отзыв
                </li>
                <li
                  className={`${returnProduct ? "text-red-600" : "#fff"}`}
                  onClick={() => {
                    setReturnProduct(true);
                    setFilter("");
                  }}
                >
                  <div className="svg">
                    <FiEdit3
                      fill={`${returnProduct ? "#ee4927" : "#fff"}`}
                      size={30}
                    />
                    <span>{refunds?.length}</span>
                  </div>
                  Возвраты
                </li>
              </ul>
              {loading && <PreLoader />}
              <div>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box style={style} className="p-4">
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                    >
                      Message
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      <Box
                        sx={{
                          width: 500,
                          maxWidth: "100%",
                        }}
                      >
                        <TextField
                          onChange={(e) => setMessage(e.target.value)}
                          fullWidth
                          label="Ваше сообшение"
                          id="fullWidth"
                        />
                      </Box>
                      <div className="flex justify-end mt-4">
                        <Button
                          onClick={() =>
                            dispatch(
                              postRefund({
                                order_product_id: product_id,
                                message: message,
                              })
                            )
                          }
                          variant="contained"
                        >
                          Сохранить
                        </Button>
                      </div>
                    </Typography>
                  </Box>
                </Modal>
              </div>
              <div>
                <Modal
                  open={open2}
                  onClose={handleClose2}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box style={style2}>
                    <div
                      style={{ maxHeight: "500px" }}
                      className="modal-cart overflow-y-auto"
                    >
                      {product_id?.map((item, idx) => (
                        <div className="cart-box flex border" key={idx}>
                          <Link to={`/add/${item.product?.id}`}>
                            <img
                              className="modal-img mr-4"
                              src={URL + item.product?.photo}
                              alt=""
                            />
                          </Link>
                          <div>
                            <div className="md:text-2xl">
                              {item.product?.name}
                            </div>
                            <div className="md:text-2xl">
                              {item.product?.price}
                            </div>
                          </div>
                          <Button
                            variant="contained"
                            className="!normal-case !h-max !ml-auto !mt-auto"
                            onClick={(e) => handleOpen3(e.target.value)}
                            value={item.product?.id}
                          >
                            Для этого
                          </Button>
                        </div>
                      ))}
                    </div>
                  </Box>
                </Modal>
              </div>
              <div>
                <Modal
                  open={open3}
                  onClose={handleClose3}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box style={style} className="p-4 customer">
                    <div
                      className="c__box bg !ml-0 !w-full"
                      style={{ background: "rgba(238, 73, 39, 0.3)" }}
                    >
                      <div className="box__title">У вас есть отзыв</div>
                      <ReactStars
                        onChange={ratingChanged}
                        value={0}
                        count={5}
                        size={24}
                      />
                      <textarea
                        onChange={(e) => {
                          setReview(e.target.value);
                        }}
                        placeholder="Ваш отзыв"
                      ></textarea>
                      <button
                        onClick={() => {
                          dispatch(
                            createComment({
                              review: review,
                              rate: rate,
                              product_id: productIdByComment,
                            })
                          );
                          handleClose3();
                          // dispatch(getComments(id));
                        }}
                      >
                        Отправить вопрос
                      </button>
                    </div>
                  </Box>
                </Modal>
              </div>
              {!loading && (
                <div className="order__carts">
                  {returnProduct === false
                    ? orderList?.map((order, index) => (
                        <>
                          <div key={index} className="zakaz my-10">
                            <h1 className="!m-0 !p-0">
                              Заказ №{order.id} Продавец: {order.name}{" "}
                              {order.lastname}
                            </h1>
                            {/* <span>Доставка: {order.delivery?.name}</span> */}
                            {/* <span>{order.phone}</span> */}
                            <span>Адрес: {order.map_location}</span>
                          </div>
                          {/* <div className="flex items-center justify-between"> */}
                          {/* <div className="flex items-center">
                          <h3 className="font-bold text-xl">Тип доставки: </h3>
                          <div className="ml-2">{order.logist?.name}</div>
                        </div> */}
                          {/* <span>Адрес: {order.map_location}</span> */}
                          {/* <span>Дополнительный адрес: {order.address}</span> */}
                          {/* </div> */}
                          <div className="cart delivery__cart" key={order.id}>
                            <div className="cart__img">
                              <div className="image relative">
                                {!order?.orderProducts[0]?.product?.photo ? (
                                  <img
                                    src="https://admin.birmakon.uz//assets_files/images/no-photo.png"
                                    alt="Product"
                                  />
                                ) : (
                                  <img
                                    src={`${URL}${order.orderProducts[0]?.product?.photo}`}
                                    alt="not found"
                                  />
                                )}
                              </div>
                              <div className="cart__info">
                                <div>
                                  <div className="title">
                                    {language === "uz" &&
                                      order.orderProducts[0]?.product?.name_uz}
                                    {language === "ru" &&
                                      order.orderProducts[0]?.product?.name_ru}
                                    {language === "en" &&
                                      order.orderProducts[0]?.product?.name_en}
                                  </div>
                                  {order?.orderProducts[0]?.product?.color && (
                                    <div className="flex items-center">
                                      Цвет:
                                      <p
                                        className={`my-2 ml-1 !text-center text-sm ${
                                          order?.orderProducts[0]?.product
                                            ?.color?.name !== "Белый" &&
                                          "!text-white"
                                        } p-1`}
                                        style={{
                                          background:
                                            order?.orderProducts[0]?.product
                                              ?.color?.color,
                                        }}
                                      >
                                        {
                                          order?.orderProducts[0]?.product
                                            ?.color?.name
                                        }
                                      </p>
                                    </div>
                                  )}
                                  {order?.shop_address?.address && (
                                    <div>
                                      Адрес магазина:{" "}
                                      {order?.shop_address?.address}
                                    </div>
                                  )}
                                  {order?.orderProducts[0]?.product?.brand
                                    ?.name && (
                                    <p>
                                      Бранд:{" "}
                                      {
                                        order?.orderProducts[0]?.product?.brand
                                          ?.name
                                      }
                                    </p>
                                  )}
                                  {/* <div className="mt-2">Размер: </div> */}
                                </div>
                                {/* <p>
                  Продавец: <span>ООО "ПРАЙД"</span>
                </p> */}
                              </div>
                            </div>
                            <div className="order !pt-0">
                              {order.amount ? (
                                <p>
                                  Количество:{" "}
                                  <span>
                                    {order?.amount}{" "}
                                    {
                                      order?.orderProducts[0]?.product?.unit
                                        ?.name
                                    }
                                  </span>
                                </p>
                              ) : null}
                              {order?.logist?.name && (
                                <div>Тип доставки: {order.logist?.name}</div>
                              )}
                              {order?.delivery?.name && (
                                <div>Доставка: {order.delivery?.name}</div>
                              )}
                              <div className="font-bold">
                                Дата заказа: {order.date?.split(" ")[0]}
                              </div>
                            </div>
                            <div className="price">
                              <span id="price">
                                {order?.orderProducts[0]?.product?.price}{" "}
                                {
                                  order?.orderProducts[0]?.product?.currency
                                    ?.name
                                }
                              </span>
                              <span className="text-right">
                                Оплата: {order.payment?.name}
                              </span>
                              {/* {order.status === 5 && ( */}
                              {/* <Button
                            onClick={() => handleOpen(order.id)}
                            className="!w-max !ml-auto"
                          >
                            Сделать возврат
                          </Button> */}
                              {/* )} */}
                            </div>
                          </div>
                          {/* <OrderCart key={index} order={order} /> */}
                          <div className="total flex items-center justify-between">
                            <div>
                              Общая сумма:{" "}
                              <span>
                                {order?.price?.toLocaleString("ru-RU")} сум
                              </span>
                            </div>
                            {/* <div className="!text-2xl">
                          Оплата: {order.payment?.name}
                        </div> */}
                            <span className="!text-lg !text-black">
                              {order.status === 5 && (
                                <Button
                                  startIcon={<AiOutlineComment />}
                                  className="!normal-case md:!text-base !text-sm md:!p-auto !px-2"
                                  variant="contained"
                                  onClick={() =>
                                    handleOpen2(order.orderProducts)
                                  }
                                  value={order.id}
                                >
                                  Оставить отзыв
                                </Button>
                              )}
                              {/* {order.date} */}
                              {order.status === 0 && (
                                <Button
                                  onClick={() => {
                                    dispatch(
                                      chatCreate({
                                        getter_id: 1,
                                        name: profile?.name,
                                        email: profile?.email,
                                        message: `Я хочу отменить заказ №${order.id}`,
                                        type_user: "admin",
                                      })
                                    );
                                    navigate("/message/admin");
                                  }}
                                  className="!ml-2 !w-max !ml-auto !normal-case"
                                  variant="contained"
                                  startIcon={<MdCancelScheduleSend />}
                                >
                                  Отменить заказ
                                </Button>
                              )}
                            </span>
                          </div>
                        </>
                      ))
                    : refunds?.map((item) => (
                        <div className="cart delivery__cart" key={item.id}>
                          <div className="cart__img">
                            <div className="image relative">
                              <img
                                src={URL + item?.product?.photo}
                                alt="Product"
                              />
                            </div>
                            <div className="cart__info">
                              <div>
                                <p className="my-2">{item?.product?.name}</p>
                                <p className="my-2">Причина: {item?.message}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                </div>
              )}
            </MContainer>
          </div>
        </>
      ) : (
        <div
          className="flex items-center justify-center"
          style={{ height: "500px" }}
        >
          Зарегистрируйте
        </div>
      )}
    </>
  );
};

export default DeliveryCart;
