import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { MContainer, MLink, ShowAllLink } from "../../element/Elemens";
import "../../assets/scss/_product.scss";
import NavbarMenu from "../../container/NavbarMenu";
import { Cart } from "../../component/Cart/Cart";
import Title from "../../component/Title/Title";
import parse from "html-react-parser";
import delivery from "../../assets/images/11 122001.png";
import image25 from "../../assets/images/image 25.png";
import image26 from "../../assets/images/image 26.png";
import image27 from "../../assets/images/image 27.png";
import approved111 from "../../assets/images/approved111 .png";
import Group222 from "../../assets/images/Group222.png";
import creditCard333 from "../../assets/images/credit-card333.png";
import group1 from "../../assets/images/boxes.png";
import group2 from "../../assets/images/shopping-cart.png";
import group3 from "../../assets/images/tracking.png";
import group4 from "../../assets/images/debit-card.png";
import group5 from "../../assets/images/free-icon-gps-7203285.png";
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

import { useDispatch, useSelector } from "react-redux";
import {
  getProductsAll,
  getSliders,
  getBrands,
  getPopularProducts,
} from "../../redux/actions/productActions";
import AddedRecentlyProducts from "./AddedRecentlyProducts";
import DiscountProducts from "./DiscountProducts";
import MainPageNewsBox from "./MainPageNewsBox";
import PreLoader from "../../component/PreLoader/PreLoader";
import { getShop, getShopList } from "../../redux/actions/shopActions";
import { Link, useNavigate, useParams } from "react-router-dom";
import ProductsViewed from "../../component/ProductsViewed/ProductsViewed";
import { Box, Button, Skeleton } from "@mui/material";
import { getReklama } from "../../redux/actions/reklamaActions";
import reklama1 from "../../assets/images/rek1.png";
import reklama2 from "../../assets/images/rek2.png";
import reklama3 from "../../assets/images/rek3.png";
import { BiLoader } from "react-icons/bi";
import ProductSkelet from "../../component/loading/ProductSkelet";
const tokenLocal = window.localStorage.getItem("@token");
const language = window.localStorage.getItem("Content-language");

const API_URL = "https://admin.birmakon.uz";

