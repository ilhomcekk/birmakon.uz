import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Cart } from "../../component/Cart/Cart";
import NavbarMenu from "../../container/NavbarMenu";
import { MContainer } from "../../element/Elemens";
import ProductSkelet from "../../component/loading/ProductSkelet";
import { useState } from "react";
import { getProductSearch } from "../../redux/actions/filterActions";

const SearchProduct = () => {
  const dispatch = useDispatch();
  const searchText = window.localStorage.getItem("search-product");
  const [params, setParams] = useState({ query: searchText, "per-page": 20 });
  const productSearch = useSelector((state) => state.filter.searchList);
  const { searchListPagination } = useSelector((state) => state.filter);
  console.log(productSearch?.length <= searchListPagination?.totalCount);
  const { productSearchLoading } = useSelector((state) => state.filter);
  const handlePagination = () => {
    let newParams = {
      ...params,
      query: (params["query"] = searchText),
      "per-page": (params["per-page"] += 20),
    };
    dispatch(getProductSearch(newParams));
  };

  return (
    <>
      <NavbarMenu />
      <MContainer>
        <div className="text-center flex justify-center gap-2 flex-wrap">
          Поиск по запросу <div className="font-bold">"{searchText}"</div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 mb-12">
          {productSearch?.map((product, idx) => (
            <Cart key={idx} product={product} />
          ))}
          {productSearchLoading && <ProductSkelet length={5} />}
        </div>
        {productSearch?.length > 0 && !productSearchLoading && (
          <button
            onClick={() => {
              if (
                productSearch?.length > 0 &&
                productSearch?.length < searchListPagination?.totalCount
              ) {
                handlePagination();
              }
            }}
            className="show__all"
          >
            {productSearch?.length > 0 &&
            productSearch?.length > 0 &&
            productSearch?.length < searchListPagination?.totalCount
              ? "Показать еще"
              : `Всего ${searchListPagination?.totalCount} товаров`}
          </button>
        )}
      </MContainer>
    </>
  );
};

export default SearchProduct;
