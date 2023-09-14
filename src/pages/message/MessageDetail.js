import React, { useEffect, useState } from "react";
import tab1Img from "../../assets/images/Vector (10).png";
import tab2Img from "../../assets/images/Vector (11).png";
import { AiOutlineRight } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  chatCreate,
  chatDetail,
  chatMarkets,
  removeChatRoom,
} from "../../redux/actions/userActions";
import { BsBoxArrowLeft, BsTrash } from "react-icons/bs";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../../assets/scss/_message.scss";
import { Container, width } from "@mui/system";
import { IconButton } from "@mui/material";
const API = `${process.env.REACT_APP_API_DOMAIN}`;

const MessageDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [file, setFile] = useState();
  useEffect(() => {
    dispatch(chatMarkets());
    dispatch(chatDetail(id));
  }, []);
  const handleValue = (e) => {
    setValue(e);
  };
  const onImageChange = (file, element) => {
    const fileReader = new FileReader();
    fileReader.addEventListener("load", function (e) {
      element.src = e.target.result;
    });
    fileReader.readAsDataURL(file);
    setFile(file);
  };
  const markets = useSelector((state) => state.user.chatMarkets);
  const messages = useSelector((state) => state.user.messageList);
  const detail = useSelector((state) => state.user.chatDetail);
  var res = detail?.reduceRight(function (arr, last, index, coll) {
    return (arr = arr?.concat(last));
  }, []);
  const userInfo = useSelector((state) => state.user.user);
  const users = useSelector((state) => state.user.chatUsers);
  const filterMarkets = messages?.filter((obj) => {
    return obj.type_user === "shop";
  });
  const { chatRoomStep } = useSelector((state) => state.user);
  useEffect(() => {
    if (chatRoomStep === true) {
      navigate("/message");
    }
  }, [chatRoomStep, id]);

  const { stepChat } = useSelector((state) => state.user);
  useEffect(() => {
    if (stepChat === true) {
      dispatch(chatDetail(id));
    }
  }, [stepChat]);

  return (
    <Container maxWidth="xl">
      <Link
        to="/message"
        className="group w-max hover:underline flex items-center"
      >
        <BsBoxArrowLeft className="mr-2" size={22} />
        Все магазины
      </Link>
      <div className="my__message">
        <div className="lists my-8">
          <div className="list">
            {/* {markets?.map((market) => (
              <Link
                to={`/message/detail/` + market.id}
                key={market.id}
                className="new__list"
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
            ))} */}
          </div>
          <div className="message__shadow">
            <div className="title flex items-center justify-between">
              <div className="text-white flex items-center">
                <img
                  style={{
                    width: "50px",
                    height: "50px",
                    objectFit: "cover",
                    borderRadius: "50%",
                    marginRight: "12px",
                  }}
                  src={API + detail[0]?.getter?.photo}
                  alt=""
                />
                {detail[0]?.getter?.name}
              </div>
              <div>
                <IconButton
                  onClick={() => dispatch(removeChatRoom({ id: id }))}
                  className="group"
                >
                  <BsTrash
                    className="group-hover:fill-red-500 fill-white"
                    size={26}
                  />
                </IconButton>
              </div>
            </div>
            <div className="message__shadow-message">
              {/* {filterMarkets.map((message, idx) => (
              <div key={idx}>
                <p key={idx}>{message.message}</p>
                <div className="admin__text">
                  {message.message}
                  <img src={API + message.filePath} alt="" />
                </div>
              </div>
            ))} */}
              {res?.map((message, idx) => (
                <div key={idx}>
                  <div className="text-sm text-center px-2">
                    {message?.date}
                  </div>
                  {message.status === 1 && <p key={idx}>{message.message}</p>}
                  {message.status === 0 && (
                    <div className="admin__text">
                      {message.message}
                      <img
                        id="avatarImage"
                        src={API + message.filePath}
                        alt=""
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="container mx-auto px-0">
              <div className="send">
                <form>
                  <div className="relative">
                    <input
                      onChange={(e) =>
                        onImageChange(
                          e.target.files[0]
                          // document.querySelectorAll("#avatarImage")[0]
                        )
                      }
                      className="absolute top-0 right-0 bottom-0 left-0 opacity-0 h-full w-full"
                      type="file"
                    />
                    <img src={tab1Img} alt="not found" />
                  </div>
                  <input
                    type="text"
                    placeholder="Ваше сообщение"
                    minLength={1}
                    value={value}
                    onChange={(e) => handleValue(e.target.value)}
                  />
                </form>
                <img
                  onClick={() => {
                    setValue("");
                    dispatch(
                      chatCreate({
                        type_user: "shop",
                        message: value,
                        getter_id: detail[0]?.messageRoom?.getter_id,
                        file: file,
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
};

export default MessageDetail;
