import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Cart } from "../../component/Cart/Cart";
import { MContainer, MLink, ShowAllLink } from "../../element/Elemens";
import { AiOutlineMessage } from "react-icons/ai";
import "../../assets/scss/_seller_adres.scss";
import { useSelector } from "react-redux";
import {
  getShopDetail,
  getShopProducts,
} from "../../redux/actions/shopActions";
// import { getProductOne } from "../../redux/actions/productActions";
import { useDispatch } from "react-redux";
import PreLoader from "../../component/PreLoader/PreLoader";
import parse from "html-react-parser";
import { useAsync } from "react-async";
import ErrorModal from "../../component/ErrorModal/ErrorModal";
import { Pagination } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
const URL = `${process.env.REACT_APP_API_DOMAIN}`;

const SellerAdres = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [params, setParams] = useState({
    page: 1,
    "per-page": 5,
  });

  useEffect(() => {
    dispatch(getShopDetail(id));
    dispatch(getShopProducts(id, params));
  }, [id]);

  const onPageChange = (e, value) => {
    let newParams = {
      ...params,
      page: value,
    };
    setParams(newParams);
    dispatch(getShopProducts(id, newParams));
  };

  const { loading } = useSelector((state) => state.shop);
  const shopOne = useSelector((state) => state.shop.data);
  const shopProducts = useSelector((state) => state.shop.list);
  const shopDesc = String(shopOne?.description);
  const { reduxToken } = useSelector((state) => state.user);
  const [showErrorModal1, setShowErrorModal1] = useState(false);
  const { pagination } = useSelector((state) => state.shop);

  return (
    <>
      <ErrorModal
        showModal={showErrorModal1}
        onClose={() => setShowErrorModal1(false)}
        text="Зарегистрируйте чтобы написать"
      />
      {loading && (
        <Skeleton
          height="80vh"
          width="100vw"
          style={{ transform: "unset", marginBottom: "2rem" }}
        />
      )}
      {!loading && (
        <div key={shopOne?.id} className="seller-adres">
          <div className="header relative">
            <img
              className="shop-banner"
              src={URL + shopOne?.photoBanner}
              alt=""
            />
            {/* <div className="container mx-auto px-4 xl:px-12 md:px-4">
              <h1>
                {shopOne.name}
              </h1>
              <p>
                {parse(shopDesc)}
              </p>
            </div> */}
          </div>
          <div className="container mx-auto px-4 xl:px-12 md:px-4 seller__container">
            <div className="seller__adress">
              <div className="box">
                <img src={`${URL}${shopOne?.photo}`} alt="not found" />
                <div>
                  <div className="user__name">
                    {shopOne?.name ? shopOne?.name : "Нет данных"}
                  </div>
                  <div className="flex items-center">
                    <AiOutlineMessage
                      className="write mr-2"
                      fill="#EE4927"
                      size={24}
                    />
                    <div
                      onClick={() => {
                        if (!reduxToken) {
                          setShowErrorModal1(true);
                        } else {
                          navigate("/message/type=shop/" + shopOne?.id);
                        }
                      }}
                      className="write__to-market"
                      style={{ color: "#EE4927" }}
                    >
                      Написать в магазин
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {shopOne?.gallery?.length > 0 && (
              <div className="text-xl mb-2">Галерея магазина</div>
            )}
            {shopOne?.gallery?.length > 0 && (
              <div className="flex flex-wrap gap-6 mb-8">
                {shopOne?.gallery?.map((item, idx) => (
                  <img
                    style={{
                      height: "150px",
                      border: "1px solid #e2e2e2",
                      borderRadius: "8px",
                      padding: "12px",
                    }}
                    key={idx}
                    src={URL + item}
                    alt=""
                  />
                ))}
              </div>
            )}
            {/* <div className="text-xl mb-2">Реквизиты магазина</div> */}
            {/* <div className="grid xl:grid-cols-3 md:grid-cols-2 gap-x-6 gap-y-4 mb-3">
              {shopOne?.shopSeller?.account && (
                <div className="seller-adres-box flex items-center justify-between flex-wrap border rounded px-4 py-2">
                  Расчетный счет: <span>{shopOne?.shopSeller?.account}</span>
                </div>
              )}
              {shopOne?.shopSeller?.bank && (
                <div className="seller-adres-box flex items-center justify-between flex-wrap border rounded px-4 py-2">
                  Банк: <span>{shopOne?.shopSeller?.bank}</span>
                </div>
              )}
              {shopOne?.shopSeller?.inn && (
                <div className="seller-adres-box flex items-center justify-between flex-wrap border rounded px-4 py-2">
                  ИНН: <span>{shopOne?.shopSeller?.inn}</span>
                </div>
              )}
              {shopOne?.shopSeller?.mfo && (
                <div className="seller-adres-box flex items-center justify-between flex-wrap border rounded px-4 py-2">
                  МФО: <span>{shopOne?.shopSeller?.mfo}</span>
                </div>
              )}
              {shopOne?.shopSeller?.oked && (
                <div className="seller-adres-box flex items-center justify-between flex-wrap border rounded px-4 py-2">
                  oked: <span>{shopOne?.shopSeller?.oked}</span>
                </div>
              )}
              {shopOne?.shopSeller?.okohx && (
                <div className="seller-adres-box flex items-center justify-between flex-wrap border rounded px-4 py-2">
                  okohx: <span>{shopOne?.shopSeller?.okohx}</span>
                </div>
              )}
              {shopOne?.shopSeller?.address_legal && (
                <div className="seller-adres-box flex items-center justify-between flex-wrap border rounded px-4 py-2">
                  Адрес: <span>{shopOne?.shopSeller?.address_legal}</span>
                </div>
              )}
              <div className="seller-adres-box flex items-center justify-between flex-wrap border rounded px-4 py-2">
                Отзывы: <span>{shopOne?.review_count}</span>
              </div>
            </div> */}
            {/* <div className="grid md:grid-cols-2 gap-x-8 gap-y-4 mb-8">
              <div className="seller-adres-box flex items-center justify-between flex-wrap border rounded px-4 py-2">
                Имя: <span>{shopOne?.name}</span>
              </div>
              {shopDesc && (
                <div className="seller-adres-box md:col-span-2 flex items-center justify-between flex-wrap border rounded px-4 py-2">
                  <span>О магазине: {parse(shopDesc)}</span>
                </div>
              )}
            </div> */}
          </div>
          <MContainer>
            {shopProducts?.length > 1 && (
              <div className="text-xl mb-2">Товары магазина</div>
            )}
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 mb-12">
              {shopProducts?.map((product, idx) => (
                <Cart key={idx} product={product} />
              ))}
            </div>
            {shopProducts?.length > 0 && (
              <Pagination
                className="flex items-center justify-center mb-8"
                count={pagination?.pageCount}
                page={pagination?.currentPage}
                onChange={onPageChange}
                color="error"
              />
            )}
          </MContainer>
        </div>
      )}
    </>
  );
};

export default SellerAdres;
