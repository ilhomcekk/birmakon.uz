import React from "react";
import { formatCreditCardNumber } from "./cardUtils";
import Card from "./Card";
import { Form, Field } from "react-final-form";
import CurrencyInput from "react-currency-input-field";
import { MButton } from "../../element/Elemens";
import Loading from "../Loading";

const TransactionRequest = ({ userInfo, onClickTransaction, loading }) => {
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const onSubmit = async (values) => {
    await sleep(300);
    onClickTransaction({ ...values, user_id: userInfo._id });
  };

  return (
    <div className="transaction__page__request__price">
      <Form
        onSubmit={onSubmit}
        validate={(values) => {
          const errors = {};
          if (!values.cart_number) {
            errors.cart_number = {
              required: true,
              text: "Karta raqamini kiriting!",
            };
          }
          return errors;
        }}
        render={({ handleSubmit, values, active }) => {
          return (
            <form onSubmit={handleSubmit} className="transaction__request__row">
              <div className="transaction__request__card">
                <div className="transaction__request__balans">
                  balans: {userInfo.balans}
                </div>
              </div>
              <Card
                number={values.cart_number || ""}
                name={values.user_name || ""}
                expiry={""}
                focused={active}
              />
              <div className="transaction__request__right">
                <Field name="cart_number">
                  {({ input, meta }) => {
                    return (
                      <div>
                        <input
                          {...input}
                          type="text"
                          className="transaction__input"
                          pattern="[\d| ]{16,22}"
                          placeholder="Karta raqamingizni kiriting"
                          format={formatCreditCardNumber}
                        />
                        <div className="transaction__request__right__error__text">
                          {meta.error && meta.touched && (
                            <span>{meta.error.text}</span>
                          )}
                        </div>
                      </div>
                    );
                  }}
                </Field>
                <div>
                  <Field
                    name="quantity"
                    type="text"
                    className="transaction__input"
                    placeholder="Karta foydalanuvchi ismini kiriting"
                  >
                    {(input) => (
                      <div>
                        <CurrencyInput
                          name={input.input.name}
                          onChange={input.input.onChange}
                          prefix=""
                          placeholder="Summani kiriting"
                          className="transaction__input"
                          step={1}
                        />
                      </div>
                    )}
                  </Field>
                </div>
                <div className="transaction__request__right__button">
                  <MButton type="submit" disabled={loading}>
                    {loading ? (
                      <Loading />
                    ) : (
                      <div className="button__box__none__loading"></div>
                    )}
                    Yuborish
                  </MButton>
                </div>
              </div>
            </form>
          );
        }}
      />
    </div>
  );
};

export default TransactionRequest;
