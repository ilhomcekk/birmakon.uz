import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router";
import { MContainer } from "../../element/Elemens";
import { Carousel } from "react-responsive-carousel";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import ReactStars from "react-rating-stars-component";
import requests from "../../helpers/requests";
import queryString from "query-string";
import success from "../../assets/images/success-icon.png";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import ProductOrderForm from "../../component/Product/ProductOrderForm";
import { ProductOrderLoading } from "../../component/loading/ProductOrderLoading";
import HTMLparseMM from "html-react-parser";
import "react-tabs/style/react-tabs.css";
import "../../assets/scss/_product.scss";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "react-phone-input-2/lib/style.css";
import "react-toastify/dist/ReactToastify.css";

const ProductOrder = () => {
  const { productID } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();

  const [orderSaved, setOrderSaved] = useState(false);
  const stream_user = queryString.parse(location.search);

  const createOrder = (params) => {
    dispatch({ type: "create_order_start", payload: params });

    requests
      .createOrder(params)
      .then(({ data }) => {
        dispatch({ type: "create_order_success", payload: data });
        setOrderSaved(true);
      })
      .catch(({ response }) => {
        let message =
          (response && response.data.message) || "Mahsulot topilmadi";
        dispatch({ type: "create_order_error", payload: message });
        toast(message);
      });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [orderSaved]);

  const ratingChanged = (newRating) => {
    console.log(newRating);
  };

  const product = {};
  const { loadingOrder } = useSelector((state) => state.product);

  return (
    <>
      {loadingOrder ? (
        <ProductOrderLoading />
      ) : (
        <MContainer>
          {orderSaved ? (
            <div className="product__order__saved">
              <div className="product__order__saved__image__ramce">
                <img src={success} alt="Arizangiz qabul qilindi!" />
              </div>
              <h3>"Arizangiz qabul qilindi!"</h3>
              <p className="product__order__saved__text">
                Batafsil ma'lumot uchun operator yaqin vaqt ichida sizga aloqaga
                chiqadi. Iltimos, telefoningiz yoqilgan holda bo'lsin!
              </p>
            </div>
          ) : (
            <div className="product__order__page">
              <div className="product__order__page__title">
                <div className="product__order__page__product__title">
                  {product.title}
                </div>
                <div className="product__order__page__product__price">
                  {product.price} so'm
                </div>
              </div>
              <div className="product__order__page__title__icons">
                <ReactStars
                  count={5}
                  onChange={ratingChanged}
                  size={24}
                  activeColor="#103B7D"
                  value={4}
                />
                <span className="product__order__page__icon__text">
                  550 sharxlar
                </span>
              </div>
              <div className="product__order__page__row">
                <div className="product__order__page__corousel">
                  <Carousel
                    preventMovementUntilSwipeScrollTolerance={true}
                    autoPlay={true}
                    infiniteLoop={true}
                  >
                    {product.images &&
                      product.images?.map((img, index) => (
                        <div key={index} className="product__order__page__corousel__image__ramce">
                          <img src={img} alt="Carousel" />
                        </div>
                      ))}
                  </Carousel>
                </div>
                <div className="product__order__page__user__info">
                  <h2>Buyurtma berish</h2>

                  {/*
                =========
                Component
              */}
                  <ProductOrderForm
                    productID={productID}
                    stream_user={stream_user}
                    onClickProductOrder={(data) => {
                      createOrder(data);
                    }}
                  />
                </div>
              </div>
              <div className="product__order__page__description">
                <div className="product__order__page__description__text">
                  <Tabs>
                    <TabList>
                      <Tab>Mahsulot haqida tavsif</Tab>
                    </TabList>

                    <TabPanel>
                      <p className="product__order__page__description__p">
                        {HTMLparseMM(product.desc || "")}
                      </p>
                    </TabPanel>
                  </Tabs>
                </div>
              </div>
            </div>
          )}
        </MContainer>
      )}
    </>
  );
};

export default ProductOrder;
