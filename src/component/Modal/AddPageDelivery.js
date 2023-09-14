import React, { useEffect, useState } from "react";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import "../../assets/scss/_modal-delivery.scss";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { useDispatch, useSelector } from "react-redux";
import { getLogistSort } from "../../redux/actions/filterActions";
import { getUnit } from "../../redux/actions/productActions";
// web.cjs is required for IE11 support

export const AddPageDelivery = ({
  showModal,
  onCloseModal,
  regions,
  regions_sub,
  amount,
  onClickRegionId,
}) => {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState({
    region_id: 0,
    unit_id: 0,
    amount: amount,
  });
  useEffect(() => {
    dispatch(getLogistSort(filter));
    dispatch(getUnit());
  }, []);

  const sortLists = useSelector((state) => state.filter.logistSort);
  const units = useSelector((state) => state.product.unitList);

  return (
    <Modal open={showModal} onClose={onCloseModal} center>
      <div className="flex flex-col justify-between h-full AddPageDelivery">
        <div className="delivery__box">
          <div className="flex justify-end delivery__cancel"></div>
          <div className="delivery__title flex items-center justify-between">
            <h5>Укажите регион</h5>
            <select
              onChange={(e) => {
                let newFilter = {
                  ...filter,
                  unit_id: e.target.value,
                };
                setFilter(newFilter);
                dispatch(getLogistSort(newFilter));
              }}
              className="text-base"
            >
              {units?.map((unit, idx) => (
                <option key={idx} value={unit.id}>
                  {unit.name}
                </option>
              ))}
            </select>
          </div>
          <Tabs>
            {/* <TabList
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Tab
                className="btn1"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Пункт выдачи
              </Tab>
              <Tab
                className="btn2"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Курьером
              </Tab>
            </TabList> */}
            <div className="delivery__select my-4">
              <div>
                <span className="mt-2">Выберите страну</span>
                <select
                  className="mt-1"
                  name=""
                  id=""
                  onChange={(e) => {
                    let newFilter = {
                      ...filter,
                      region_id: e.target.value,
                    };

                    setFilter(newFilter);
                    onClickRegionId(e.target.value);
                  }}
                >
                  <option value="">Выбрерите</option>
                  {regions.map((region) => (
                    <option value={region.id} key={region.id}>
                      {region.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <span className="mt-2">Выберите город</span>
                <select
                  onChange={(e) => {
                    let newFilter = {
                      ...filter,
                      region_id: e.target.value,
                    };

                    setFilter(newFilter);
                    dispatch(getLogistSort(newFilter));
                  }}
                  className="mt-1"
                  name=""
                  id=""
                >
                  <option value="">Выберите</option>
                  {regions_sub.map((item) => (
                    <option value={item.id} key={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <TabPanel className="mt-4">
              {sortLists?.map((logist, idx) => (
                <label className="flex items-center mb-3 punkt">
                  <input className="mr-4" name="company" type="radio" />
                  {logist.name} - {logist.logistRegions?.tariffs?.price} (
                  {logist.logistRegions?.tariffs?.unit})
                </label>
              ))}
            </TabPanel>
            <TabPanel className="inputs">
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
            </TabPanel>
          </Tabs>
        </div>
        <div className="delivery__bottom">
          {/* <button className="delivery__pick mb-2 w-full">
            Выбрать на карте
          </button> */}
          <div className="flex justify-between">
            <button className="save" type="submit">
              Сохранить
            </button>
            <button onClick={onCloseModal} className="cancel">
              Отменить
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
