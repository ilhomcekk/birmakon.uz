import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import tab1Img from "../../assets/images/Vector (10).png";
import tab2Img from "../../assets/images/Vector (11).png";
import { AiOutlineRight } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  chatCreate,
  chatDetail,
  chatMarkets,
} from "../../redux/actions/userActions";
import Title from "../../component/Title/Title";
import "../../assets/scss/_message.scss";
import SecondNavbar from "../../component/layout/SecondNavbar";
const API = `${process.env.REACT_APP_API_DOMAIN}`;

const MessageTab2 = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const [file, setFile] = useState();
  useEffect(() => {
    dispatch(chatMarkets());
    // dispatch(chatDetail(id));
  }, []);
  const handleChange = (e) => {
    const f = e.target.files[0];
    // const f = e.target.value;
    setFile(f);
  };
  const markets = useSelector((state) => state.user.chatMarkets);
  const messages = useSelector((state) => state.user.messageList);
  const detail = useSelector((state) => state.user.chatDetail);
  const userInfo = useSelector((state) => state.user.user);
  const filterMarkets = messages?.filter((obj) => {
    return obj.type_user === "shop";
  });

  return (
    <>
      <div className="my__message">
        <div className="lists my-8">
          <div className="list !flex mr-4">
            {/* <div className="new__list">
            <i className="next next__page">
              <AiOutlineRight size={30} fill="white" />
            </i>
          </div> */}
            {markets?.length > 0
              ? markets?.map((market) => (
                  <Link
                    to={`/message/detail/` + market.id}
                    key={market.id}
                    className="new__list md:mr-12 mr-6"
                  >
                    <div className="rectangle">
                      <img
                        className="h-full w-full object-contain"
                        src={API + market.photo}
                        alt=""
                      />
                    </div>
                    <p>{market.name}</p>
                  </Link>
                ))
              : "Магазинов пока нет"}
          </div>
          {/* <div className="message__shadow">
          <div className="title">По магазинам</div>
          <div className="message__shadow-message">
            {filterMarkets.map((message, idx) => (
              <div key={idx}>
                <p key={idx}>{message.message}</p>
                <div className="admin__text">
                  {message.message}
                  <img src={API + message.filePath} alt="" />
                </div>
              </div>
            ))}
          </div>
          <div className="container mx-auto px-0">
            <div className="send">
              <form>
                <div className="relative">
                  <input
                    onChange={(e) => handleChange(e)}
                    multiple={false}
                    className="absolute top-0 right-0 bottom-0 left-0 opacity-0 h-full w-full"
                    type="file"
                  />
                  <img src={tab1Img} alt="not found" />
                </div>
                <input
                  onChange={(e) => setValue(e.target.value)}
                  type="text"
                  placeholder="Ваше сообщение"
                />
              </form>
              <img
                onClick={() => {
                  dispatch(
                    chatCreate({
                      type_user: "shop",
                      message: value,
                      getter_id: 114,
                      filePath: file,
                    })
                  );
                }}
                src={tab2Img}
                alt="not found"
                className="send"
              />
            </div>
          </div>
        </div> */}
        </div>
      </div>
    </>
  );
};

export default MessageTab2;
