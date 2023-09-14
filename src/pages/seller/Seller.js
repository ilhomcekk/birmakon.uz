import React, { useState } from "react";
import "../../assets/scss/_seller_adres.scss";
import { MContainer, ShowAllLink } from "../../element/Elemens";
import image5 from "../../assets/images/image 5.png";
import image51 from "../../assets/images/image 5 (1).png";
import image52 from "../../assets/images/image 5 (2).png";
import backSellerImage from "../../assets/images/sellerBackground.png";
import { Button, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { createChatAdmin } from "../../redux/actions/userActions";
import { useEffect } from "react";

export default function Seller() {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const [error, setError] = useState(false);

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  const handleChange = (event) => {
    if (!isValidEmail(event.target.value)) {
      setError(true);
      console.log(error);
    } else {
      setError(null);
    }
    let newData = {
      ...data,
      email: event.target.value,
    };
    setData(newData);
  };

  const adminSendStep = useSelector((state) => state.user.adminSendStep);
  useEffect(() => {
    if (adminSendStep === true) {
      onCloseModal();
    }
  }, [adminSendStep]);

  return (
    <>
      <div className="seller-adres">
        <Modal open={open} onClose={onCloseModal} center>
          <div className="seller-modal-container">
            <div className="text-left">Напишите имя</div>
            <TextField
              className="w-full !mb-4"
              onChange={(e) => {
                let newData = {
                  ...data,
                  name: e.target.value,
                };
                setData(newData);
              }}
              size="medium"
            />
            <div className="text-left">Напишите E-mail</div>
            <TextField
              className="w-full !mb-4"
              onChange={(e) => {
                handleChange(e);
              }}
              size="medium"
              type="email"
              required
            />
            <div className="text-left">Напишите комментария</div>
            <TextField
              className="w-full !mb-4"
              onChange={(e) => {
                let newData = {
                  ...data,
                  message: e.target.value,
                };
                setData(newData);
              }}
              size="medium"
            />
            {error ? (
              <Button variant="contained" color="primary">
                Неправильный Е-mail{" "}
              </Button>
            ) : (
              <Button
                onClick={() => dispatch(createChatAdmin(data))}
                variant="contained"
                color="primary"
              >
                Отправить
              </Button>
            )}
          </div>
        </Modal>
        <div
          className="header"
          style={{ backgroundImage: `url(${backSellerImage})` }}
        >
          <div className="container mx-auto px-4 xl:px-12 md:px-4">
            <h1>
              Продажи на Birmakon <br /> по системе FBS Birmakon
            </h1>
            <p>
              Получайте заказы от клиентов, привозите товар и получайте большую
              комиссию от продаж
            </p>
          </div>
        </div>
        <MContainer className="md:py-12 py-8">
          <div className="aside">
            <div className="aside__box">
              <img src={image5} alt="not found" />
              <div className="aside__text">
                <div className="text__title">Выгодно</div>
                <p>
                  Комиссия 1–5%, отсутствие оплаты за складские операции, не
                  надо замораживать сток на складе Birmakon
                </p>
              </div>
            </div>
            <div className="aside__box">
              <img src={image51} alt="not found" />
              <div className="aside__text">
                <div className="text__title">Быстро</div>
                <p>Быстрая загрузка товара на сайт Birmakon</p>
              </div>
            </div>
            <div className="aside__box">
              <img src={image52} alt="not found" />
              <div className="aside__text">
                <div className="text__title">Удобно</div>
                <p>
                  Получайте заказ от клиента и привозите нам заказанный товар в
                  удобный временной диапазон
                </p>
              </div>
            </div>
          </div>
          <div className="seller__title">
            Станьте продавцом и зарабатывайте <br />
            на Birmakon
          </div>
          <div className="flex items-center justify-center mt-8">
            <Button
              onClick={onOpenModal}
              variant="contained"
              color="primary"
              size="large"
              style={{ background: "#131e3d" }}
            >
              Стать продавцом
            </Button>
          </div>
        </MContainer>
      </div>
    </>
  );
}
