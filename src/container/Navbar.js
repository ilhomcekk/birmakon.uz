import React, { useState, useEffect } from "react";
import "../assets/scss/_navbar.scss";
import {
  MContainer,
  MLink,
  MNavbar,
  MNavbarTop,
  MNav,
} from "../element/Elemens";
import { HiLocationMarker } from "react-icons/hi";
import { IoIosNotificationsOutline, IoMdClose } from "react-icons/io";
import { BiCategoryAlt } from "react-icons/bi";
import { ImCart } from "react-icons/im";
import { BiGitCompare, BiUserCheck } from "react-icons/bi";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoIosSearch, IoIosClose } from "react-icons/io";
import { AiOutlineShopping, AiOutlineRight } from "react-icons/ai";
import { FaUserAlt, FaRegUser } from "react-icons/fa";
import { FiMenu, FiSearch } from "react-icons/fi";
import { BsSuitHeartFill } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import Logo from "../assets/images/245.png";
import Logo from "../assets/images/BIRMAKON.UZ SVG.svg";
import notificationImg from "../assets/images/11 122001.png";
import { Badge, Box, IconButton, Modal, Skeleton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions/authActions";
import {
  getCategoriesAll,
  getCategory,
  getRegions,
  getRegionsSub,
  getSubCategoriesAll,
  subCategoryFilter,
} from "../redux/actions/categoryActions";
import { getFavoriteAll } from "../redux/actions/favoriteActions";
import { getCart } from "../redux/actions/cartActions";
import {
  callCenter,
  getCurrency,
  getMe,
  getNewNotification,
  getNotification,
  setReaded,
} from "../redux/actions/userActions";
import {
  getProductSearch,
  getShopsByFilter,
} from "../redux/actions/filterActions";
import { getShopFavoriteAll } from "../redux/actions/shopActions";
import ErrorModal from "../component/ErrorModal/ErrorModal";
// const token = window.localStorage.getItem("@token");
const URL = "https://admin.birmakon.uz/";
const language = window.localStorage.getItem("Content-language");
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  background: "#fff",
  boxShadow: 24,
  padding: "24px",
};

