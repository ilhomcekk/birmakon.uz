import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "../../assets/scss/_counter.scss";
import { postCartAdd, postCartMinus } from "../../redux/actions/cartActions";

const Counter = ({
  product_id,
  count_product,
  onClickIncrement,
  onClickDecrement,
}) => {
  const dispatch = useDispatch();
  //increase counter
  const decrease = () => {
    onClickDecrement(product_id);
  };

  //decrease counter
  const increase = () => {
    onClickIncrement(product_id);
  };

  return (
    <div className="product__order">
      <button className="product__increment" onClick={increase}>
        -
      </button>
      <input
        value={count_product ? count_product : 0}
      />
      <button className="product__decrement" onClick={decrease}>
        +
      </button>
    </div>
  );
};

export default Counter;
