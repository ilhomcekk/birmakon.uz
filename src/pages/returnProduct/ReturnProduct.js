import React from 'react';
import '../../assets/scss/_return_product.scss';
import Title from '../../component/Title/Title';
import { MContainer } from '../../element/Elemens';

export default function ReturnProduct() {
  return (
    <>
      <div className="border-bottom">
        <MContainer className="r-product md:py-12 py-8">
          <Title name="Правила возврата товаров" />
          <div className="product__title">
            Возврат товара надлежащего качества
          </div>
          <h1>Срок возврата товара</h1>
          <p>
            Срок возврата товара надлежащего качества составляет 21 день с
            момента получения товара, если иное не было оговорено при продаже
            товара.
          </p>
          <p>
            Причинами для возврата товара со стороны Покупателя могут быть
            следующие:
          </p>
          <p>--- Не подошел размер, фасон, цвет, длина и т.п.</p>
          <p>
            --- Оттенок полученного товара отличается от оттенка модели с
            фотографии на сайте.
          </p>
          <div className="warning">
            <span>!</span>
            <p>
              Товар принимается к возврату только в полной комплектации, со
              всеми упаковками и наклейками, в неношеном/неиспользованном виде
            </p>
          </div>
          <h1>
            Возврат товара надлежащего качества осуществляется двумя способами:
          </h1>
          <p>Возврат в фирменные пункты выдачи/возврата Birmakon</p>
          <p>
            Вызов курьера Birmakon (услуга предоставляется жителям городов, где
            есть курьерская доставка).
          </p>
          <h1>1. Самостоятельный возврат</h1>
          <p>Возврат в фирменные пункты выдачи/возврата Birmakon</p>
          <h1>2. Возврат курьером</h1>
          <p>
            Услуга доступна для населенных пунктов, куда осуществляется доставка
            курьером.
          </p>
          <p>
            На один день возможно оформить на возврат с помощью курьера не более
            10 позиций. Количество товаров для возврата в пунктах выдачи не
            ограничено.
          </p>
          <div className="product__title">
            Возврат товара надлежащего качества
          </div>
          <h1>Срок возврата товара</h1>
          <p>
            Срок возврата товара надлежащего качества составляет 21 день с
            момента получения товара, если иное не было оговорено при продаже
            товара.
          </p>
          <h1>
            Возврат товара ненадлежащего качества осуществляется следующим
            способом:
          </h1>
          <p>
            --- Возврат товара осуществляется посредством оформления заявки в
            Личном кабинете.
          </p>
          <p>
            --- Срок рассмотрения заявки не превышает 7 (семь) рабочих дней.
          </p>
          <p>
            --- В случае, если по результату рассмотрения заявки Продавцом
            принято положительное решение, покупатель может передать товар для
            возврата в Пункт выдачи заказов Birmakon.
          </p>
          <p>
            --- В случае отклонения заявки, покупатель вправе обратиться в
            независимую экспертизу. В случае, если независимой экспертизой будет
            подтверждено право покупателя на возврат товара, все расходы
            покупателя, связанные с проведением независимой экспертизы подлежат
            возмещению Продавцом.
          </p>
        </MContainer>
      </div>
      <div className="container mx-auto px-4 xl:px-12 md:px-4 r-product__footer">
        <span>*</span>
        <p>
          Настоящие правила носят рекомендательный характер и не ограничивают
          покупателя в правах, связанных с предъявлением требований Продавцу,
          предусмотренных действующим законодательством.
        </p>
      </div>
    </>
  );
}