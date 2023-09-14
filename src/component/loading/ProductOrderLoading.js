import React from "react";
import { MContainer } from "../../element/Elemens";
import { SkeletonOne } from "./SkeletonOne";

export const ProductOrderLoading = () => {
  return (
    <MContainer>
      <div className="product__order__page">
        <div className="skeleton__order__product">
          <div className="product__title__loading__parent">
            <SkeletonOne type="product__title__loading" />
            <div className="shimmer-wrapper">
              <div className="shimmer"></div>
            </div>
          </div>
          <div className="product__order__icon__loading__parent">
            <SkeletonOne type="product__order__icon__loading" />
            <div className="shimmer-wrapper">
              <div className="shimmer"></div>
            </div>
          </div>
          <div className="product__order__page__row__loading">
            <div className="product__order__page__corousel__loading">
              <div className="product__order__image__loading__parent">
                <SkeletonOne type="product__order__image__loading" />
                <div className="shimmer-wrapper">
                  <div className="shimmer"></div>
                </div>
              </div>
            </div>
            <div className="product__order__page__form__group__loading">
              <div className="product__order__form__title__parent">
                <SkeletonOne type="product__order__form__title" />
                <div className="shimmer-wrapper">
                  <div className="shimmer"></div>
                </div>
              </div>
              <div className="product__order__page__input__loading__parent">
                <SkeletonOne type="product__order__page__input__loading" />
                <div className="shimmer-wrapper">
                  <div className="shimmer"></div>
                </div>
              </div>
              <div className="product__order__page__input__loading__parent">
                <SkeletonOne type="product__order__page__input__loading" />
                <div className="shimmer-wrapper">
                  <div className="shimmer"></div>
                </div>
              </div>
              <div className="product__order__page__input__loading__parent">
                <SkeletonOne type="product__order__page__input__loading" />
                <div className="shimmer-wrapper">
                  <div className="shimmer"></div>
                </div>
              </div>
              <div className="product__order__page__input__loading__parent">
                <SkeletonOne type="product__order__page__input__loading" />
                <div className="shimmer-wrapper">
                  <div className="shimmer"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MContainer>
  );
};