const Navbar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const [filterSearch, setFilterSearch] = useState("1");
  const [filterProduct, setFilterProduct] = useState({ query: "" });
  const [filterShop, setFilterShop] = useState({ query: "" });

  const { pathname } = location;
  const splitLocation = pathname.split("/");

  const [fixedNavbar, setFixedNavbar] = useState(false);
  const [fixedNavbarResponse, setFixedNavbarResponse] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);
  // const [openProfile, setOpenProfile] = useState(false);
  // const [categoryInput, setCategoryInput] = useState("");
  const [notification, setNotification] = useState(false);
  const [activeNot1, setActiveNot1] = useState(true);
  const [activeNot2, setActiveNot2] = useState(false);
  const [uopenMenuMobile, setUopenMenuMobile] = useState(false);
  const [openProfileMenu, setOpenProfileMenu] = useState(false);
  const [openMenuSearch, setOpenMenuSearch] = useState(false);
  // const [currency2, setCurrency] = useState();

  const handleNotification = () => {
    setNotification((value) => !value);
  };

  const changeScrollNavbar = () => {
    if (window.scrollY >= 45) {
      setFixedNavbar(true);
    } else {
      setFixedNavbar(false);
    }
  };

  window.addEventListener("scroll", changeScrollNavbar);
  const changeScrollNavbarResponse = () => {
    if (window.scrollY >= 50) {
      setFixedNavbarResponse(true);
    } else {
      setFixedNavbarResponse(false);
    }
  };
  window.addEventListener("scroll", changeScrollNavbarResponse);

  const handleSelected = () => {
    setOpenCategory((value) => !value);
  };
  const handleNot1 = () => {
    setActiveNot1(true);
    setActiveNot2(false);
  };
  const handleNot2 = () => {
    setActiveNot2(true);
    setActiveNot1(false);
  };
  const openMenuMobile = (value) => {
    setUopenMenuMobile(value);
  };
  const openProfileMenuFun = (value) => {
    setOpenProfileMenu(value);
  };

  useEffect(() => {
    dispatch(getCategoriesAll());
    dispatch(getCategory());
    dispatch(subCategoryFilter());
    dispatch(getFavoriteAll());
    dispatch(getShopFavoriteAll());
    dispatch(getCart());
    dispatch(getMe());
    dispatch(getProductSearch(filterProduct));
    dispatch(getShopsByFilter(filterShop));
    dispatch(callCenter());
    dispatch(getCurrency());
    dispatch(getNotification());
    dispatch(getNewNotification());
    dispatch(getRegions());
    // dispatch(getBTCRegions());
  }, []);

  // const categoryList = useSelector((state) => state.category.categoryList);
  const favoriteList = useSelector((state) => state.favorite.favoritiesList);
  const cartList = useSelector((state) => state.cart.list);
  const productFelter = useSelector((state) => state.filter.searchList);
  const shopFilter = useSelector((state) => state.filter.shopList);
  const navCategoryList = useSelector((state) => state.category.categoryList);
  const strAscending = [...navCategoryList]?.sort((a, b) =>
    a.name < b.name ? -1 : 1
  );
  const subCategory = useSelector((state) => state.category.subCategory);
  // const { categoryLoading } = useSelector((state) => state.category);
  const { subCategoryLoading } = useSelector((state) => state.category);
  const shop_favoriteList = useSelector((state) => state.shop.shopFavoriteList);
  const call_center = useSelector((state) => state.user.call);
  const { callCenterLoading } = useSelector((state) => state.user);
  const currency = useSelector((state) => state.user.currencyList);
  const notifications = useSelector((state) => state.user.notificationList);
  const newNotifications = useSelector(
    (state) => state.user.newNotificationList
  );
  // const token = window.localStorage.getItem("@token");
  const { reduxToken } = useSelector((state) => state.user);
  const regions = useSelector((state) => state.category.regions);
  const { regionsLoading } = useSelector((state) => state.category);
  const regions_sub = useSelector((state) => state.category.regions_sub);
  // const { loading } = useSelector((state) => state.category);
  const contentRegion = window.localStorage.getItem("Content-region");
  const contentRegionName = window.localStorage.getItem("Content-region-name");
  // const regionId = regions.find((item) => item.id === Number(contentRegion));

  const handleLogout = () => {
    if (window.confirm("Вы точно хотите выйти?") === true) {
      dispatch(logout());
      navigate("/");
    }
  };

  const [errorModal, setErrorModal] = useState(false);
  // REGION MODAL
  const [regionModal, setRegionModal] = useState(false);
  const handleOpenRegionModal = () => setRegionModal(true);
  const handleCloseRegionModal = () => setRegionModal(false);

  const [selectedRegion, setSelectedRegion] = useState();
  const [selectedRegionName, setSelectedRegionName] = useState("");
  // const btcRegions = useSelector((state) => state.btc.btcRegions);
  const btcCities = useSelector((state) => state.btc.btcCities);
  const handleBtcRegion = async (e) => {
    const asd = await e.target.selectedOptions[0].label;
    setSelectedRegion(e.target.value);
    setSelectedRegionName(asd);
  };

  const { toBuy } = useSelector((state) => state.cart);
  useEffect(() => {
    if (toBuy === true) {
      dispatch(getCart());
    }
  }, [toBuy]);

  const { minusCart } = useSelector((state) => state.cart);
  useEffect(() => {
    if (minusCart === true) {
      dispatch(getCart());
    }
  }, [minusCart]);

  const { removeCart } = useSelector((state) => state.cart);
  useEffect(() => {
    if (removeCart === true) {
      dispatch(getCart());
    }
  }, [removeCart]);

  return (
    <>
      <ErrorModal
        showModal={errorModal}
        onClose={() => setErrorModal(false)}
        text="Зарегистрируйте"
      />
      <Modal open={regionModal} onClose={handleCloseRegionModal}>
        <Box style={style}>
          <div className="font-bold text-center text-xl">Выберите регион</div>
          <div className="text-center mt-3 mb-7">Это необходимо при заказе</div>
          <div className="delivery__select flex-col gap-4">
            <select
              onChange={(e) => dispatch(getRegionsSub(Number(e.target.value)))}
              className="select w-full"
            >
              <option value="">Выберите регион</option>
              {regions?.map((item, idx) => (
                <option value={item.id} key={idx}>
                  {item?.name}
                </option>
              ))}
            </select>
            {regions_sub?.length > 0 && (
              <select
                onChange={(e) => {
                  handleBtcRegion(e);
                }}
                className="select w-full"
              >
                <option value="">Выберите город</option>
                {regions_sub?.map((item, idx) => (
                  <option
                    selected={item.bts_city_id == selectedRegion}
                    value={item?.bts_city_id}
                    nameR={item?.name}
                    key={idx}
                  >
                    {item?.name}
                  </option>
                ))}
              </select>
            )}
            {selectedRegion && (
              <button
                onClick={() => {
                  window.localStorage.setItem("Content-region", selectedRegion);
                  window.localStorage.setItem(
                    "Content-region-name",
                    selectedRegionName
                  );
                  window.location.reload();
                }}
                className="text-white rounded py-3"
                style={{ background: "#131E3D" }}
              >
                Сохранить
              </button>
            )}
          </div>
        </Box>
      </Modal>
      <div className="navbar">
        <div className="navbar__nav">
          <MNavbarTop>
            <MContainer>
              <div className="navbar__item">
                <div className="nav__item">
                  <span className="nav__item__location">
                    <HiLocationMarker
                      size={14}
                      color="#131e3d"
                      className="nav__item__location__icons"
                    />
                    {regionsLoading ? (
                      <Skeleton width={120} height="100%" />
                    ) : (
                      <div
                        className="cursor-pointer"
                        onClick={handleOpenRegionModal}
                      >
                        {contentRegionName
                          ? contentRegionName
                          : "Выбрать регион"}
                      </div>
                      // <select
                      //   onChange={(e) => {
                      //     // window.localStorage.removeItem("Content-region");
                      //     window.localStorage.setItem(
                      //       "Content-region",
                      //       e.target.value
                      //     );
                      //     window.location.reload();
                      //   }}
                      // >
                      //   <option
                      //     className="disables-region"
                      //     value={contentRegion}
                      //   >
                      //     {regionId?.name}
                      //   </option>
                      //   {regions?.map((region, idx) => (
                      //     <option key={idx} value={region.id}>
                      //       {region.name}
                      //     </option>
                      //   ))}
                      // </select>
                    )}
                    <MLink to="/seller" className="nav__item__delivery__info">
                      {language === "ru" && "Продавайте на Birmakon"}
                      {language === "uz" && "Birmakonda soting"}
                      {language === "en" && "Sell on Birmakon"}
                    </MLink>
                    <MLink
                      to="/deliveries"
                      className="nav__item__delivery__info"
                    >
                      {language === "ru" && "Доставка"}
                      {language === "uz" && "Yetkazib berish"}
                      {language === "en" && "Delivery"}
                    </MLink>
                    {callCenterLoading ? (
                      <Skeleton
                        width={160}
                        height="100%"
                        style={{ marginLeft: "16px" }}
                      />
                    ) : (
                      <div className="ml-4">
                        {language === "ru" && "Call-центр: "}
                        {language === "uz" && "Qo'ng'iroq-markazi: "}
                        {language === "en" && "Call-center: "}
                        {call_center?.content}
                      </div>
                    )}
                  </span>
                </div>
                <div className="nav__item">
                  <div className="nav__item__language flex align-items-center">
                    <div className="relative">
                      <IconButton onClick={handleNotification} sx={{ p: 0 }}>
                        {newNotifications?.length > 0 ? (
                          <Badge color="error" variant="dot">
                            <IoIosNotificationsOutline size={26} />
                          </Badge>
                        ) : (
                          <IoIosNotificationsOutline size={26} />
                        )}
                      </IconButton>
                      {notification ? (
                        <div
                          className="notification__dropdown"
                          style={{ opacity: "1", visibility: "inherit" }}
                        >
                          <div className="not-title mt-4">Уведомление</div>
                          <div className="not-tabs py-2">
                            <div
                              className={`not__tab mr-2 ${
                                activeNot1 ? "active" : null
                              }`}
                              onClick={handleNot1}
                            >
                              Все
                            </div>
                            <div
                              className={`not__tab mr-2 ${
                                activeNot2 ? "active" : null
                              }`}
                              onClick={handleNot2}
                            >
                              Непрочитанные
                            </div>
                          </div>
                          {activeNot1 ? (
                            <div>
                              <div className="flex items-center justify-between py-2">
                                <div className="subtitle">Новые</div>
                                <span className="subtitle">Все</span>
                              </div>
                              {notifications?.length < 1 && "Нет уведомление"}
                              {notifications?.map((not, idx) => (
                                <div
                                  key={idx}
                                  className="notification__link flex py-2"
                                >
                                  <div className="not__img">
                                    <img
                                      src={notificationImg}
                                      alt="not found"
                                    />
                                  </div>
                                  <div className="not__text">
                                    <b>
                                      {not.name} {not.lastname}
                                    </b>
                                    <span>
                                      отправил сообщение: "{not.message}"
                                    </span>
                                    <div className="notification__time">
                                      {not.date}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : null}
                          {activeNot2 ? (
                            <div>
                              <div className="flex items-center justify-between py-2">
                                <div className="subtitle">Новые</div>
                                <span className="subtitle">Непрочитанные</span>
                              </div>
                              {newNotifications?.length < 1 &&
                                "Нет уведомление"}
                              {newNotifications?.map((news, idx) => (
                                <a
                                  key={idx}
                                  href={`/notification/type=readed/` + news.id}
                                  onClick={() => {
                                    handleNotification();
                                    dispatch(setReaded({ id: news.id }));
                                  }}
                                  className="notification__link flex py-2"
                                >
                                  <div className="not__img">
                                    <img
                                      src={notificationImg}
                                      alt="not found"
                                    />
                                  </div>
                                  <div className="not__text new">
                                    <b>
                                      {news.name} {news.lastname}
                                    </b>
                                    <span>
                                      отправил сообщение: "{news.message}"
                                    </span>
                                    <div className="notification__time">
                                      {news.date}
                                    </div>
                                  </div>
                                </a>
                              ))}
                            </div>
                          ) : null}
                        </div>
                      ) : (
                        <div
                          className="notification__dropdown"
                          style={{ opacity: "0", visibility: "hidden" }}
                        ></div>
                      )}
                    </div>
                    <select
                      onChange={(e) => {
                        // setCurrency(e.target.value);
                        window.localStorage.removeItem("Content-currency");
                        window.localStorage.setItem(
                          "Content-currency",
                          e.target.value
                        );
                        window.location.reload();
                      }}
                      className="ml-4 lowercase currency-select"
                    >
                      <option
                        className="disables-currency"
                        value={window.localStorage.getItem("Content-currency")}
                      >
                        {window.localStorage.getItem("Content-currency")}
                      </option>
                      <option value="sum">сум</option>
                      <option value="dollar">У.е</option>
                    </select>
                    <select
                      className="ml-4"
                      onChange={(e) => {
                        window.localStorage.removeItem("Content-language");
                        window.localStorage.setItem(
                          "Content-language",
                          e.target.value
                        );
                        window.location.reload();
                      }}
                    >
                      <option
                        className="disables-currency"
                        value={window.localStorage.getItem("Content-language")}
                      >
                        {window.localStorage.getItem("Content-language")}
                      </option>
                      <option value="ru">ru</option>
                      <option value="en">en</option>
                      <option value="uz">uz</option>
                    </select>
                  </div>
                </div>
              </div>
            </MContainer>
          </MNavbarTop>
          <MNavbar
            positionFixed={fixedNavbar}
            positionFixedResponse={fixedNavbarResponse}
            className="relative"
          >
            <MContainer>
              <div className="navbar__item__global">
                <div className="nav__item__brand">
                  <MLink to="/">
                    <div className="nav__logo">
                      <img src={Logo} alt="Birmakon" />
                    </div>
                  </MLink>
                  <div onClick={handleSelected} className="nav__item__category">
                    {openCategory ? (
                      <IoMdClose size={20} />
                    ) : (
                      <BiCategoryAlt size={20} />
                    )}
                    <div className="px-2">
                      {language === "ru" && "Категории"}
                      {language === "uz" && "Kategoriya"}
                      {language === "en" && "Category"}
                    </div>
                    <IoMdArrowDropdown size={20} />
                    {openCategory ? (
                      <div
                        className="nav__category__menu"
                        style={{ opacity: "1", visibility: "inherit" }}
                      >
                        <MContainer className="category-container">
                          <div className="nav-categories">
                            <Link to="/filter/0" className="flex items-center">
                              Все категории
                            </Link>
                            {strAscending?.map((category, index) => (
                              <div
                                key={index}
                                // to={`/filter/` + category.id}
                                onMouseEnter={() =>
                                  dispatch(getSubCategoriesAll(category.id))
                                }
                                className="flex items-center"
                              >
                                {/* <img
                                  src={`${URL}/${category.photo}`}
                                  className="mr-3"
                                /> */}
                                {category.name}
                              </div>
                            ))}
                          </div>
                          <div className="nav-sub-categories">
                            {subCategory?.map((item, idx) => (
                              <div key={idx} className="sub-box">
                                {subCategoryLoading ? (
                                  <>
                                    <Skeleton
                                      width={"90%"}
                                      style={{ marginBottom: "0.5rem" }}
                                    />
                                    <Skeleton
                                      width={"90%"}
                                      style={{ marginBottom: "0.5rem" }}
                                    />
                                    <Skeleton
                                      width={"90%"}
                                      style={{ marginBottom: "0.5rem" }}
                                    />
                                  </>
                                ) : (
                                  <>
                                    <Link
                                      to={`/filter/${item.id}`}
                                      className="sub-box-title"
                                    >
                                      {item?.name}
                                    </Link>
                                    {item?.childs?.map((child, idx) => (
                                      <Link
                                        className="sub-box-child"
                                        to={`/filter/${child.id}`}
                                      >
                                        {child?.name}
                                      </Link>
                                    ))}
                                  </>
                                )}
                              </div>
                            ))}
                          </div>
                        </MContainer>
                      </div>
                    ) : (
                      <div
                        className="nav__category__menu flex flex-col absolute"
                        style={{ opacity: "0", visibility: "hidden" }}
                      ></div>
                    )}
                  </div>
                </div>
                {openCategory && (
                  <div
                    onClick={() => setOpenCategory(false)}
                    style={{ zIndex: "9" }}
                    className="fixed top-0 right-0 bottom-0 left-0 h-full w-full"
                  ></div>
                )}
                <div className="nav__item__search ml-8">
                  <div className="relative flex search__input">
                    <select
                      onChange={(e) => setFilterSearch(e.target.value)}
                      className="search__select"
                    >
                      <option value="1">По товару</option>
                      <option value="2">По продавцам</option>
                    </select>

                    <input
                      type="search"
                      onChange={(e) => {
                        let newFilter = {
                          ...filterProduct,
                          query: e.target.value,
                        };
                        window.localStorage.setItem(
                          "search-product",
                          e.target.value
                        );
                        setFilterProduct(newFilter);
                        dispatch(getProductSearch(newFilter));
                      }}
                      onKeyPress={
                        (e: KeyboardEvent<HTMLDivElement>) =>
                          e.key == "Enter" && navigate("/search/product")
                        // (navigate("/search/product"),
                        // dispatch(getShopsByFilter(filterProduct)))
                      }
                      className={`${
                        filterSearch == "1" ? "block" : "hidden"
                      } po-product py-2 w-full text-sm text-white rounded-md pl-4 pr-8 text-gray-900`}
                      placeholder="Я ищу..."
                    />
                    <input
                      type="search"
                      onChange={(e) => {
                        let newFilter = {
                          ...filterShop,
                          query: e.target.value,
                        };
                        setFilterShop(newFilter);
                        dispatch(getShopsByFilter(newFilter));
                      }}
                      onKeyPress={(e: KeyboardEvent<HTMLDivElement>) =>
                        e.key == "Enter" && navigate("/search/shop")
                      }
                      className={`${
                        filterSearch == "2" ? "block" : "hidden"
                      } po-user py-2 w-full text-sm text-white rounded-md pl-4 pr-8 text-gray-900`}
                      placeholder="Я ищу..."
                    />
                    <span
                      onClick={() => {
                        navigate(
                          `${
                            filterSearch === "1"
                              ? "/search/product"
                              : "/search/shop "
                          }`
                        );
                        setOpenMenuSearch(false);
                      }}
                      className="flex items-center justify-center pr-2"
                    >
                      <IoIosSearch
                        className="hover:fill-slate-500 cursor-pointer"
                        size={26}
                      />
                    </span>
                    <div className="search__category">
                      {filterSearch === "1"
                        ? productFelter?.map((product, idx) => (
                            <Link
                              to={`/add/` + product.id}
                              onClick={() => setOpenMenuSearch(false)}
                              key={idx}
                              className="search__text"
                            >
                              <img src={URL + product.photo} alt="" />
                              {product.name}
                              <span>
                                {product.price} {product?.currency?.name}
                              </span>
                            </Link>
                          ))
                        : shopFilter?.map((shop, idx) => (
                            <Link
                              to={`/selleradres/` + shop.id}
                              onClick={() => setOpenMenuSearch(false)}
                              key={idx}
                              className="search__text"
                            >
                              <img src={URL + shop.photo} alt="" />
                              {shop.name}
                            </Link>
                          ))}
                    </div>
                  </div>
                </div>
                <div className="nav__item__icons ml-6">
                  <MLink exact to={"/compare"}>
                    <MNav
                      className={`nav__router__link ${splitLocation[1]} === "" ? "active" : ""`}
                    >
                      <BiGitCompare size={28} />
                      <span>
                        {language === "ru" && "Сравнить"}
                        {language === "uz" && "Solishtirma"}
                        {language === "en" && "Compare"}
                      </span>
                    </MNav>
                  </MLink>
                  <MLink to={"/selected"}>
                    <MNav
                      className={`nav__router__link ${splitLocation[1]} === "star" ? "active" : ""`}
                    >
                      <Badge
                        badgeContent={favoriteList?.length}
                        className="!mt-0"
                        color="error"
                      >
                        {shop_favoriteList?.length > 0 ? (
                          <Badge
                            style={{ marginTop: "0", padding: "0 !important" }}
                            anchorOrigin={{
                              vertical: "top",
                              horizontal: "left",
                            }}
                            badgeContent={<BiUserCheck fill="#fff" size={14} />}
                            color="error"
                          ></Badge>
                        ) : null}
                        <BsSuitHeartFill size={28} />
                      </Badge>
                      <span>
                        {language === "ru" && "Избранные"}
                        {language === "uz" && "Sevimlilar"}
                        {language === "en" && "Favorites"}
                      </span>
                    </MNav>
                  </MLink>
                  <MLink onClick={() => dispatch(getCart())} to={"/basket"}>
                    <MNav
                      className={`nav__router__link ${splitLocation[1]} === "product" ? "active" : ""`}
                    >
                      <Badge
                        badgeContent={cartList?.length}
                        className="!mt-0"
                        color="error"
                      >
                        <ImCart size={28} />
                      </Badge>
                      <span>
                        {language === "ru" && "Корзина"}
                        {language === "uz" && "Savatcha"}
                        {language === "en" && "Basket"}
                      </span>
                    </MNav>
                  </MLink>

                  <div className="infopage_link relative">
                    <MNav
                      className={`nav__router__link ${
                        splitLocation[1] === "profile" ? "active" : ""
                      } nav__item__icon__rigth`}
                      onClick={() => {
                        if (reduxToken) {
                          navigate("/info");
                        } else {
                          setErrorModal(true);
                        }
                      }}
                    >
                      <FaUserAlt size={28} />
                      <span>{user?.name || "Войти"}</span>
                    </MNav>
                    {reduxToken && (
                      <div className="openProfile">
                        <div className="profile__dropdown">
                          <Link to="/cabinet" className="profile__header">
                            <div
                              className="profile__image"
                              style={{ width: "25px" }}
                            >
                              {user?.photo ? (
                                <img
                                  src={`${URL}${user?.photo}`}
                                  alt=""
                                  className=""
                                  style={{
                                    borderRadius: "50%",
                                    minWidth: "25px",
                                    height: "25px",
                                  }}
                                />
                              ) : (
                                <img
                                  src="https://admin.birmakon.uz//assets_files/images/user.png"
                                  alt=""
                                />
                              )}
                            </div>
                            <div className="profile__title">
                              {user?.name || "Нету данных"}
                            </div>
                          </Link>
                          <div className="profile__bottom">
                            <ul className="profile__ul">
                              <li className="profile__item">
                                <Link to="/deliverycart">
                                  <AiOutlineRight />
                                  Мои заказы
                                </Link>
                              </li>
                              <li className="profile__item">
                                <Link to="/payments">
                                  <AiOutlineRight />
                                  Мои платежи
                                </Link>
                              </li>
                              <li className="profile__item">
                                <Link to="/message">
                                  <AiOutlineRight />
                                  Мои сообщения
                                </Link>
                              </li>
                              <li className="profile__item">
                                <Link to="/contract">
                                  <AiOutlineRight />
                                  Мои договора
                                </Link>
                              </li>
                              <li className="profile__item">
                                <Link to="/selected">
                                  <AiOutlineRight />
                                  Избранные товара
                                </Link>
                              </li>
                              <li className="profile__item">
                                <Link to="/info">
                                  <AiOutlineRight />
                                  Мои данные
                                </Link>
                              </li>
                              {reduxToken ? (
                                <li
                                  className="profile__item"
                                  onClick={handleLogout}
                                >
                                  <AiOutlineRight />
                                  Выйти
                                </li>
                              ) : (
                                <li className="profile__item">
                                  <Link to="/firstregister">
                                    <AiOutlineRight />
                                    Войти
                                  </Link>
                                </li>
                              )}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="navbar__menu__inner">
                  <IconButton
                    style={{ padding: "0" }}
                    onClick={() => {
                      if (reduxToken) {
                        openProfileMenuFun(true);
                      } else {
                        setErrorModal(true);
                      }
                    }}
                  >
                    <FaRegUser className="menu__inner__icons" size={28} />
                  </IconButton>
                  <Link to="/basket">
                    <AiOutlineShopping
                      className="menu__inner__icons"
                      size={34}
                    />
                  </Link>
                  <IconButton
                    onClick={() => setOpenMenuSearch(true)}
                    style={{ padding: "0" }}
                  >
                    <FiSearch className="menu__inner__icons" size={32} />
                  </IconButton>
                  <IconButton
                    style={{ padding: "0" }}
                    onClick={() => openMenuMobile(true)}
                  >
                    <FiMenu className="menu__inner__icons" size={36} />
                  </IconButton>
                </div>
              </div>
            </MContainer>
          </MNavbar>
        </div>
      </div>
      {notification ? (
        <div
          onClick={handleNotification}
          className="w-full h-full fixed top-0 bottom-0"
          style={{ zIndex: "999" }}
        ></div>
      ) : null}
      {uopenMenuMobile ? (
        <div
          className={`uopenMenuMobile ${uopenMenuMobile ? "open" : ""}`}
          style={{ opacity: "1", visibility: "inherit", top: "0px" }}
        >
          <IconButton
            style={{ padding: "0" }}
            className="uopenMenuMobile-close-icon absolute"
            onClick={() => openMenuMobile(false)}
          >
            <IoIosClose fill="#fff" size={32} />
          </IconButton>
          <ul>
            {navCategoryList.map((category, index) => (
              <li>
                <Link
                  to={`/category/${category.id}`}
                  onClick={() => openMenuMobile(false)}
                  key={index}
                >
                  <img src={`${URL}/${category.photo}`} className="mr-3" />
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div
          className={`uopenMenuMobile`}
          style={{ opacity: "0", visibility: "hidden", top: "-30px" }}
        ></div>
      )}
      {openProfileMenu ? (
        <div
          className={`openProfileMenu ${openProfileMenu ? "open" : ""}`}
          style={{ opacity: "1", visibility: "inherit", top: "0px" }}
        >
          <IconButton
            style={{ padding: "0" }}
            className="openProfileMenu-close-icon absolute"
            onClick={() => openProfileMenuFun(false)}
          >
            <IoIosClose fill="#fff" size={32} />
          </IconButton>
          <ul>
            <li onClick={() => openProfileMenuFun(false)}>
              <Link to="/deliverycart">Мои заказы</Link>
            </li>
            <li onClick={() => openProfileMenuFun(false)}>
              <Link to="/payments">Мои платежи</Link>
            </li>
            <li onClick={() => openProfileMenuFun(false)}>
              <Link to="/message">Мои сообщения</Link>
            </li>
            <li onClick={() => openProfileMenuFun(false)}>
              <Link to="/contract">Мои договора</Link>
            </li>
            <li onClick={() => openProfileMenuFun(false)}>
              <Link to="/selected">Избранные товара</Link>
            </li>
            <li onClick={() => openProfileMenuFun(false)}>
              <Link to="/info">Мои данные</Link>
            </li>
            {reduxToken ? (
              <li className="text-white" onClick={handleLogout}>
                Выйти
              </li>
            ) : (
              <li className="!p-0" onClick={() => openProfileMenuFun(false)}>
                <Link to="/firstregister">Войти</Link>
              </li>
            )}
          </ul>
        </div>
      ) : (
        <div
          className={`openProfileMenu`}
          style={{ opacity: "0", visibility: "hidden", top: "-30px" }}
        ></div>
      )}
      {openMenuSearch ? (
        <div
          className={`search-menu-mobile ${
            openMenuSearch ? "search-open" : ""
          }`}
          style={{ opacity: "1", visibility: "inherit", top: "0px" }}
        >
          <IconButton
            style={{ padding: "0" }}
            className="search-menu-mobile-close-icon absolute"
            onClick={() => setOpenMenuSearch(false)}
          >
            <IoIosClose fill="#fff" size={32} />
          </IconButton>
          <div className={`nav__item__search ml-8`}>
            <div className="relative flex search__input">
              <select
                onChange={(e) => setFilterSearch(e.target.value)}
                className="search__select"
              >
                <option value="1">По товару</option>
                <option value="2">По продавцам</option>
              </select>
              <input
                type="search"
                onChange={(e) => {
                  let newFilter = {
                    ...filterProduct,
                    query: e.target.value,
                  };
                  window.localStorage.setItem("search-product", e.target.value);
                  setFilterProduct(newFilter);
                  dispatch(getProductSearch(newFilter));
                }}
                onKeyPress={
                  (e: KeyboardEvent<HTMLDivElement>) =>
                    e.key == "Enter" && navigate("/search/product")
                  // (navigate("/search/product"),
                  // dispatch(getShopsByFilter(filterProduct)))
                }
                className={`${
                  filterSearch == "1" ? "!block" : "!hidden"
                } po-product py-2 w-full text-sm text-white rounded-md pl-4 pr-8 text-gray-900`}
                placeholder="Я ищу..."
              />
              <input
                type="search"
                onChange={(e) => {
                  let newFilter = {
                    ...filterShop,
                    query: e.target.value,
                  };
                  setFilterShop(newFilter);
                  dispatch(getShopsByFilter(newFilter));
                }}
                onKeyPress={(e: KeyboardEvent<HTMLDivElement>) =>
                  e.key == "Enter" && navigate("/search/shop")
                }
                className={`${
                  filterSearch == "2" ? "!block" : "!hidden"
                } po-user py-2 w-full text-sm text-white rounded-md pl-4 pr-8 text-gray-900`}
                placeholder="Я ищу..."
              />
              <span
                onClick={() => {
                  navigate(
                    `${
                      filterSearch === "1" ? "/search/product" : "/search/shop "
                    }`
                  );
                  setOpenMenuSearch(false);
                }}
                className="flex items-center justify-center pr-2"
              >
                <IoIosSearch
                  fill="#717171"
                  className="hover:fill-slate-700 cursor-pointer"
                  size={26}
                />
              </span>
              <div className="search__category">
                {filterSearch === "1"
                  ? productFelter?.map((product, idx) => (
                      <Link
                        to={`/add/` + product.id}
                        onClick={() => setOpenMenuSearch(false)}
                        key={idx}
                        className="search__text"
                      >
                        <img src={URL + product.photo} alt="" />
                        {product.name}
                        <span>
                          {product.price} {product?.currency?.name}
                        </span>
                      </Link>
                    ))
                  : shopFilter?.map((shop, idx) => (
                      <Link
                        to={`/selleradres/` + shop.id}
                        onClick={() => setOpenMenuSearch(false)}
                        key={idx}
                        className="search__text"
                      >
                        <img src={URL + shop.photo} alt="" />
                        {shop.name}
                      </Link>
                    ))}
                {/* {productFelter.map((product, idx) => (
                  <Link
                    key={idx}
                    to={`/add/${product.id}`}
                    onClick={() => setOpenMenuSearch(false)}
                    className="search__text"
                  >
                    <img src={URL + product.photo} alt="" />
                    {product.name}
                    <span>{product.price}</span>
                  </Link>
                ))} */}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={`search-menu-mobile`}
          style={{ opacity: "0", visibility: "hidden", top: "-30px" }}
        ></div>
      )}
    </>
  );
};

export default Navbar;
