import React from "react";
import Loading from "../../component/Loading";
import PhoneInput from "react-phone-input-2";
import { useSelector } from "react-redux";
import { Form, Field } from "react-final-form";
import { MButton } from "../../element/Elemens";

const Opts = (props) => {
  return (
    <select
      name={props.name}
      onChange={props.onChange}
      className="product__order__page__input"
    >
      <option>Viloyatni kiriting</option>
      {props.options?.map((location, index) => {
        return (
          <option key={index} value={location._id}>
            {location.name}
          </option>
        );
      })}
    </select>
  );
};

const ProductOrderForm = ({ stream_user, onClickProductOrder, productID }) => {
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const onSubmit = async (values) => {
    await sleep(300);
    onClickProductOrder({
      ...values,
      stream_id: stream_user.stream,
      productID,
    });
  };

  const { loading } = useSelector((state) => state.product);
  const locations = useSelector((state) => state.locations.list);

  return (
    <div className="product__order__page__form">
      <div className="product__order__page__form__group">
        <Form
          onSubmit={onSubmit}
          validate={(values) => {
            const errors = {};
            if (!values.customer_name) {
              errors.customer_name = {
                required: true,
                text: "Ismingizni kiriting!",
              };
            }
            if (!values.customer_phone) {
              errors.customer_phone = {
                required: true,
                text: "Telefon raqamingizni kiriting!",
              };
            }
            if (!values.region_id) {
              errors.region_id = {
                required: true,
                text: "Viloyatni kiriting!",
              };
            }
            return errors;
          }}
          render={({ handleSubmit, values }) => {
            return (
              <form
                onSubmit={handleSubmit}
                className="transaction__request__row"
              >
                <div className="transaction__request__right">
                  <div className="product__order__page__form__group">
                    <label className="product__order__page__label">
                      Ism, Familya
                    </label>

                    <Field name="customer_name">
                      {({ input, meta }) => {
                        return (
                          <div>
                            <input
                              {...input}
                              type="text"
                              placeholder="Ism, Familya"
                              className="product__order__page__input"
                            />
                            <div className="product__order__page__input__error__text">
                              {meta.error && meta.touched && (
                                <span>{meta.error.text}</span>
                              )}
                            </div>
                          </div>
                        );
                      }}
                    </Field>
                  </div>
                  <div className="product__order__page__form__group">
                    <label className="product__order__page__label product__order__page__label__phone">
                      Telefon raqam
                    </label>
                    <Field
                      name="customer_phone"
                      type="text"
                      className="product__order__page__input"
                      placeholder="Karta foydalanuvchi ismini kiriting"
                    >
                      {({ input, meta }) => (
                        <div>
                          <PhoneInput
                            {...input}
                            placeholder="Telefon raqamingizni kiriting"
                            country={"uz"}
                            defaultCountry="uz"
                            defaultMask="(..) ...-..-.."
                            alwaysDefaultMask={true}
                          />
                          <div className="product__order__page__input__error__text">
                            {meta.error && meta.touched && (
                              <span>{meta.error.text}</span>
                            )}
                          </div>
                        </div>
                      )}
                    </Field>
                  </div>

                  <div className="product__order__page__form__group">
                    <label className="product__order__page__label">
                      Viloyat
                    </label>
                    <Field
                      name="region_id"
                      component="select"
                      options={locations}
                    >
                      {({ input, meta, options }) => {
                        return (
                          <div>
                            <Opts
                              options={options}
                              name={input.name}
                              onChange={(value) => input.onChange(value)}
                            />
                            <div className="product__order__page__input__error__text">
                              {meta.error && meta.touched && (
                                <span>{meta.error.text}</span>
                              )}
                            </div>
                          </div>
                        );
                      }}
                    </Field>
                  </div>

                  <div>
                    <MButton type="submit" disabled={loading}>
                      {loading ? (
                        <Loading />
                      ) : (
                        <div className="button__box__none__loading"></div>
                      )}
                      Buyurtma berish
                    </MButton>
                  </div>
                </div>
              </form>
            );
          }}
        />
      </div>
    </div>
  );
};

export default ProductOrderForm;
