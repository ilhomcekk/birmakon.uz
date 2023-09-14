import React, { useEffect } from "react";
import { MLink } from "../../element/Elemens";
import { CgHeart } from "react-icons/cg";
import { FaHeart } from "react-icons/fa";

import "../../assets/scss/_cart.scss";
import { useDispatch, useSelector } from "react-redux";
import { createFavorite } from "../../redux/actions/favoriteActions";
import { postCartAdd } from "../../redux/actions/cartActions";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { useState } from "react";
import ErrorModal from "../ErrorModal/ErrorModal";
const token = window.localStorage.getItem("@token");
const currency = window.localStorage.getItem("Content-currency");

export const Cart = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currencyState, setCurrencyState] = useState("");
  useEffect(() => {
    if (currency === "sum") {
      setCurrencyState("сум");
    }
    if (currency === "dollar") {
      setCurrencyState("у.е");
    }
  }, []);
  const { toBuy } = useSelector((state) => state.cart);
  const language = window.localStorage.getItem("Content-language");
  const favorites = useSelector((state) => state.favorite.favoritiesList);
  const favoritesId = favorites?.map((item) => item.id);
  const [favorite, setFavorite] = useState(false);
  useEffect(() => {
    if (favoritesId?.includes(+product.id)) {
      setFavorite(true);
    } else {
      setFavorite(false);
    }
  }, [favorites, favoritesId]);

  const { reduxToken } = useSelector((state) => state.user);
  const [showErrorModal1, setShowErrorModal1] = useState(false);

  return (
    <>
      <ErrorModal
        showModal={showErrorModal1}
        onClose={() => setShowErrorModal1(false)}
        text="Зарегистрируйте чтобы добавить в избранную"
      />
      <div className="cart__box shadow-xl">
        <div className="cart__image">
          <Link to={"/add/" + product.id}>
            <img
              src={`https://admin.birmakon.uz/${product.photo}`}
              alt="not found"
            />
          </Link>
          <Link to={"/add/" + product.id} className="fast__review">
            детальный просмотр
          </Link>
          {product.discount ? (
            <span className="skidka">{product.discount} %</span>
          ) : null}
          {favorite ? (
            <Button className="heart">
              <FaHeart
                size={28}
                onClick={() => {
                  if (!reduxToken) {
                    setShowErrorModal1(true);
                  } else {
                    dispatch(createFavorite({ product_id: product.id }));
                  }
                }}
              />
            </Button>
          ) : (
            <Button className="heart">
              <CgHeart
                size={28}
                onClick={() => {
                  if (!reduxToken) {
                    setShowErrorModal1(true);
                  } else {
                    dispatch(createFavorite({ product_id: product.id }));
                  }
                }}
              />
            </Button>
          )}
        </div>
        <div
          className="cart__info"
          onClick={() => navigate("/add/" + product.id)}
        >
          <div className="flex justify-between mt-3">
            <Link
              to={`/filter/${product?.category?.id}`}
              className="cart__cat hover:underline"
            >
              {product.category?.name}
            </Link>
            <div className="cart__brand">{product.brand?.name}</div>
          </div>
          <div className="cart__title">
            <MLink to={`/add/${product.id}`}>
              {language === "ru" && product?.name_ru}
              {language === "uz" && product?.name_uz}
              {language === "en" && product?.name_en}
            </MLink>
            <div className="cart__price">
              <h5>
                {product.price?.toLocaleString("de-DE")}{" "}
                {/* {product.currency?.name} */}
                {currencyState}
              </h5>
              <p>
                {product.price_old
                  ? product.price_old?.toLocaleString("de-DE") +
                    // product.currency?.name
                    currencyState
                  : ""}
              </p>
            </div>
          </div>
          {/* <div className="cart__add">
          <button
            className="!w-full"
            onClick={() => {
              if (!token) {
                navigate("/firstregister");
              } else {
                dispatch(postCartAdd({ product_id: product.id, amount: 1 }));
              }
            }}
          >
            <span>Подробнее о товаре</span>
          </button>
          <button
            onClick={() => {
              dispatch(postCartAdd({ product_id: product.id, amount: 1 }));
              navigate("/basket");
            }}
            className="buy"
          >
            Купить
          </button>
        </div> */}
        </div>
      </div>
    </>
  );
};
