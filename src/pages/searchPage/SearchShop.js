import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Cart } from "../../component/Cart/Cart";
import NavbarMenu from "../../container/NavbarMenu";
import { MContainer } from "../../element/Elemens";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AiOutlineMessage } from "react-icons/ai";
import { createShop } from "../../redux/actions/shopActions";
import { MdFavoriteBorder } from "react-icons/md";

const SearchShop = () => {
  const dispatch = useDispatch();
  const shopFilter = useSelector((state) => state.filter.shopList);

  return (
    <>
      <NavbarMenu />
      <MContainer>
        <div className="flex flex-wrap justify-center mb-12">
          {shopFilter?.map((shop) => (
            <div key={shop.id} shop={shop} className="seller-seller">
              {shop?.isFavorite === true ? (
                <FaHeart
                  onClick={() => dispatch(createShop({ shop_id: shop.id }))}
                  className="fa-heart"
                  fill="#ee4927"
                  size={24}
                />
              ) : (
                <MdFavoriteBorder
                  onClick={() => dispatch(createShop({ shop_id: shop.id }))}
                  className="fa-heart"
                  fill="#ee4927"
                  size={24}
                />
              )}
              {shop.photo ? (
                <img
                  src={`https://admin.birmakon.uz/${shop.photo}`}
                  alt="not found"
                />
              ) : (
                <img
                  src="https://admin.birmakon.uz//assets_files/images/user.png"
                  alt="not found"
                />
              )}
              <div className="name__title mt-2">
                {shop.contact_user ? shop.contact_user : ""}
              </div>
              {/* <p>{user?.addresses.length > 0 || "Нет адрес"}</p> */}
              <div className="links">
                <Link to="/message" className="write__to-market">
                  <AiOutlineMessage
                    className="write mr-2"
                    fill="#EE4927"
                    size={24}
                  />
                  Написать
                </Link>
                <Link to={"/selleradres/" + shop.id} className="market__link">
                  Перейти в магазин
                </Link>
              </div>
            </div>
          ))}
        </div>
      </MContainer>
    </>
  );
};

export default SearchShop;
