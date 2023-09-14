import React from "react";
import { Form, Field } from "react-final-form";
import { MButton } from "../../element/Elemens";
import { useSelector } from "react-redux";

const StreamSubmit = ({ onClickStreamData, stream }) => {
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const { loading } = useSelector((state) => state.stream);

  const onSubmit = async (values) => {
    await sleep(300);
    onClickStreamData({ ...values, stream_id: stream._id });
  };

  return (
    <Form
      onSubmit={onSubmit}
      validate={(values) => {
        const errors = {};
        if (!values.disc) {
          errors.disc = {
            required: true,
            text: "Oqim nomini kiriting",
          };
        }
        return errors;
      }}
      render={({ handleSubmit, submitting }) => {
        return (
          <form onSubmit={handleSubmit} className="transaction__request__row">
            <div>
              <Field name="disc">
                {({ input, meta }) => {
                  return (
                    <div>
                      <input
                        {...input}
                        type="text"
                        placeholder="Masalan kanal nomi kiriting"
                        className="stream__cart__body__input stream__all__input"
                      />
                      <div className="stream__cart__body__error_value">
                        {meta.error && meta.touched && (
                          <span>{meta.error.text}</span>
                        )}
                      </div>
                    </div>
                  );
                }}
              </Field>
            </div>
            <MButton
              type="submit"
              className="stream__button"
              disabled={loading}
            >
              Oqim yaratish
            </MButton>
          </form>
        );
      }}
    />
  );
};

export default StreamSubmit;
