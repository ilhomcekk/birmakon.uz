import React from "react";
import "../../assets/scss/_news.scss";
import { MContainer, Link, MLink } from "../../element/Elemens";
import image1 from "../../assets/images/image 5 (4).png";
import image2 from "../../assets/images/image 5 (4).png";
import image3 from "../../assets/images/image 5 (4).png";
import image4 from "../../assets/images/image 3.png";
import image5 from "../../assets/images/Rectangle 621.png";
import image6 from "../../assets/images/image 9.png";
import NavbarMenu from "../../container/NavbarMenu";
import Title from "../../component/Title/Title";

export default function News() {
  return (
    <>
      <NavbarMenu />
      <MContainer>
        <div className="pages-link mb-4">
          <Link to="/">Главная страница / </Link>
          <Link to="/basket">Корзина</Link>
        </div>
      </MContainer>
      <MContainer className="md:py-12 py-8">
        <Title name="Новости" />
        <div className="news__boxes">
          <div className="box">
            <img src={image1} alt="not found" />
            <div className="box__text">
              <div className="box__title">
                В AliExpress представили портрет типичного покупателя в регионах
              </div>
              <p>
                Петербуржцы закупаются пляжными сабо, омички — теплыми
                тапочками, а в Нижнем Новгороде заказывают жилеты с подогревом.
              </p>
              <div className="n__date">
                <MLink to="">Подробно</MLink>
                <span>24.04.2021</span>
              </div>
            </div>
          </div>
          <div className="box">
            <img src={image2} alt="not found" />
            <div className="box__text">
              <div className="box__title">
                В AliExpress представили портрет типичного покупателя в регионах
              </div>
              <p>
                Петербуржцы закупаются пляжными сабо, омички — теплыми
                тапочками, а в Нижнем Новгороде заказывают жилеты с подогревом.
              </p>
              <div className="n__date">
                <MLink to="">Подробно</MLink>
                <span>24.04.2021</span>
              </div>
            </div>
          </div>
          <div className="box">
            <img src={image3} alt="not found" />
            <div className="box__text">
              <div className="box__title">
                В AliExpress представили портрет типичного покупателя в регионах
              </div>
              <p>
                Петербуржцы закупаются пляжными сабо, омички — теплыми
                тапочками, а в Нижнем Новгороде заказывают жилеты с подогревом.
              </p>
              <div className="n__date">
                <MLink to="">Подробно</MLink>
                <span>24.04.2021</span>
              </div>
            </div>
          </div>
        </div>
      </MContainer>
      <div className="container mx-auto px-4 xl:px-12 md:px-4">
        <div className="n-video-title">Видео новости</div>
      </div>
      <div className="container mx-auto px-4 xl:px-12 md:px-4">
        <div className="n-video">
          <div className="videos">
            <div className="video__box">
              <div className="video__box-img">
                <img src={image4} alt="not found" />
                <i className="fa fa-play"></i>
              </div>
              <div className="box__title">
                Узб компания Birmakon планирует выход на рынок
                Узбекистана
              </div>
              <p>
                Стороны обсудили возможное сотрудничество в сфере экспортных
                интернет-продаж текстильной и швейно-трикотажной промышленности
                с производителями Узбекистана.
              </p>
              <MLink to="">Подробно</MLink>
            </div>
          </div>
          <div className="video__boxes">
            <div className="box">
              <div className="box__image">
                <img src={image5} alt="not found" />
                <i className="fa fa-play"></i>
              </div>
              <div className="box__text">
                <div className="text__title">
                  В топ-10 российских онлайн-магазинов впервые вошла
                  интернет-аптека
                </div>
                <p>
                  OВ десятку крупнейших интернет-магазинов России по версии
                  аналитического агентства Data Insight впервые вошла
                  онлайн-аптека – apteka.ru. По итогам 2019 г. она поднялась с
                  13-го на 7-е место.
                </p>
                <div className="n__date">
                  <MLink to="">Подробно</MLink>
                  <span>30.04.2021</span>
                </div>
              </div>
            </div>
            <div className="box">
              <div className="box__image">
                <img src={image6} alt="not found" />
              </div>
              <div className="box__text">
                <div className="text__title">
                  В топ-10 российских онлайн-магазинов впервые вошла
                  интернет-аптека
                </div>
                <p>
                  OВ десятку крупнейших интернет-магазинов России по версии
                  аналитического агентства Data Insight впервые вошла
                  онлайн-аптека – apteka.ru. По итогам 2019 г. она поднялась с
                  13-го на 7-е место.
                </p>
                <div className="n__date">
                  <MLink to="">Подробно</MLink>
                  <span>30.04.2021</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
