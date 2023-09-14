import React, { useEffect, useState } from "react";
import { MContainer } from "../../element/Elemens";
import "../../assets/scss/_info.scss";
import infoImage from "../../assets/images/unsplash_OhKElOkQ3RE (1).png";
import { AiOutlinePlus } from "react-icons/ai";
import SecondNavbar from "../../component/layout/SecondNavbar";
import { CartModal } from "../../component/Modal/CartModal";
import { IoIosClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import {
  createCard,
  createCartTranszacton,
  getCards,
  getNewNotification,
  getNotification,
  removeCart,
  verifyCart,
} from "../../redux/actions/userActions";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Lazy,
  History,
  Autoplay,
  Virtual,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/lazy";
import CreditCard from "./CreditCard";
import { Button, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
const API = "https://admin.birmakon.uz/";

export const Info = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cardOpen, setCardOpen] = useState(false);
  useEffect(() => {
    dispatch(getNewNotification());
    dispatch(getCards());
  }, []);
  const userData = useSelector((state) => state.user.user);
  const messages = useSelector((state) => state.user.newNotificationList);
  const carts = useSelector((state) => state.user.cartList);
  const [showModal, setShowModal] = useState(false);
  const { reduxToken } = useSelector((state) => state.user);
  const user = useSelector((state) => state.user.user);
  // useEffect(() => {
  //   if (!reduxToken) {
  //     navigate("/");
  //   }
  // }, [reduxToken]);

  return (
    <>
      {reduxToken ? (
        <>
          <SecondNavbar />
          <div className="back" style={{ minHeight: "70vh" }}>
            <MContainer className="md:py-16 py-8">
              <div className="info__boxes">
                <div className="box">
                  <div className="user">
                    <img
                      className="!object-cover"
                      src={`${API}${userData?.photo}`}
                      alt=""
                    />
                    <div className="user__name">{userData?.name}</div>
                  </div>
                  <div className="email">
                    Э-маил: <span>{userData?.email}</span>
                  </div>
                  <div className="b__user">
                    <div className="phone">
                      Телефон: <span>{userData?.phone}</span>
                    </div>
                  </div>
                </div>
                <div className="box">
                  <div className="delivery">
                    <div className="delivery__title flex justify-between flex-wrap">
                      Банковские карты
                      {carts?.length > 0 && (
                        <Button
                          style={{
                            color: "#ee4927",
                            fontSize: "12px",
                            border: "1px solid #ee4927",
                            marginTop: "0.5rem",
                            marginLeft: "auto",
                          }}
                          onClick={() => setCardOpen(true)}
                        >
                          просматривать карты
                        </Button>
                      )}
                    </div>
                  </div>
                  {cardOpen && (
                    <div
                      className="fixed top-0 right-0 bottom-0 left-0"
                      style={{ background: "rgba(0,0,0,0.5)", zIndex: "99999" }}
                    >
                      <div
                        className="absolute"
                        style={{
                          width: "50%",
                          height: "50%",
                          left: "auto",
                          right: "auto",
                          zIndex: "422334",
                          transform: "translate(50%,50%)",
                        }}
                      >
                        <IconButton
                          onClick={() => setCardOpen(false)}
                          className="z-10 !absolute !top-0 !right-0"
                        >
                          <IoIosClose size={32} />
                        </IconButton>
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
                              className="swiper-slide h-full bg-white shadow-2xl p-12"
                              key={index}
                            >
                              <CreditCard cart={cart} />
                            </SwiperSlide>
                          ))}
                        </Swiper>
                      </div>
                    </div>
                  )}
                  <div
                    className="add__cart"
                    onClick={() => {
                      setShowModal(true);
                    }}
                  >
                    <i>
                      <AiOutlinePlus size={24} fill="#ee4927" />
                    </i>
                    <p>Добавить карту</p>
                  </div>
                </div>
                {user?.type === "yur" && (
                  <div className="box">
                    <div className="name__title">{userData?.name}</div>
                    <div className="inputs">
                      <div className="input">
                        <label htmlFor="">ИНН</label>
                        <div className="value">{userData?.inn}</div>
                      </div>
                      <div className="input">
                        <label htmlFor="">Расчетный счет</label>
                        <div className="value">{userData?.account}</div>
                      </div>
                      <div className="input">
                        <label htmlFor="">ОКЭД</label>
                        <div className="value">{userData?.oked}</div>
                      </div>
                      <div className="input">
                        <label htmlFor="">Банк</label>
                        <div className="value">{userData?.bank}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {/* <div className="info__boxes2">
                <div className="box">
                  <div className="box__title">Уведомления</div>
                  <p className="mt-3"> {messages?.length} шт</p>
                </div>
                <div className="box">
                  <div className="box__title">Местные адреса</div>
                  <p className="my-2">{userData?.last_address}</p>
                  <div className="add__adress">
                    <div className="svg"></div>
                  </div>
                </div>
                <div className="box">
                  <div className="box__title">Международные адреса</div>
                  {userData?.addresses?.map((adress, index) => (
                    <p key={index} className="my-2">
                      {adress.address}
                    </p>
                  ))}
                  <div className="add__adress">
                    <div className="svg"></div>
                  </div>
                </div>
              </div> */}
            </MContainer>
          </div>
          <CartModal
            showModal={showModal}
            onClickCartData={(data) => {
              dispatch(createCard(data));
            }}
            onClickCartVerify={(number) => {
              dispatch(verifyCart(number));
            }}
            onCloseModal={() => {
              setShowModal(false);
            }}
          />
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

export default Info;
