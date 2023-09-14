import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AiOutlineMessage } from "react-icons/ai";
import { MdFavoriteBorder } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getProductOne } from "../../redux/actions/productActions";
import { createShop } from "../../redux/actions/shopActions";
import ErrorModal from "../ErrorModal/ErrorModal";
const API = `${process.env.REACT_APP_API_DOMAIN}`;

const Shop = ({ shop, favourite, userId }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [favorite, setFavorite] = useState(favourite);
  // useEffect(() => {
  //   dispatch(getProductOne(id));
  // }, []);
  const { reduxToken } = useSelector((state) => state.user);
  const productOne = useSelector((state) => state.product.data);
  const [showErrorModal1, setShowErrorModal1] = useState(false);
  const [showErrorModal3, setShowErrorModal3] = useState(false);

  return (
    <>
      <ErrorModal
        showModal={showErrorModal1}
        onClose={() => setShowErrorModal1(false)}
        text="Зарегистрируйте чтобы добавить в избранную"
      />
      <ErrorModal
        showModal={showErrorModal3}
        onClose={() => setShowErrorModal3(false)}
        text="Зарегистрируйте чтобы написать"
      />
      <div onChange={() => console.log(favourite)} className="seller-seller">
        {shop?.isFavorite === false ? (
          <MdFavoriteBorder
            onClick={() => {
              if(!reduxToken){
                setShowErrorModal1(true)
              }
              else{
                dispatch(createShop({ shop_id: shop.id }))
              }
            }}
            className="fa-heart"
            fill="#ee4927"
            size={24}
          />
        ) : (
          <FaHeart
            onClick={() => {
              if(!reduxToken){
                setShowErrorModal1(true)
              }
              else{
                dispatch(createShop({ shop_id: shop.id }))
              }
            }}
            className="fa-heart"
            fill="#EE4927"
            size={24}
          />
        )}
        {productOne.shop?.photo ? (
          <img src={`${API}${productOne.shop?.photo}`} alt="not found" />
        ) : (
          <img
            src="https://admin.birmakon.uz//assets_files/images/user.png"
            alt="not found"
          />
        )}
        <div className="name__title mt-2">
          {productOne.shop?.contact_user ? productOne.shop?.contact_user : ""}
        </div>
        <div className="links">
          <div
            onClick={() => {
              if(!reduxToken){
                setShowErrorModal3(true)
              }
              else{
                navigate("/message/type=shop/" + userId);
              }
            }}
            className="write__to-market"
          >
            <AiOutlineMessage className="write mr-2" fill="#EE4927" size={24} />
            Написать
          </div>
          <Link
            to={"/selleradres/" + productOne.shop?.id}
            className="market__link"
          >
            Перейти в магазин
          </Link>
        </div>
      </div>
    </>
  );
};

export default Shop;
