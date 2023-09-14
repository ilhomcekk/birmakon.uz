import React from "react";
import '../../assets/scss/_modal-delivery.scss';

export default function ModalDelivery() {
   return (
      <div className="flex flex-col justify-between h-full">
         <div className="delivery__box">
            <div className="flex justify-end delivery__cancel"></div>
            <div className="delivery__title">
               <h5>Способ доставки</h5>
            </div>
            <div className="delivery__button">
               <button className="btn1">Пункт выдачи</button>
               <button className="btn2">Курьером</button>
            </div>
            <div className="delivery__select my-4">
               <div>
                  <span className="mt-2">Выберите страну</span>
                  <select className="mt-1" name="" id="">
                     <option value="">Россия</option>
                  </select>
               </div>
               <div>
                  <span className="mt-2">Выберите город</span>
                  <select className="mt-1" name="" id="">
                     <option value="">Москва</option>
                  </select>
               </div>
            </div>
            <div className="mt-4">
               <label className="flex items-center mb-3 punkt">
                  <input className="mr-4" name="radio" type="radio" />1 Филиал
               </label>
               <label className="flex items-center mb-3 punkt">
                  <input className="mr-4" name="radio" type="radio" />2 Филиал
               </label>
               <label className="flex items-center mb-3 punkt">
                  <input className="mr-4" name="radio" type="radio" />3 Филиал
               </label>
               <label className="flex items-center mb-3 punkt">
                  <input className="mr-4" name="company" type="radio" />© btc -
                  20 000сум
               </label>
               <label className="flex items-center mb-3 punkt">
                  <input className="mr-4" name="company" type="radio" />© btc -
                  20 000сум
               </label>
               <label className="flex items-center mb-3 punkt">
                  <input className="mr-4" name="company" type="radio" />© aue -
                  40 000сум
               </label>
            </div>
            <div>
               <div className="inputs">
                  <div className="input mb-4">
                     <span>Улица</span>
                     <input
                        className="adress__input"
                        type="text"
                        placeholder="Улица"
                     />
                  </div>
                  <div className="input mb-4">
                     <span>Дом</span>
                     <input
                        className="adress__input"
                        type="text"
                        placeholder="Дом"
                     />
                  </div>
                  <div className="input mb-4">
                     <span>Квартира</span>
                     <input
                        className="adress__input"
                        type="number"
                        placeholder="Квартал"
                     />
                  </div>
               </div>
            </div>
            <div className="delivery__address">
               <p>Нет сохраненных адресов</p>
               <p>Бунёдкор 14 32кв</p>
            </div>
         </div>
         <div className="delivery__bottom">
            <button className="delivery__pick mb-2 w-full">
               Выбрать на карте
            </button>
            <div className="flex justify-between">
               <button className="save" type="submit">
                  Сохранить
               </button>
               <button className="cancel" type="submit">
                  Отменить
               </button>
            </div>
         </div>
      </div>
   );
}
