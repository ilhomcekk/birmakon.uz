import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MContainer } from "../../element/Elemens";
import "../../assets/scss/_add.scss";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { ProgressBarLine } from "react-progressbar-line";
import { MdFavoriteBorder, MdFavorite, MdViewInAr } from "react-icons/md";
import Title from "../../component/Title/Title";
import { Navigation, Pagination, Scrollbar, A11y, Lazy } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/lazy";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import "../../assets/scss/_modal-delivery.scss";
import { useDispatch, useSelector } from "react-redux";
import ReactStars from "react-rating-stars-component";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/scss/image-gallery.scss";
import {
  getProductOne,
  getUnit,
  relatedProducts,
} from "../../redux/actions/productActions";
import {
  getCart,
  getCommentFilterWithDate,
  getCommentFilterWithRate,
  getComments,
  postCartAdd,
} from "../../redux/actions/cartActions";
import { Cart } from "../../component/Cart/Cart";
import Shop from "../../component/Shop/Shop";
import { addCompare, compareList } from "../../redux/actions/compareActions";
import { createFavorite } from "../../redux/actions/favoriteActions";
import ProductsViewed from "../../component/ProductsViewed/ProductsViewed";
import { getRegions } from "../../redux/actions/categoryActions";
import parse from "html-react-parser";
import { IconButton, Tooltip } from "@mui/material";
import PreLoader from "../../component/PreLoader/PreLoader";
import { BsChevronDown, BsFillCartCheckFill } from "react-icons/bs";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ErrorModal from "../../component/ErrorModal/ErrorModal";
import { ProductOrderLoading } from "../../component/loading/ProductOrderLoading";
import { toast } from "react-toastify";
import { AiOutlineMessage } from "react-icons/ai";
import { chatMarkets, clearChat } from "../../redux/actions/userActions";

// const API = `${process.env.REACT_APP_API_DOMAIN}`;
// const language = window.localStorage.getItem("Content-language");
const currency = window.localStorage.getItem("Content-currency");

