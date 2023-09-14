import React, { useEffect } from "react";
import Title from "../../component/Title/Title";
import { BsFileEarmarkText } from "react-icons/bs";
import { MContainer, Link } from "../../element/Elemens";
import "../../assets/scss/_contract.scss";
import SecondNavbar from "../../component/layout/SecondNavbar";
import { useDispatch, useSelector } from "react-redux";
import { getDocument } from "../../redux/actions/messageActions";

export default function Contract() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDocument());
  }, []);
  const documents = useSelector((state) => state.message.list);
  const { reduxToken } = useSelector((state) => state.user);
  return (
    <>
      {reduxToken ? (
        <>
          <SecondNavbar />
          <MContainer>
            <div className="pages-link mb-4">
              <Link to="/">Главная страница / </Link>
              <Link to="/basket">Корзина</Link>
            </div>
          </MContainer>
          <MContainer style={{ minHeight: "70vh" }}>
            <Title name="Мои договора" />
            {documents?.length > 0 ? (
              <div className="table">
                <table>
                  <thead>
                    <tr className="contract-tr">
                      <th>ИП</th>
                      <th>ID заказа</th>
                      <th>Статус</th>
                      <th>Посмотреть</th>
                    </tr>
                  </thead>
                  <tbody>
                    {documents.map((item) => (
                      <tr>
                        <td>{item.last_message}</td>
                        <td>{item.id}</td>
                        <td className="paid">{item.status}</td>
                        <td className="download">
                          <BsFileEarmarkText className="mr-2" size={24} />
                          Скачать
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="my-12">Пока ничего нет</div>
            )}
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
