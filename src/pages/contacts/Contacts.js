import React, { useState } from "react";
import "../../assets/scss/_contacts.scss";
import { MContainer } from "../../element/Elemens";
import contactsImg from "../../assets/images/Screenshot_1 1.png";
import { Link } from "react-router-dom";
import { GoogleMap, LoadScriptNext, Marker } from "@react-google-maps/api";
import { useDispatch } from "react-redux";
import { createChatAdmin } from "../../redux/actions/userActions";
import GoogleMapReact from "google-map-react";
import { FaMapMarkerAlt } from "react-icons/fa";
const AnyReactComponent = ({ text }) => (
  <div>{<FaMapMarkerAlt size={36} fill="red" />}</div>
);

export default function Contacts() {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [coordinates, setCoordinates] = useState({
    lat: 39.407955,
    lng: 67.242861,
  });
  return (
    <>
      <MContainer className="pages">
        <Link to="">Главная страница / </Link>
        <Link to=""> Контакты</Link>
      </MContainer>
      <MContainer>
        <div className="contacts__title">Контакты</div>
        <div className="contacts__boxes mb-12">
          <div className="contacts__boxes-box">
            <div style={{ height: "400px" }}>
              <GoogleMapReact
                bootstrapURLKeys={{ key: "" }}
                defaultCenter={coordinates}
                defaultZoom={11}
              >
                <AnyReactComponent
                  lat={coordinates.lat}
                  lng={coordinates.lng}
                />
              </GoogleMapReact>
            </div>
            <div className="boxes">
              <div className="contact__box">
                <h1 className="!pl-0">Телефон номер:</h1>
                <h3>+998 90-101-70-46</h3>
              </div>
              <div className="contact__box">
                <h1 className="!pl-0">Юридический адрес:</h1>
                <h3>
                  Самарқанд вилояти Ургут тумани, Ургут шаҳри, Навои шоҳ кўчаси
                </h3>
              </div>
              <div className="contact__box">
                <h1 className="!pl-0">E-mail:</h1>
                <h3>info@birmakon.uz</h3>
              </div>
              <div className="contact__box">
                <h1 className="!pl-0">Реквизиты</h1>
                <h3>Р/счёт: 2020 8000 7053 8369 4001</h3>
                <h3>Наим-е банка: ЧАБ «Трастбанк»</h3>
                <h3>МФО: 01097</h3>
                <h3>ИНН: 308452594</h3>
              </div>
            </div>
          </div>
          <div className="r__box">
            <div className="title">Отпавте нам сообщение</div>
            <div className="input !w-full">
              <label htmlFor="">Имя</label>
              <input
                onChange={(e) => {
                  let newData = {
                    ...data,
                    name: e.target.value,
                  };
                  setData(newData);
                }}
                className="mt-2"
                type="text"
                placeholder="Ваше имя"
                required
              />
            </div>
            <div className="input !w-full">
              <label htmlFor="">E-mail</label>
              <input
                onChange={(e) => {
                  let newData = {
                    ...data,
                    email: e.target.value,
                  };
                  setData(newData);
                }}
                className="mt-2"
                type="email"
                placeholder="Ваш e-mail"
                required
              />
            </div>
            {/* <div className="input !w-full">
              <label htmlFor="">Номер</label>
              <input className="mt-2" type="number" placeholder="Ваш номер" />
            </div> */}
            <label htmlFor="">Комментарий</label>
            <textarea
              className="textarea mt-2"
              placeholder="Оставьте отзыв"
              required
              onChange={(e) => {
                let newData = {
                  ...data,
                  message: e.target.value,
                };
                setData(newData);
              }}
            ></textarea>
            <div className="r__box-button">
              <button
                onClick={() => dispatch(createChatAdmin({ ...data }))}
                type="submit"
                className="mx-auto"
              >
                Отправить сообщение
              </button>
            </div>
          </div>
        </div>
      </MContainer>
      {/* <MContainer className="requisites">
        <div className="requisites__title">Реквизиты</div>
        <div className="text">
          <span>Полное наименование</span>
          <p>Общество с ограниченной ответственностью Birmakon</p>
        </div>
        <div className="text">
          <span>Генеральный директор</span>
          <p>Бакальчук Татьяна Владимировна</p>
        </div>
        <div className="text">
          <span>Наименование банка</span>
          <p>в Банк ВТБ (ПАО), г. Москва</p>
        </div>
        <div className="text">
          <span>Корреспондентский счет</span>
          <p>30101810700000000187</p>
        </div>
        <div className="text">
          <span>БИК</span>
          <p>044525187</p>
        </div>
        <div className="text">
          <span>Расчетный счет</span>
          <p>40702810500110000939</p>
        </div>
        <div className="text">
          <span>ИНН</span>
          <p>7721546864</p>
        </div>
        <div className="text">
          <span>КПП</span>
          <p>507401001</p>
        </div>
        <div className="text">
          <span>ОГРН</span>
          <p>1067746062449</p>
        </div>
        <div className="text">
          <span>Юридический адреc</span>
          <p>
            142181, Московская область, г. Подольск, деревня Коледино,
            Территория Индустриальный парк Коледино, д. 6, стр. 1
          </p>
        </div>
        <h3>
          Обращаем внимание, что данные реквизиты не предназначены для оплаты
          заказов
        </h3>
        <h3>Оплата заказа производится только через Личный кабинет</h3>
      </MContainer> */}
    </>
  );
}