const style = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: "80%",
  height: "80%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Add = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [review, setReview] = useState("");
  // const [rate, setRate] = useState("");

  const [currencyState, setCurrencyState] = useState("");
  useEffect(() => {
    if (currency === "sum") {
      setCurrencyState("сум");
    }
    if (currency === "dollar") {
      setCurrencyState("у.е");
    }
  }, []);

  useEffect(() => {
    dispatch(getProductOne(id));
    dispatch(relatedProducts(id));
    dispatch(compareList(id));
    dispatch(getRegions());
    dispatch(getComments(id));
    dispatch(getUnit());
    dispatch(chatMarkets());
  }, [id]);

  const [open2, setOpen2] = React.useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);

  // const [showModal, setShowModal] = useState(false);
  const [sortComment, setSortComment] = useState();

  const productOne = useSelector((state) => state.product.data);
  const { oneProductLoading } = useSelector((state) => state.product);
  const { loading3 } = useSelector((state) => state.cart);
  const [favorite, setFavorite] = useState(productOne?.shop?.isFavorite);
  const comments = useSelector((state) => state.cart.commentList);
  const related_products = useSelector(
    (state) => state.product.related_products
  );
  const desc = String(productOne?.description);
  const comp = String(productOne?.composition);

  let [sizesArr, setSizesArr] = useState();
  let [currentSizeId, setCurrentSizeId] = useState();
  const handleSizes = async () => {
    const sizes = await productOne?.filters?.find((item) => {
      return item.name === "Размер";
    });
    return setSizesArr(sizes);
  };
  handleSizes();

  const [openModal, setOpenModal] = useState(false);
  const [rating, setRating] = useState(productOne?.rating);
  const ratingAsync = async () => {
    await productOne?.rating;
    if (productOne?.rating !== null && productOne?.rating !== undefined) {
      setRating(productOne?.rating);
    }
  };

  // const ratingChanged = (newRating) => {
  //   setRate(newRating);
  // };
  const [slice, setSlice] = useState(5);
  const handleSlice = (e) => {
    setSlice(e);
  };
  const [detailCount, setDetailCount] = useState(1);
  const min = 1;
  const max = productOne?.amount;
  const [reviewsSlice, setReviewsSlice] = useState(3);
  const handleCounter = (e) => {
    const value = Math.max(min, Math.min(max, Number(e.target.value)));
    setDetailCount(value);
    if (value === max) {
      toast.info(`Всего ${max} товаров`);
    }
  };
  const handleReviewSlice = (e) => {
    setReviewsSlice(e);
  };
  const minusCounter = (value) => {
    if (detailCount <= 1) {
    } else {
      setDetailCount(value - 1);
    }
  };
  const plusCounter = (value) => {
    setDetailCount(value + 1);
  };
  // const colorPhoto = productOne.products?.find((item, index) => index === 0);
  // const bgColorName = productOne?.color?.color;
  let gallery = [];

  const galleryImage = async () => {
    await productOne?.gallery?.forEach((item) => {
      gallery.push({
        original: `https://admin.birmakon.uz${item}`,
        thumbnail: `https://admin.birmakon.uz${item}`,
      });
    });
  };

  const colorImage = async () => {
    await productOne?.products?.forEach((color) => {
      gallery.push({
        original: `https://admin.birmakon.uz${color.photo}`,
        thumbnail: `https://admin.birmakon.uz${color.photo}`,
      });
    });
  };

  galleryImage();
  colorImage();
  const { reduxToken } = useSelector((state) => state.user);
  const [showErrorModal1, setShowErrorModal1] = useState(false);
  const [showErrorModal2, setShowErrorModal2] = useState(false);
  const [showErrorModal3, setShowErrorModal3] = useState(false);
  const [showErrorModal4, setShowErrorModal4] = useState(false);
  const favorites = useSelector((state) => state.favorite.favoritiesList);
  const favoritesId = favorites?.map((item) => item.id);
  const [favoriteAdd, setFavoriteAdd] = useState(false);
  useEffect(() => {
    if (favoritesId?.includes(+productOne.id)) {
      setFavoriteAdd(true);
    } else {
      setFavoriteAdd(false);
    }
  }, [favorites, favoritesId]);

  let oneRating =
    productOne.reviews_count === 0 ? 0 : 100 / productOne.reviews_count;

  const cartList = useSelector((state) => state.cart.list);
  let cartListIdArray = [];
  let cartListId = cartList?.map((item) => {
    return item?.cart?.map((subItem) => {
      return cartListIdArray.push(subItem?.product?.id);
    });
  });
  const [inCart, setInCart] = useState(false);
  useEffect(() => {
    if (
      cartListIdArray?.length > 0 &&
      cartListIdArray?.includes(+productOne?.id)
    ) {
      setInCart(true);
    } else {
      setInCart(false);
    }
  }, [cartList, cartListId, cartListIdArray]);

  const [showErrorModal10, setShowErrorModal10] = useState(false);
  const [showErrorModal11, setShowErrorModal11] = useState(false);

  const chatMarketsList = useSelector((state) => state.user.chatMarkets);
  const [chatId, setChatId] = useState("");
  const handleChatId = async () => {
    const obj = await chatMarketsList?.find((item) => {
      return item?.user_id === productOne?.user?.id;
    });
    if (obj) {
      setChatId(obj);
    } else {
      setChatId("");
    }
  };
  useEffect(() => {
    handleChatId();
  }, [chatMarketsList, id]);

  return (
    <>
      <ErrorModal
        showModal={showErrorModal1}
        onClose={() => setShowErrorModal1(false)}
        text="Зарегистрируйте чтобы добавить в избранную"
      />
      <ErrorModal
        showModal={showErrorModal2}
        onClose={() => setShowErrorModal2(false)}
        text="Зарегистрируйте чтобы добавить в корзину"
      />
      <ErrorModal
        showModal={showErrorModal3}
        onClose={() => setShowErrorModal3(false)}
        text="Зарегистрируйте чтобы написать"
      />
      <ErrorModal
        showModal={showErrorModal4}
        onClose={() => setShowErrorModal4(false)}
        text="Зарегистрируйте чтобы сравнивать"
      />
      <div className="add-product pb-12" key={id}>
        {/* {loading && (
          <PreLoader
            absolute="absolute"
            background="#fff"
            top="0"
            right="0"
            bottom="0"
            left="0"
            height="-webkit-fill-available"
            margin="auto"
          />
        )} */}
        <MContainer>
          <Link to="/">Главная страница / </Link>
          {productOne?.category_full_array &&
            productOne?.category_full_array?.map((item, idx) => (
              <Link key={idx} to={`/filter/${item?.id}`}>
                {item.name} /{" "}
              </Link>
            ))}
        </MContainer>
        {!oneProductLoading ? (
          <>
            <MContainer>
              <div
                className="product-list mt-4"
                style={{
                  background: "#f8f8fa",
                  padding: "30px",
                  width: "100%",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                }}
              >
                <div
                  className="product__img relative mr-8"
                  style={{
                    disply: "flex",
                  }}
                >
                  <div
                    className="relative"
                    style={{ width: "-webkit-fill-available" }}
                  >
                    {gallery?.length > 0 && (
                      <IconButton
                        className="!absolute top-0 right-0 media-none-modal"
                        style={{ zIndex: "2", background: "#ee4927" }}
                      >
                        <MdViewInAr
                          onClick={() => setOpenModal(true)}
                          style={{ zIndex: "2" }}
                          size={32}
                        />
                      </IconButton>
                    )}
                    <div
                      onClick={() => setOpenModal(false)}
                      className={`${
                        openModal ? "fixed" : "hidden"
                      } top-0 right-0 bottom-0 left-0`}
                      style={{ background: "rgba(0,0,0,0.5)", zIndex: "99999" }}
                    ></div>
                    <div
                      onClick={() => setOpenModal(true)}
                      className={`${
                        openModal ? "block" : "hidden"
                      } fixed h-3/5 w-3/5 mx-auto top-0 left-0 right-0 bg-white`}
                      style={{
                        transform: "translate(0%,50%)",
                        zIndex: "999999",
                      }}
                    >
                      <Swiper
                        modules={[
                          Navigation,
                          Pagination,
                          Scrollbar,
                          A11y,
                          Lazy,
                        ]}
                        spaceBetween={10}
                        slidesPerView={1}
                        navigation
                        loop
                        pagination={{ clickable: true }}
                        lazy={true}
                        style={{ height: "-webkit-fill-available" }}
                      >
                        {gallery.map((slider, index) => (
                          <SwiperSlide key={index} style={{ height: "80%" }}>
                            <img
                              data-src={`${slider.original}`}
                              alt=""
                              style={{ height: "-webkit-fill-available" }}
                              className="swiper-lazy !object-contain"
                            />
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </div>
                    <ImageGallery
                      items={gallery}
                      autoPlay={true}
                      showPlayButton={false}
                      showBullets={false}
                      showFullscreenButton={false}
                    />
                  </div>
                  {gallery.length < 1 && (
                    <img
                      src="https://admin.birmakon.uz//assets_files/images/no-photo.png"
                      alt=""
                    />
                  )}
                  {/* <slide-mobile className="mobile__slide" /> */}
                  {/* <div className="loader__blur">
								<div className="loader__into">
									<div>
										<Loader />
									</div>
								</div>
							</div> */}
                </div>
                <div className="product__information">
                  <div className="cart-justify-block">
                    <div
                      className="cart-justify"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "20px",
                          }}
                          className="stars-block"
                        >
                          <div className="stars">
                            <ReactStars
                              edit={false}
                              count={5}
                              size={24}
                              activeColor="#ffd700"
                              value={rating}
                              onChange={ratingAsync()}
                            />
                          </div>
                          <div className="comment">
                            <div>{productOne?.reviews?.length} отзывов</div>
                          </div>
                        </div>
                        <h1
                          style={{
                            color: "#434343",
                            textTransform: "uppercase",
                            fontWeight: "700",
                          }}
                          className="add-cart-name"
                        >
                          {productOne?.name}
                        </h1>
                      </div>
                      {favoriteAdd === true ? (
                        <Tooltip title="Удалить из корзины" placement="top">
                          <Button className="add-cart-heart">
                            <MdFavorite
                              onClick={() => {
                                if (!reduxToken) {
                                  setShowErrorModal1(true);
                                } else {
                                  dispatch(
                                    createFavorite({
                                      product_id: productOne?.id,
                                    })
                                  );
                                }
                              }}
                              size={32}
                            />
                          </Button>
                        </Tooltip>
                      ) : (
                        <Tooltip title="Добавить в корзину" placement="top">
                          <Button className="add-cart-heart">
                            <MdFavoriteBorder
                              onClick={() => {
                                if (!reduxToken) {
                                  setShowErrorModal1(true);
                                } else {
                                  dispatch(
                                    createFavorite({
                                      product_id: productOne?.id,
                                    })
                                  );
                                }
                              }}
                              size={32}
                            />
                          </Button>
                        </Tooltip>
                      )}
                    </div>
                  </div>
                  <div className="product__about">
                    <div className="product__price">
                      {productOne?.price?.toLocaleString("ru-RU")}{" "}
                      {/* {productOne?.currency?.name} */}
                      {currencyState}
                      <span>
                        {productOne.price_old &&
                          productOne.price_old?.toLocaleString("ru-RU") +
                            currencyState}
                      </span>
                    </div>
                    <div className="min__max-price">
                      <p>
                        {productOne.count_price1
                          ? "от " + productOne.count_price1
                          : null}
                        {productOne.count_price2
                          ? " до " + productOne.count_price2
                          : null}
                        {productOne.unit?.name} -{" "}
                        {productOne.price_opt_small?.toLocaleString("de-DE")}{" "}
                        {/* {productOne?.currency?.name} */}
                        {currencyState}
                      </p>
                      <p>
                        {productOne.count_price2
                          ? "от " +
                            productOne.count_price2?.toLocaleString("de-DE")
                          : null}
                        {productOne.unit?.name} -{" "}
                        {productOne.price_opt &&
                          productOne.price_opt?.toLocaleString("de-DE")}{" "}
                        {/* {productOne?.currency?.name} */}
                        {currencyState}
                      </p>
                    </div>
                  </div>
                  {productOne?.color?.color && (
                    <div className="color__title">Цвет</div>
                  )}
                  <div className="color__boxes mt-2">
                    <div
                      style={{
                        background: productOne?.color?.color,
                        width: "35px",
                        height: "35px",
                      }}
                      className="color__box rounded-full bg-white mt-2 mr-2 cursor-pointer hover:scale-110 !border-2 !border-orange-500"
                    ></div>
                    {productOne?.products?.map((color, idx) => (
                      <Link
                        key={idx}
                        to={`/add/${color.id}`}
                        className="relative color__box rounded-full mt-2 mr-2 hover:scale-110"
                        style={{
                          background: color?.color_code,
                          width: "35px",
                          height: "35px",
                        }}
                      ></Link>
                    ))}
                  </div>
                  {sizesArr?.items?.length > 0 && (
                    <div className="product__size-title">Размер</div>
                  )}
                  <div className="product__size">
                    {sizesArr?.items &&
                      sizesArr?.items?.map((size, idx) => (
                        <div
                          key={idx}
                          onChange={(e) => setCurrentSizeId(e.target.value)}
                          className="radioContainer"
                        >
                          <input
                            defaultChecked={false}
                            value={size.value_id}
                            type="radio"
                            name="radio"
                            id={idx + "productRazmer"}
                          />
                          <label
                            htmlFor={idx + "productRazmer"}
                            className="circle"
                          >
                            {size.value}
                          </label>
                        </div>
                      ))}
                  </div>
                  <div className="mt-4 mb-4">
                    <div className="product__order">
                      <button
                        className="product__increment"
                        onClick={() => {
                          minusCounter(detailCount);
                        }}
                      >
                        -
                      </button>
                      <input
                        value={detailCount}
                        onChange={handleCounter}
                        type="number"
                      />
                      <button
                        className="product__decrement"
                        onClick={() => {
                          plusCounter(detailCount);
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <p
                    className="flex items-center cursor-pointer mb-2"
                    onClick={handleOpen2}
                  >
                    <div className="flex items-center">
                      Информация о доставке{" "}
                      <BsChevronDown className="ml-2" size={22} />
                    </div>
                  </p>
                  <div>
                    <Modal
                      keepMounted
                      open={open2}
                      onClose={handleClose2}
                      aria-labelledby="keep-mounted-modal-title"
                      aria-describedby="keep-mounted-modal-description"
                    >
                      <Box sx={style}>
                        <Typography
                          id="keep-mounted-modal-title"
                          variant="h6"
                          component="h2"
                        >
                          Информация о логистической компании
                        </Typography>
                        <Typography
                          id="keep-mounted-modal-description"
                          sx={{ mt: 2 }}
                        >
                          Логистическая компания - это предприятие, оказывающее
                          услуги по транспортировке, обработке и хранению
                          грузов, содействуя своим клиентам в процессе
                          продвижения товаров от производителя к потребителю.
                          Логистика, как наука, впервые появилась в армии – в
                          интендантской службе. Поскольку конкурентная борьба в
                          современном бизнесе по остроте своей сродни военным
                          действиям, достижения этой науки быстро были
                          восприняты коммерсантами.
                        </Typography>
                      </Box>
                    </Modal>
                  </div>
                  {/* <ModalAddress /> */}
                  <div className="product__buttons mt-4">
                    {/* <Link to="" id="buy">
                  Купить
                </Link> */}
                    {productOne?.amount && productOne?.amount > 0 ? (
                      <button
                        type="submit"
                        className={`${inCart === true && "inCart"}`}
                        id="korzina__button"
                        style={{
                          color: "white",
                          padding: "5px 15px",
                        }}
                        onClick={() => {
                          if (!reduxToken) {
                            setShowErrorModal2(true);
                          } else {
                            if (currentSizeId) {
                              dispatch(
                                postCartAdd({
                                  "filter_value_id[0]": currentSizeId,
                                  product_id: productOne?.id,
                                  amount: detailCount,
                                })
                              );
                            } else {
                              dispatch(
                                postCartAdd({
                                  product_id: productOne?.id,
                                  amount: detailCount,
                                })
                              );
                            }
                            dispatch(getCart());
                          }
                        }}
                      >
                        {inCart === true ? "В корзине" : "В корзину"}
                        {inCart === true && <BsFillCartCheckFill />}
                      </button>
                    ) : (
                      <div
                        className="rounded text-white px-4 py-1 mr-2"
                        style={{ background: "#131E3D" }}
                      >
                        В складе не остался
                      </div>
                    )}
                    <button
                      onClick={() => {
                        if (!reduxToken) {
                          setShowErrorModal4(true);
                        } else {
                          dispatch(addCompare({ product_id: productOne?.id }));
                        }
                      }}
                      id="delete"
                    >
                      Сравнить
                    </button>
                  </div>
                  {/* {productOne?.composition && (
                    <>
                      <div className="mt-4">Кратка о товаре:</div>
                      {parse(comp)}
                    </>
                  )} */}
                  <div className="mt-4">
                    В складе{" "}
                    {productOne?.amount && productOne?.amount > 0
                      ? productOne?.amount + " " + productOne?.unit?.name
                      : "не"}{" "}
                    осталось
                  </div>
                </div>
              </div>
            </MContainer>
          </>
        ) : (
          <ProductOrderLoading />
        )}
        <MContainer>
          <div className="recommended">
            <div className="r__box">
              <Tabs className="mini__page">
                <TabList>
                  <Tab>Описание</Tab>
                  <Tab>Характеристики</Tab>
                </TabList>
                <TabPanel>
                  <div className="r__type">
                    {parse(desc !== "null" ? desc : "")}
                  </div>
                </TabPanel>
                <TabPanel>
                  {/* <span className="pt-4">
                    {parse(comp !== "null" ? comp : "")}
                  </span> */}
                  {productOne?.productProperties?.map((item, idx) => (
                    <div key={idx} className="r__type">
                      {item.key_name} {item.key_name && ":"}{" "}
                      <span>{item.value_name}</span>
                    </div>
                  ))}
                </TabPanel>
              </Tabs>
            </div>
            <>
              <ErrorModal
                showModal={showErrorModal10}
                onClose={() => setShowErrorModal1(false)}
                text="Зарегистрируйте чтобы добавить в избранную"
              />
              <ErrorModal
                showModal={showErrorModal11}
                onClose={() => setShowErrorModal3(false)}
                text="Зарегистрируйте чтобы написать"
              />
              <div className="seller-seller">
                {/* {shop?.isFavorite === false ? (
                  <MdFavoriteBorder
                    onClick={() => {
                      if (!reduxToken) {
                        setShowErrorModal1(true);
                      } else {
                        dispatch(createShop({ shop_id: shop.id }));
                      }
                    }}
                    className="fa-heart"
                    fill="#ee4927"
                    size={24}
                  />
                ) : (
                  <FaHeart
                    onClick={() => {
                      if (!reduxToken) {
                        setShowErrorModal1(true);
                      } else {
                        dispatch(createShop({ shop_id: shop.id }));
                      }
                    }}
                    className="fa-heart"
                    fill="#EE4927"
                    size={24}
                  />
                )} */}
                {productOne.user?.photo ? (
                  <img
                    src={`${"https://admin.birmakon.uz"}${
                      productOne.user?.photo
                    }`}
                    alt="not found"
                  />
                ) : (
                  <img
                    src="https://admin.birmakon.uz//assets_files/images/user.png"
                    alt="not found"
                  />
                )}
                <div className="name__title mt-2">
                  {productOne.user?.shop_name ? productOne.user?.shop_name : ""}
                </div>
                <div className="links">
                  <div
                    onClick={() => {
                      if (!reduxToken) {
                        setShowErrorModal11(true);
                      }
                      if (chatId && reduxToken) {
                        navigate("/message/detail/" + chatId?.id);
                      }
                      if (!chatId && reduxToken) {
                        dispatch(clearChat());
                        navigate(`/message/type=shop/${productOne?.user?.id}`);
                      }
                    }}
                    className="write__to-market"
                  >
                    <AiOutlineMessage
                      className="write mr-2"
                      fill="#EE4927"
                      size={24}
                    />
                    Написать
                  </div>
                  <Link
                    to={"/selleradres/" + productOne.user?.id}
                    className="market__link"
                  >
                    Перейти в магазин
                  </Link>
                </div>
              </div>
            </>
          </div>
        </MContainer>
        <MContainer>
          <div className="question__title">
            Отзывы и вопросы{" "}
            {/* <Link
              to=""
              className="ml-6 border-b border-gray-600 hover:border-gray-50"
            >
              Правила оформления отзывов
            </Link> */}
          </div>
          <div className="question">
            <div className="q__box">
              <div className="comment">
                <div className="order">{productOne?.reviews_count}</div>
                <p className="pb-5">
                  На основании {productOne?.reviews_count} отзыва
                </p>
                <div className="stars">
                  <ReactStars />
                </div>
              </div>
              <div className="place">
                <div className="lines">
                  <div className="flex flex-row w-full">
                    <ProgressBarLine
                      value={productOne?.review_separate?.rate_5 * oneRating}
                      strokeWidth={1}
                    />
                    <div className="w-4">
                      <h6>5</h6>
                    </div>
                  </div>
                </div>
                <div className="lines">
                  <div className="flex flex-row w-full">
                    <ProgressBarLine
                      value={productOne?.review_separate?.rate_4 * oneRating}
                      strokeWidth={1}
                    />
                    <div className="w-4">
                      <h6>4</h6>
                    </div>
                  </div>
                </div>
                <div className="lines">
                  <div className="flex flex-row w-full">
                    <ProgressBarLine
                      value={productOne?.review_separate?.rate_3 * oneRating}
                      strokeWidth={1}
                    />
                    <div className="w-4">
                      <h6>3</h6>
                    </div>
                  </div>
                </div>
                <div className="lines">
                  <div className="flex flex-row w-full">
                    <ProgressBarLine
                      value={productOne?.review_separate?.rate_2 * oneRating}
                      strokeWidth={1}
                    />
                    <div className="w-4">
                      <h6>2</h6>
                    </div>
                  </div>
                </div>
                <div className="lines">
                  <div className="flex flex-row w-full">
                    <ProgressBarLine
                      value={productOne?.review_separate?.rate_1 * oneRating}
                      strokeWidth={1}
                    />
                    <div className="w-4">
                      <h6>1</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="q__box">
              <div className="box">
                <div className="protsent">
                  <Circle
                    progress={35}
                    textColor="#fff"
                    progressColor="#fff"
                    bgColor="rgba(16, 0, 0, 0.16)"
                    roundedStroke={true}
                  />
                  <DonutChart />
                  <Progress />
                  </div>
                <p>Barcha sotuvlar</p>
              </div>
              <div className="box">
                <Circle
                  progress={35}
                  textColor="#fff"
                  progressColor="#fff"
                  bgColor="rgba(16, 0, 0, 0.16)"
                  roundedStroke={true}
                />
                <Progress />
                <p>Barcha sotuvlar</p>
              </div>
              <div className="box">
                <Circle
                  progress={35}
                  textColor="#fff"
                  progressColor="#fff"
                  bgColor="rgba(16, 0, 0, 0.16)"
                  roundedStroke={true}
                />
                <Progress />
                <p>Barcha sotuvlar</p>
              </div>
            </div> */}
          </div>
        </MContainer>
        <MContainer className="p-customer">
          <span>Сортировать по: </span>
          <span
            onClick={() => (
              dispatch(getCommentFilterWithRate(id)), setSortComment(true)
            )}
            className={`${
              sortComment === true && "border-b-2 border-gray-500"
            } cursor-pointer`}
          >
            Оценке
          </span>
          <span
            onClick={() => (
              dispatch(getCommentFilterWithDate(id)), setSortComment(false)
            )}
            className={`${
              sortComment === false && "border-b-2 border-gray-500"
            } cursor-pointer`}
          >
            Дате
          </span>
          <div
            className="customer flex flex-wrap justify-between pt-4"
            key={id}
          >
            <div className="c__box" key={id}>
              <div className="c__box-title">
                Отзывы <span>({productOne?.reviews_count})</span>
              </div>
              {loading3 && <PreLoader />}
              {!loading3 &&
                comments?.slice(0, reviewsSlice).map((review, idx) => (
                  <div key={idx} className="user__comment">
                    <div className="user flex items-center">
                      <div className="user__name mr-3">
                        {review?.user?.name}
                      </div>
                      <div className="stars">
                        <ReactStars
                          value={review?.rate}
                          edit={false}
                          isHalf={true}
                        />
                      </div>
                    </div>
                    <p className="my-2">{review?.review}</p>
                    <div className="date__sale">
                      <div className="date">{review?.date}</div>
                    </div>
                  </div>
                ))}
              {reviewsSlice !== comments?.length && (
                <button
                  onClick={() => handleReviewSlice(comments?.length)}
                  type="submit"
                  className="comment__btn"
                >
                  Показать больше комментариев
                </button>
              )}
            </div>
            {/* <div className="c__box bg">
              <div className="box__title">У вас есть вопросы</div>
              <ReactStars
                onChange={ratingChanged}
                value={0}
                count={5}
                size={24}
                activeColor="#ffd700"
              />
              <textarea
                onChange={(e) => {
                  setReview(e.target.value);
                }}
                placeholder="Ваш отзыв"
              ></textarea>
              <button
                onClick={() => {
                  dispatch(
                    createComment({
                      review: review,
                      rate: rate,
                      product_id: productOne?.id,
                    })
                  );
                  dispatch(getComments(id));
                }}
              >
                Отправить вопрос
              </button>
            </div> */}
          </div>
        </MContainer>
        <MContainer className="c-products pb-8">
          <Title name="Похожие товары" />
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3">
            {related_products?.slice(0, slice).map((related, idx) => (
              <Cart key={idx} product={related} />
            ))}
          </div>
          <div className="advertising__button mt-8 text-center">
            {slice !== related_products?.length ||
              (slice > 5 && (
                <button
                  onClick={() => handleSlice(related_products?.length)}
                  className="show__button mb-4"
                >
                  Показать еще
                </button>
              ))}
          </div>
        </MContainer>
        <MContainer className="mb-12">
          <div className="recently-products">
            <Title name="Вы недавно смотрели" />
            <ProductsViewed />
          </div>
        </MContainer>
      </div>
      {/* <AddPageDelivery
        regions={regions}
        regions_sub={regions_sub}
        amount={detailCount}
        showModal={showModal}
        onCloseModal={() => {
          setShowModal(false);
        }}
        onClickRegionId={(data) => {
          dispatch(getRegionsSub(data));
        }}
      /> */}
    </>
  );
};

export default Add;