const Product = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [popularProductsParams, setPopularProductsParams] = useState({
    page: 1,
    "per-page": 5,
  });

  const popularProductsPageChange = (e, value) => {
    let newParams = {
      ...popularProductsParams,
      "per-page": (popularProductsParams["per-page"] += 5),
    };
    dispatch(getPopularProducts(newParams));
  };

  useEffect(() => {
    // dispatch(getProductsAll());
    dispatch(getSliders());
    // dispatch(getShop());
    dispatch(getShopList({ page: 1, "per-page": 6 }));
    dispatch(getPopularProducts(popularProductsParams));
    dispatch(getReklama());
    dispatch(getBrands());
  }, []);

  const [productList2, setProductList2] = useState(5);

  const { loading } = useSelector((state) => state.product);
  const popularProducts = useSelector((state) => state.product.popularProducts);
  const { popularProductsLoading } = useSelector((state) => state.product);
  const { loading2 } = useSelector((state) => state.shop);

  const productsList = useSelector((state) => state.product.list);
  const sliders = useSelector((state) => state.product.sliders);
  const get_brands = useSelector((state) => state.product.brands_main);
  const get_ShopList = useSelector((state) => state.shop.shopList);
  const cartList = useSelector((state) => state.cart.list);
  const reklames = useSelector((state) => state.reklama.list);
  const { reklamaLoading } = useSelector((state) => state.reklama);
  const { reduxToken } = useSelector((state) => state.user);

  const [showMoreSeo, setShowMoreSeo] = useState(false);

  return (
    <>
      <NavbarMenu />
      <MContainer>
        {loading ? (
          <Skeleton className="!transform-none" height={450} />
        ) : (
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={10}
            slidesPerView={1}
            navigation={false}
            pagination={{ clickable: true }}
            // lazy={true}
            loop
            autoplay={{
              delay: 1500,
              disableOnInteraction: false,
            }}
            speed={1500}
          >
            {sliders?.map((slider, index) => (
              <SwiperSlide
                className="main-banner-swiper-slide cursor-pointer"
                key={index}
                onClick={() => {
                  if (slider.link) {
                    window.location.href = slider.link;
                  }
                }}
              >
                <img
                  src={API_URL + slider?.photo}
                  // src={API_URL + slider?.photo}
                  // srcSet={API_URL + slider?.photo}
                  alt=""
                  className="swiper-lazy"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </MContainer>
      <MContainer className="md:py-16 py-8">
        <div className="flex items-center justify-between flex-wrap">
          <Title
            nameUz="Sizning do'konlaringiz"
            nameEn="Your stores"
            name="Ваши магазины"
          />
          <Link className="hover:underline decoration-1" to="/markets">
            Посмотреть все
          </Link>
        </div>
        <div className="grid 2xl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4">
          {loading2 ? (
            <>
              {[...Array(6)].map((item, idx) => (
                <Box key={idx}>
                  <Skeleton
                    className="!transform-none"
                    width="100%"
                    height={180}
                  />
                  <Skeleton width="100%" height={25} />
                </Box>
              ))}
            </>
          ) : (
            get_ShopList?.map((shop, idx) => (
              <div
                onClick={() => navigate("/selleradres/" + shop.id)}
                key={idx}
              >
                <div className="brand__box">
                  <Link to={`/selleradres/${shop.id}`} className="brand__logo">
                    <img
                      src={`https://admin.birmakon.uz/${shop.photo}`}
                      alt="not found"
                    />
                  </Link>
                  <div className="brand__text">
                    <h5>{shop.name}</h5>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </MContainer>
      <MContainer className="md:py-12 py-8">
        <Title
          nameUz="Ommabop tovarlar"
          name="Популярные товары"
          nameEn="Popular goods"
        />
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3">
          {popularProducts?.map((product, index) => (
            <Cart key={index} product={product} />
          ))}
          {popularProductsLoading && <ProductSkelet length={5} />}
        </div>
        <button onClick={popularProductsPageChange} className="show__all">
          {popularProductsLoading && (
            <BiLoader className="mx-auto" fill="#fff" />
          )}
          {language === "ru" && "Показать еще"}
          {language === "uz" && "Ko'proq ko'rish"}
          {language === "en" && "Show more"}
        </button>
      </MContainer>
      <MContainer>
        <div className="delivery my-8 px-4 pt-8 xl:px-12 md:px-4">
          <div className="delivery__text">
            <div className="text__title">
              {language === "ru" && "Доставка"}
              {language === "uz" && "Yetkazib berish"}
              {language === "en" && "Delivery"}
            </div>
            <p>
              {language === "ru" && "ПО ВСЕМ УЗБЕКИСТАНУ"}
              {language === "uz" && "BUTUN O'ZBEKISTON BO'YICHA"}
              {language === "en" && "ALL OVER UZBEKISTAN"}
            </p>
          </div>
          <img src={delivery} alt="not found" />
        </div>
      </MContainer>
      <AddedRecentlyProducts />
      <MContainer className={`${reklamaLoading && "md:py-12 py-8"}`}>
        <div className="banner">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={10}
            slidesPerView={1}
            navigation={false}
            pagination={{ clickable: true }}
            loop
            autoplay={{
              delay: 1500,
              disableOnInteraction: false,
            }}
            speed={1500}
          >
            {reklamaLoading ? (
              <Skeleton className="!transform-none" height={450} />
            ) : (
              reklames?.map((reklama, index) => (
                <SwiperSlide
                  className="banner-swiper-slide cursor-pointer"
                  key={index}
                >
                  <a href={reklama.link}>
                    <img
                      src={API_URL + reklama.photo}
                      className="block"
                      alt=""
                    />
                  </a>
                </SwiperSlide>
              ))
            )}
          </Swiper>
        </div>
      </MContainer>
      <DiscountProducts />
      <MainPageNewsBox />
      {reduxToken && (
        <MContainer className="md:py-16 py-8">
          <Title
            nameUz="Yaqinda ko'rganlaringiz"
            name="Вы недавно смотрели"
            nameEn="Recently viewed"
          />
          <ProductsViewed />
        </MContainer>
      )}
      <MContainer className="md:py-12 py-8">
        <div className="adventage">
          <div className="adventage__box">
            <img style={{ width: "60px" }} src={group1} alt="not found" />
            <div className="adventage__title">
              {language === "ru" && "Закупки у производителей"}
              {language === "uz" && "Ishlab chiqaruvchilardan xaridlar"}
              {language === "en" && "Purchases from manufacturers"}
            </div>
            <div className="text">
              {language === "ru" &&
                "Через наш сайт вы можете связаться с производителями, Вы можете получить подробную информацию о продукте"}
              {language === "uz" &&
                "Saytimiz orqali siz ishlab chiqaruvchilar bilan bog'lanishingiz, mahsulot haqida batafsil ma'lumotga ega bo'lishingiz mumkin"}
              {language === "en" &&
                "Through our site, you can contact manufacturers, you can get detailed information about the product"}
            </div>
          </div>
          <div className="adventage__box">
            <img style={{ width: "60px" }} src={group2} alt="not found" />
            <div className="adventage__title">
              {language === "uz" && "Tanlang va buyurtma bering"}
              {language === "en" && "Choose and order"}
              {language === "ru" && "Выбирайте и заказывайте"}
            </div>
            <div className="text">
              {language === "uz" &&
                "Mahsulot sizga yoqdimi? Kerakli parametrlarni belgilagan holda buyurtmani onlayn rasmiylashtirsangiz bo'ladi."}
              {language === "ru" &&
                "Вам понравился товар? Вы можете сделать заказ онлайн, указав необходимые параметры."}
              {language === "en" &&
                "Did you like the product? You can make an order online by specifying the necessary parameters."}
            </div>
          </div>
          <div className="adventage__box">
            <img style={{ width: "60px" }} src={group3} alt="not found" />
            <div className="adventage__title">
              {language === "ru" && "Быстрая доставка"}
              {language === "uz" && "Tezkor yetkazib berish"}
              {language === "en" && "Fast delivery"}
            </div>
            <div className="text">
              {language === "uz" &&
                "Mahsulotlarni butun dunyo bo'ylab kichik va katta hajmlarda yetkazib beramiz"}
              {language === "ru" &&
                "Товары малых и больших размеров по всему миру мы доставим"}
              {language === "en" &&
                "Products in small and large sizes all over the world we will deliver"}
            </div>
          </div>
          <div className="adventage__box">
            <img style={{ width: "60px" }} src={group4} alt="not found" />
            <div className="adventage__title">
              {language === "uz" && "Barcha turdagi to'lovlar"}
              {language === "ru" && "Все виды платежей"}
              {language === "en" && "All types of payments"}
            </div>
            <div className="text">
              {language === "uz" &&
                "Naqd, onlayn , pul ko'chirish yo'li bilan to'lovlarni amalga oshiring"}
              {language === "ru" &&
                "Оплата наличными, онлайн, денежным переводом увеличивать"}
              {language === "en" &&
                "Make payments by cash, online, money transfer increase"}
            </div>
          </div>
          <div className="adventage__box">
            <img style={{ width: "60px" }} src={group5} alt="not found" />
            <div className="adventage__title">
              {language === "uz" && "Biz aloqadamiz 24/7"}
              {language === "ru" && "Мы на связи 24/7"}
              {language === "en" && "We are in touch 24/7"}
            </div>
            <div className="text">
              {language === "uz" &&
                "Tovarlar va xaridlaringiz bo'yicha savollar bo'lsa yordam berishga tayyormiz!"}
              {language === "ru" &&
                "Помощь с вопросами о продуктах и ​​ваших покупках мы готовы!"}
              {language === "en" &&
                "Help with questions about products and your purchases we are ready!"}
            </div>
          </div>
        </div>
      </MContainer>
      <MContainer className="">
        <Title nameUz="Brendlar" name="Бренды" nameEn="Brands" />
        <div className="md:py-12 py-8">
          <Swiper
            modules={[Navigation, Autoplay, History, Virtual, Lazy, A11y]}
            spaceBetween={10}
            slidesPerView={7}
            breakpoints={{
              0: {
                slidesPerView: 3,
              },
              769: {
                slidesPerView: 5,
              },
              1440: {
                slidesPerView: 7,
              },
            }}
            navigation
            loop
            autoplay={{
              delay: 1500,
              disableOnInteraction: false,
            }}
            speed={1500}
            className="brands swiper-brands"
          >
            {get_brands?.map((brand, index) => (
              <SwiperSlide
                style={{
                  height: "80px",
                }}
                key={index}
              >
                <img
                  style={{ height: "100%", objectFit: "contain" }}
                  // src={API_URL + brand?.photo}
                  src={API_URL + brand?.photo}
                  alt=""
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </MContainer>
      <MContainer className="md:py-12 py-8">
        <Title name="О нас" />
        <div className="seo__subtitle">
          {language === "uz" && "Xalqaro marketing platformasi"}
          {language === "ru" && "Международная маркетинговая платформа"}
          {language === "en" && "International marketing platform"}
        </div>
        <div className="seo__text">
          {language === "ru" && (
            <>
              <div className="mt-3">
                <a
                  className="text-blue-600 underline"
                  href="https://birmakon.com"
                >
                  Birmakon.com
                </a>{" "}
                ¬ - Международная маркетинговая платформа современный
                маркетплейс в Узбекистане и площадка с большим ассортиментом
                товаров, удобным поиском, понятным рубрикатором и с доставкой по
                всему миру и по Узбекистану.{" "}
                <a
                  className="text-blue-600 underline"
                  href="https://birmakon.com"
                >
                  Birmakon.com
                </a>{" "}
                осуществляет прямые поставки от производителей Узбекистана,
                помогает наладить экспорт продукции.{" "}
                {!showMoreSeo && (
                  <span
                    className="text-sky-500 cursor-pointer hover:underline"
                    onClick={() => setShowMoreSeo(true)}
                  >
                    Показать больше
                  </span>
                )}
              </div>
              {showMoreSeo && (
                <div className="mt-3">
                  Вы можете купить смартфоны, бытовую технику, ковры, мелочи для
                  дома, одежду и обувь для женщин, мужчин и детей, товары для
                  красоты и даже продукты питания через удобную форму заказа от
                  производителей Узбекистана.{" "}
                  <a
                    className="text-blue-600 underline"
                    href="https://birmakon.com"
                  >
                    Birmakon.com
                  </a>{" "}
                  — первая в Узбекистане площадка онлайн-торговли созданная по
                  международным стандартам.{" "}
                  <span
                    className="text-sky-500 cursor-pointer hover:underline"
                    onClick={() => setShowMoreSeo(false)}
                  >
                    Развернуть
                  </span>
                </div>
              )}
            </>
          )}
        </div>
      </MContainer>
    </>
  );
};

export default Product;
