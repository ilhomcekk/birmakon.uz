import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productsViewed } from "../../redux/actions/productActions";
import { Cart } from "../Cart/Cart";
import ProductSkelet from "../loading/ProductSkelet";
const language = window.localStorage.getItem("Content-language");

const ProductsViewed = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    page: 1,
    "per-page": 5,
  });
  useEffect(() => {
    dispatch(productsViewed(data));
  }, []);
  const products_viewed = useSelector((state) => state.product.products_viewed);
  const { products_viewedLoading } = useSelector((state) => state.product);
  const handleOnPageChange = () => {
    let newData = {
      ...data,
      "per-page": (data["per-page"] += 5),
    };
    setData(newData);
    dispatch(productsViewed(newData));
  };

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3">
        {products_viewed?.map((view, idx) => (
          <Cart key={idx} product={view} />
        ))}
        {products_viewedLoading && <ProductSkelet length={5} />}
      </div>
      <button onClick={handleOnPageChange} className="show__all">
        {language === "ru" && "Показать еще"}
        {language === "uz" && "Ko'proq ko'rish"}
        {language === "en" && "Show more"}
      </button>
    </>
  );
};

export default ProductsViewed;
