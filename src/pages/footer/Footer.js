import React from "react";
import { FooterLink } from "../../element/Elemens";
import "../../assets/scss/_footer.scss";
import { FaTelegramPlane, FaFacebookF, FaTiktok } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";
import maskGroup from "../../assets/images/Mask Group.png";
import a from "../../assets/images/a.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer__back">
      <div className="container mx-auto px-md-8 px-4">
        <div className="footer__box">
          <div className="footer__logo">
            <FooterLink to="/">
              <img className="h-8 w-auto mx-auto" src={maskGroup} alt="" />
            </FooterLink>
          </div>
          <div>
            <div className="footer__title">
              <h5>Покупателям</h5>
            </div>
            <ul className="footer__ul">
              <li className="footer__li">
                <FooterLink to="/deliveries">Доставка</FooterLink>
              </li>
              <li className="footer__li">
                <FooterLink to="/returnproduct">Возврат товара</FooterLink>
              </li>
            </ul>
          </div>
          <div>
            <div className="footer__title">
              <h5>Компания</h5>
            </div>
            <ul className="footer__ul">
              <li className="footer__li">
                <FooterLink to="/contacts">Контакты</FooterLink>
              </li>
              <li className="footer__li">
                <FooterLink to="/questions">FAQ</FooterLink>
              </li>
            </ul>
          </div>
          <div>
            <div className="footer__title">
              <h5>Мы в соцсетях</h5>
            </div>
            <div className="footer__soc flex items-center md:justify-between mt-4">
              <FooterLink to="">
                <FaTelegramPlane
                  onMouseOut={({ target }) => (target.style.fill = "#fff")}
                  onMouseOver={({ target }) => (target.style.fill = "#ee4927")}
                  size={30}
                  fill="#fff"
                />
              </FooterLink>
              <FooterLink to="" className="ml-3">
                <BsInstagram
                  onMouseOut={({ target }) => (target.style.fill = "#fff")}
                  onMouseOver={({ target }) => (target.style.fill = "#ee4927")}
                  size={30}
                  fill="#fff"
                />
              </FooterLink>
              <FooterLink to="" className="ml-3">
                <FaFacebookF
                  onMouseOut={({ target }) => (target.style.fill = "#fff")}
                  onMouseOver={({ target }) => (target.style.fill = "#ee4927")}
                  size={30}
                  fill="#fff"
                />
              </FooterLink>
              <FooterLink to="" className="ml-3">
                <FaTiktok
                  onMouseOut={({ target }) => (target.style.fill = "#fff")}
                  onMouseOver={({ target }) => (target.style.fill = "#ee4927")}
                  size={30}
                  fill="#fff"
                />
              </FooterLink>
            </div>
          </div>
          <div className="response__app">
            <div className="footer__title">
              <h5>Скачать приложение</h5>
            </div>
            <FooterLink to="">
              <img src={a} alt="" />
            </FooterLink>
          </div>
        </div>
        <div className="demand xl:w-1/3 md:w-1/2 ml-auto grid grid-cols-4 gap-4 pb-8">
          <div className="cursor-pointer py-2 px-2 bg-white rounded duration-200 hover:bg-gray-200">
            <img
              src="https://marketing.uz/uploads/articles/1192/article-original.png"
              className="w-full h-10 object-contain"
              alt=""
            />
          </div>
          <div className="cursor-pointer py-2 px-2 bg-white rounded duration-200 hover:bg-gray-200">
            <img
              src="https://click.uz/click/images/click-white.jpg"
              className="w-full h-10 object-contain"
              alt=""
            />
          </div>
          <div className="cursor-pointer py-2 px-2 bg-white rounded duration-200 hover:bg-gray-200">
            <img
              src="https://help.payme.uz/img/payme-logo.svg"
              className="w-full h-10 object-contain"
              alt=""
            />
          </div>
          <div className="cursor-pointer py-2 px-2 bg-white rounded duration-200 hover:bg-gray-200">
            <img
              src="https://humocard.uz/bitrix/templates/main/img/card2.png"
              className="w-full h-10 object-contain"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
