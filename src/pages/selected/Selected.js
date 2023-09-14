import React, { useEffect } from "react";
import "../../assets/scss/_selected.scss";
import { Cart } from "../../component/Cart/Cart";
import Title from "../../component/Title/Title";
import { ShowAllLink } from "../../element/Elemens";
import { FaHeart } from "react-icons/fa";
import { AiOutlineMessage } from "react-icons/ai";
import { MContainer } from "../../element/Elemens";
import SecondNavbar from "../../component/layout/SecondNavbar";
import { useDispatch, useSelector } from "react-redux";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import {
  createShop,
  getShopFavoriteAll,
} from "../../redux/actions/shopActions";
import { Link } from "react-router-dom";
import ProductsViewed from "../../component/ProductsViewed/ProductsViewed";

export default function Selected() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getShopFavoriteAll());
  }, []);
  const favoriteList = useSelector((state) => state.favorite.favoritiesList);
  const shop_favoriteList = useSelector((state) => state.shop.shopFavoriteList);
  const { reduxToken } = useSelector((state) => state.auth);

  return (
    <>
      <MContainer>
        <div className="pages-link">
          <Link to="/">Главная страница / </Link>
          <Link to="">Избранные</Link>
        </div>
      </MContainer>
      <SecondNavbar />
      <MContainer className="md:py-12 py-8" style={{ minHeight: '70vh' }}>
        <Title name="Избранное" />
        <Tabs className="mini__page">
          <TabList className="selected-tabb">
            <Tab>По товарам</Tab>
            <Tab>По продавцам</Tab>
          </TabList>
          <TabPanel>
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3">
              {favoriteList?.length > 0
                ? favoriteList?.map((favorite, idx) => (
                    <Cart key={idx} product={favorite} />
                  ))
                : "Избранных товаров нет"}
            </div>
          </TabPanel>
          <TabPanel>
            <div className="flex flex-wrap">
              {shop_favoriteList?.length > 0
                ? shop_favoriteList?.map((shop, idx) => (
                    <div key={idx} shop={shop} className="seller-seller">
                      <FaHeart
                        onClick={() =>
                          dispatch(createShop({ shop_id: shop.id }))
                        }
                        className="fa-heart"
                        fill="#ee4927"
                        size={24}
                      />
                      {/* <FaHeart className="fa-heart" fill="#EE4927" size={24} /> */}
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
                        <Link
                          to={"/selleradres/" + shop.id}
                          className="market__link"
                        >
                          Перейти в магазин
                        </Link>
                      </div>
                    </div>
                  ))
                : "Избранных магазинов нет"}
            </div>
          </TabPanel>
        </Tabs>
        <br />
        {/* <Title name="Рекламный блок" />
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3">
          <Cart />
        </div>
        <ShowAllLink to="/filter" className="show__all">
          Показать еще
        </ShowAllLink> */}
        {reduxToken && (
          <>
            <Title name="Вы недавно смотрели" />
            <ProductsViewed />
          </>
        )}
      </MContainer>
    </>
  );
}
