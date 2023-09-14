import React, { useEffect, useState } from "react";
import { Cart } from "../../component/Cart/Cart";
import {
  getDiscountProducts,
  getProductsAll,
} from "../../redux/actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import { MContainer, MLink, ShowAllLink } from "../../element/Elemens";
import Title from "../../component/Title/Title";
import PreLoader from "../../component/PreLoader/PreLoader";
import ProductSkelet from "../../component/loading/ProductSkelet";
const language = window.localStorage.getItem("Content-language");

export default function DiscountProducts() {
  const dispatch = useDispatch();
  const [params, setParams] = useState({
    page: 1,
    "per-page": 5,
  });

  useEffect(() => {
    dispatch(getDiscountProducts(params));
  }, [params]);

  const handleOnPageChange = () => {
    let newParams = {
      ...params,
      "per-page": (params["per-page"] += 5),
    };
    setParams(newParams);
    dispatch(getDiscountProducts(newParams));
  };

  const discountProducts = useSelector(
    (state) => state.product.discountProducts
  );
  const { discountProductsLoading } = useSelector((state) => state.product);

  return (
    <MContainer className="md:py-12 py-8">
      <Title
        nameUz="Chegirmali tovarlar"
        nameEn="Discounted goods"
        name="Товары со скидкой"
      />
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3">
        {discountProducts.map((product, index) => (
          <Cart key={index} product={product} />
        ))}
        {discountProductsLoading && <ProductSkelet length={5} />}
      </div>
      <button onClick={handleOnPageChange} className="show__all">
        {language === "ru" && "Показать еще"}
        {language === "uz" && "Ko'proq ko'rish"}
        {language === "en" && "Show more"}
      </button>
    </MContainer>
  );
}
