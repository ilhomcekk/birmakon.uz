import React, { useEffect, useState } from "react";
import tab1Img from "../../assets/images/Vector (10).png";
import tab2Img from "../../assets/images/Vector (11).png";
import { AiOutlineRight } from "react-icons/ai";
import {
  chatAdmins,
  chatCreate,
  chatDetail,
  createChatAdmin,
  getMe,
} from "../../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import "../../assets/scss/_message.scss";
import { Container } from "@mui/system";
import { Link, useLocation } from "react-router-dom";
const API = `${process.env.REACT_APP_API_DOMAIN}`;

export default function MessageTab3() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { pathname } = location;
  const [value, setValue] = useState("");
  const [file, setFile] = useState();

  const chatAdminsData = useSelector((state) => state.user.chatAdmin);

  useEffect(() => {
    dispatch(chatAdmins());
    dispatch(getMe());
  }, []);

  const admin = useSelector((state) => state.user.chatAdmin);
  useEffect(() => {
    if (admin) {
      dispatch(chatDetail(admin[0]?.id));
    }
  }, [admin]);
  const messagesList = useSelector((state) => state.user.adminList);
  const profile = useSelector((state) => state.user.user);
  const chatDetailOne = useSelector((state) => state.user.chatDetail);
  var res = chatDetailOne?.reduceRight(function (arr, last, index, coll) {
    return (arr = arr?.concat(last));
  }, []);

  return (
    <Container>
      {pathname === "/message/admin" && (
        <div className="pages-link flex items-center gap-1">
          <Link className="text-gray-400" to="/">
            Главная /
          </Link>
          <div>сообщение админу</div>
        </div>
      )}
      <div className="my__message">
        <div className="lists my-8">
          <div className="list mr-4"></div>
          <div className="message__shadow">
            <div className="title flex items-center justify-start gap-x-2">
              {chatAdminsData[0]?.photo && (
                <img
                  src={API + chatAdminsData[0]?.photo}
                  className="rounded-full"
                  style={{ minWidth: "50px", width: "50px", height: "50px" }}
                  alt=""
                />
              )}
              {chatAdminsData[0]?.name ? chatAdminsData[0]?.name : "По админам"}
            </div>
            <div className="message__shadow-message">
              <div>
                {res?.map((item, idx) => (
                  <div key={idx}>
                    <div className="text-center text-sm">{item?.date}</div>
                    {item?.messageRoom?.sender_id == profile?.id ? (
                      <div className="admin__text">{item?.message}</div>
                    ) : (
                      <p>{item?.message}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="container mx-auto px-0">
              <div className="send">
                <form>
                  {/* <div className="relative">
                <input
                  onChange={(e) => handleChange(e)}
                  multiple={false}
                  className="absolute top-0 right-0 bottom-0 left-0 opacity-0 h-full w-full"
                  type="file"
                />
                <img src={tab1Img} alt="not found" />
              </div> */}
                  <input
                    onChange={(e) => setValue(e.target.value)}
                    type="text"
                    placeholder="Ваше сообщение"
                    value={value}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        event.preventDefault();
                        setValue("");
                        dispatch(
                          chatCreate({
                            getter_id: 1,
                            message: value,
                            type_user: "admin",
                          })
                        );
                      }
                    }}
                  />
                </form>
                <img
                  onClick={() => {
                    setValue("");
                    dispatch(
                      chatCreate({
                        getter_id: 1,
                        message: value,
                        type_user: "admin",
                      })
                    );
                  }}
                  src={tab2Img}
                  alt="not found"
                  className="send"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
