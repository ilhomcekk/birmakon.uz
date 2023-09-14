import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import "../../assets/scss/_card.scss";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { removeCart } from "../../redux/actions/userActions";
import { BiSelectMultiple } from "react-icons/bi";

const PaymentForm = ({ cart, onClickCartId, payment_id }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/");

  const [cvc, setCvc] = useState(cart.card_phone_number);
  const [expiry, setExpiry] = useState(cart.card_expire);
  const [focus, setFocus] = useState("");
  const [name, setName] = useState(cart.card_phone_number);
  const [number, setNumber] = useState(cart.card_number);

  return (
    <div
      className="relative"
      id="PaymentForm"
    >
      <input
        className={`${
          splitLocation[1] !== "basket" && "!hidden"
        } card-input !absolute !right-0 !top-0`}
        onChange={(e) => {
          if (payment_id === 37) {
            if (e.target.checked === true) {
              onClickCartId(cart.id);
            } else {
              onClickCartId("");
            }
          }
        }}
        type="checkbox"
      />
      <Button
        className={`${splitLocation[1] === "basket" && "!hidden"}`}
        value={cart.id}
        onClick={() => dispatch(removeCart({ card_id: cart.id }))}
      >
        Удалить карту
      </Button>
      <Cards
        cvc={cvc}
        expiry={expiry}
        focused={focus}
        name={name}
        number={number}
      />
      {/* <form>
        <input
          type="number"
          name="number"
          placeholder="Card Number"
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
        <input
          type="number"
          maxLength={4}
          name="cvc"
          placeholder="cvc"
          onChange={handleInputChange2}
          onFocus={handleInputFocus}
        />
        <input
          type="tel"
          name="name"
          placeholder="name"
          onChange={handleInputChange3}
          onFocus={handleInputFocus}
        />
        <input
          type="number"
          maxLength={4}
          name="expiry"
          placeholder="expiry"
          onChange={handleInputChange4}
          onFocus={handleInputFocus}
        />
      </form> */}
    </div>
  );
};

export default PaymentForm;
