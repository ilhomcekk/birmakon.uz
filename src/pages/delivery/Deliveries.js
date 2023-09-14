import React from 'react';
import '../../assets/scss/_delivery.scss';
import image39 from '../../assets/images/image 39.png';
import image40 from '../../assets/images/Vector (28).png';
import image41 from '../../assets/images/Vector (29).png';
import image42 from '../../assets/images/Vector (30).png';
import { MContainer } from '../../element/Elemens';
import Title from '../../component/Title/Title';
import NavbarMenu from '../../container/NavbarMenu';

const Delivery = () => {

  return (
    <>
      <NavbarMenu />
      <MContainer>
        <Title name="Доставка" />
        <div className="delivery-boxes">
          <div className="delivery__box">
            <div className="box_title">
              Быстро доставим любой Ваш заказ по всей Узбекистану
            </div>
            <div className="d__boxes">
              <div className="d__box">
                <img src={image40} alt="not found" />
                <p>Бесплатная доставка</p>
              </div>
              <div className="d__box">
                <img src={image41} alt="not found" />
                <p>Доставка круглый год в Узбекистану</p>
              </div>
              <div className="d__box">
                <img src={image42} alt="not found" />
                <p>Возврат товара при примерке</p>
              </div>
            </div>
          </div>
          <div className="delivery__box">
            <img src={image39} alt="not found" />
          </div>
        </div>
      </MContainer>
    </>
  );
}

export default Delivery;