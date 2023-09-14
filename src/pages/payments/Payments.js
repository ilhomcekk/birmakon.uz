import React, { useEffect } from "react";
import Title from "../../component/Title/Title";
import { MContainer, MLink } from "../../element/Elemens";
import "../../assets/scss/_payments.scss";
import SecondNavbar from "../../component/layout/SecondNavbar";
import { useDispatch, useSelector } from "react-redux";
import { getTransaction } from "../../redux/actions/orderActions";

export default function Payments() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTransaction());
  }, []);
  const transactions = useSelector((state) => state.order.transactionList);
  const { reduxToken } = useSelector((state) => state.user);

  return (
    <>
      {reduxToken ? (
        <>
          <SecondNavbar />
          <MContainer style={{ minHeight: "70vh" }}>
            <Title name="Мои платежи" />
            <div className="table">
              <table style={{ width: "100%" }}>
                <thead>
                  <tr className="payment-tr">
                    <th>ID заказа</th>
                    <th>Дата платежа</th>
                    <th>Сумма заказа</th>
                    <th>Способ оплаты</th>
                    <th>Статус платежа</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions?.map((trans) => (
                    <tr>
                      <td>№ {trans.id}</td>
                      <td>{trans.order?.date}</td>
                      <td>{trans.order?.price}</td>
                      <td>{trans.order?.payment?.name}</td>
                      <td>{trans.order?.status_payment}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </MContainer>
        </>
      ) : (
        <div
          className="flex items-center justify-center"
          style={{ height: "500px" }}
        >
          Зарегистрируйте
        </div>
      )}
    </>
  );
}
