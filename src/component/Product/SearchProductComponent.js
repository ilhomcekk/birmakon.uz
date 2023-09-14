import React from "react";
import { BsSearch } from "react-icons/bs";

const SearchProductComponent = ({ onChangeSearchProduct }) => {
  return (
    <div className="search__box">
      <div className="search__box__child">
        <input
          type="text"
          placeholder="Qidiruv"
          className="product__search__input"
        />
        <div className="search__style__right">
          <BsSearch />
        </div>
      </div>
    </div>
  );
};

export default SearchProductComponent;
