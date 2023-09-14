import { Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { MContainer } from "../../element/Elemens";
import { getShopList } from "../../redux/actions/shopActions";

const Markets = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [params, setParams] = useState({
    page: 1,
    "per-page": 12,
  });
  const shops = useSelector((state) => state.shop.shopList);
  const { shopPagination } = useSelector((state) => state.shop);
  const { loading } = useSelector((state) => state.shop);
  useEffect(() => {
    dispatch(getShopList(params));
  }, []);
  const onPageChange = (e, value) => {
    let newParams = {
      ...params,
      page: value,
    };
    setParams(newParams);
    dispatch(getShopList(newParams));
    window.scrollTo(0, 0);
  };

  return (
    <>
      <MContainer>
        <div className="pages-link">
          <Link to="/">Главная страница / </Link>
          <Link to="">Магазины</Link>
        </div>
      </MContainer>
      <MContainer>
        <div className="grid 2xl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4 my-8">
          {shops?.map((shop, idx) => (
            <div onClick={() => navigate("/selleradres/" + shop.id)} key={idx}>
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
                {/* {shop?.gallery?.length > 0 && (
                  <div className="brand__images">
                    {shop.gallery?.slice(0, 3)?.map((img, idx) => (
                      <img
                        key={idx}
                        src={`https://admin.birmakon.uz/${img}`}
                        alt=""
                      />
                    ))}
                  </div>
                )} */}
              </div>
            </div>
          ))}
        </div>
        {shops?.length > 0 && !loading && (
          <Pagination
            className="flex items-center justify-center mb-8"
            count={shopPagination?.pageCount}
            page={shopPagination?.currentPage}
            color="error"
            onChange={onPageChange}
          />
        )}
      </MContainer>
    </>
  );
};

export default Markets;
