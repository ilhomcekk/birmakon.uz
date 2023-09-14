import React, { useEffect, useState } from "react";
import tab1Img from "../../assets/images/Vector (10).png";
import tab2Img from "../../assets/images/Vector (11).png";
import { AiOutlineRight } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  chatCreate,
  chatDetail,
  chatUsers,
} from "../../redux/actions/userActions";
import { useParams } from "react-router-dom";
const API = `${process.env.REACT_APP_API_DOMAIN}`;

export default function MessageTab1() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const [file, setFile] = useState();

  useEffect(() => {
    dispatch(chatUsers());
    dispatch(chatDetail(id));
  }, []);

  const handleChange = (e) => {
    const f = e.target.files[0];
    // const f = e.target.value;
    setFile(f);
  };
  const messages = useSelector((state) => state.user.messageList);
  const userFilter = messages?.filter((obj) => {
    return obj.type_user === "user";
  });
  const userInfo = useSelector((state) => state.user.user);
  const users = useSelector((state) => state.user.chatUsers);
  const detail = useSelector((state) => state.user.chatDetail);

  return (
    <div className="lists my-8">
      <div className="list dots mr-4">
        <div className="new__list">
          <i className="next next__page">
            <AiOutlineRight size={30} fill="white" />
          </i>
        </div>
        {users?.map((user) => (
          <div key={user.id} className="new__list">
            <div className="rectangle">
              <img
                className="h-full w-full object-contain"
                src={API + user.photo}
                alt=""
              />
            </div>
            <p>{user.name}</p>
          </div>
        ))}
      </div>
      <div className="message__shadow">
        <div className="title">По пользователям</div>
        <div className="message__shadow-message">
          {userFilter?.map((message, idx) => (
            <div key={idx}>
              {/* <p key={idx}>{message.message}</p> */}
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
              src={tab2Img}
              alt="not found"
              className="send"
              onClick={() => {
                dispatch(
                  chatCreate({
                    type_user: "user",
                    message: value,
                    getter_id: 100,
                    filePath: file,
                  })
                );
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
