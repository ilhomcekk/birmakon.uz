import React from "react";
import { Link, useLocation } from "react-router-dom";
import { MContainer } from "../../element/Elemens";
import "../../assets/scss/_second-nav-bar.scss";
import { AiOutlineFileText } from "react-icons/ai";
import { MdFavoriteBorder, MdHome } from "react-icons/md";
import { IoBagHandleOutline } from "react-icons/io";
import { BiMessageAltDetail } from "react-icons/bi";
import { FaRegUser } from "react-icons/fa";
import { BsCreditCardFill, BsBagDash } from "react-icons/bs";
import { useSelector } from "react-redux";

export default function SecondNavbar() {
  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/");
  const { reduxToken } = useSelector((state) => state.user);
  const user = useSelector((state) => state.user.user);

  return (
    <>
      {reduxToken && (
        <div className="info__menu">
          <MContainer>
            <ul>
              <Link
                className={`logo__svg ${
                  splitLocation[1] === "info" ? "second__active" : ""
                }`}
                to="/info"
              >
                <MdHome className="mr-2" size={26} />
                <span>Главная</span>
              </Link>
              <Link
                className={`logo__svg ${
                  splitLocation[1] === "selected" ? "second__active" : ""
                }`}
                to="/selected"
              >
                <MdFavoriteBorder className="mr-2" size={24} />
                <span>Избранные</span>
              </Link>
              <Link
                className={`logo__svg ${
                  splitLocation[1] === "deliverycart" ? "second__active" : ""
                }`}
                to="/deliverycart"
              >
                <BsBagDash className="mr-2" size={24} />
                <span>Мои заказы</span>
              </Link>
              <Link
                className={`logo__svg ${
                  splitLocation[1] === "message" ? "second__active" : ""
                }`}
                to="/message"
              >
                <BiMessageAltDetail className="mr-2" size={24} />
                <span>Мои сообщения</span>
              </Link>
              {user?.type === "yur" && (
                <Link
                  className={`logo__svg ${
                    splitLocation[1] === "contract" ? "second__active" : ""
                  }`}
                  to="/contract"
                >
                  <AiOutlineFileText className="mr-2" size={24} />
                  <span>Мои договоры</span>
                </Link>
              )}
              <Link
                className={`logo__svg ${
                  splitLocation[1] === "payments" ? "second__active" : ""
                }`}
                to="/payments"
              >
                <BsCreditCardFill className="mr-2" size={24} />
                <span>Мои платежи</span>
              </Link>
              <Link
                className={`logo__svg ${
                  splitLocation[1] === "cabinet" ? "second__active" : ""
                }`}
                to="/cabinet"
              >
                <FaRegUser className="mr-2" size={24} />
                <span>Мои данные</span>
              </Link>
            </ul>
          </MContainer>
        </div>
      )}
    </>
  );
}
