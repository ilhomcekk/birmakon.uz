import React, { useEffect, useState } from "react";
import { Cart } from "../../component/Cart/Cart";
import {
  getProductsAll,
  getRecentlyProducts,
} from "../../redux/actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import { MContainer, MLink, ShowAllLink } from "../../element/Elemens";
import Title from "../../component/Title/Title";
import PreLoader from "../../component/PreLoader/PreLoader";
import { BiLoader } from "react-icons/bi";
import Loader from "../../component/Loader/Loader";
import { ProductOrderLoading } from "../../component/loading/ProductOrderLoading";
import ProductSkelet from "../../component/loading/ProductSkelet";
const language = window.localStorage.getItem("Content-language");

export default function AddedRecentlyProducts() {
  const dispatch = useDispatch();

  const [params, setParams] = useState({
    "per-page": 5,
  });

  useEffect(() => {
    dispatch(getRecentlyProducts(params));
  }, []);

  const { recentlyProductsLoading } = useSelector((state) => state.product);

  const recentlyProducts = useSelector(
    (state) => state.product.recentlyProducts
  );

  const handleRecentlyProductsPagination = () => {
    let newParams = {
      ...params,
      "per-page": (params["per-page"] += 5),
    };
    dispatch(getRecentlyProducts(newParams));
  };

  return (
    <MContainer className="md:py-12 py-8">
      <Title
        nameUz="Yaqinda qo'shilgan tovarlar"
        name="Недавно добавленные товары"
        nameEn="Recently added products"
      />
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3">
        {recentlyProducts?.map((product, index) => (
          <Cart key={index} product={product} />
        ))}
        {recentlyProductsLoading && <ProductSkelet length={5} />}
      </div>
      <button onClick={handleRecentlyProductsPagination} className="show__all">
        {recentlyProductsLoading && (
          <BiLoader className="mx-auto" fill="#fff" />
        )}
        {language === "ru" && "Показать еще"}
        {language === "uz" && "Ko'proq ko'rish"}
        {language === "en" && "Show more"}
      </button>
    </MContainer>
  );
}
