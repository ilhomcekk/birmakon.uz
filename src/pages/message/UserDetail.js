import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import tab1Img from "../../assets/images/Vector (10).png";
import tab2Img from "../../assets/images/Vector (11).png";
import { useDispatch, useSelector } from "react-redux";
import {
  backFirstChat,
  chatCreate,
  chatDetail,
  // chatDetail,
  // chatMarkets,
} from "../../redux/actions/userActions";
import "../../assets/scss/_message.scss";
import { Container } from "@mui/material";
import { BsBoxArrowLeft } from "react-icons/bs";
const API = `${process.env.REACT_APP_API_DOMAIN}`;

const UserDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const { pathname } = location;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState(null);
  const [value, setValue] = useState("");
  const [file, setFile] = useState();
  useEffect(() => {
    // dispatch(chatMarkets());
    dispatch(chatDetail(""));
  }, [id]);
  const handleChange = (e) => {
    const f = e.target.files[0];
    // const f = e.target.value;
    setFile(f);
  };
  // const markets = useSelector((state) => state.user.chatMarkets);
  const messages = useSelector((state) => state.user.messageList);
  const detail = useSelector((state) => state.user.chatDetail);
  const firstChat = useSelector((state) => state.user.firstChat);
  var res = firstChat?.reduceRight(function (arr, last, index, coll) {
    return (arr = arr?.concat(last));
  }, []);
  useEffect(() => {
    if (firstChat[0]?.messageRoom?.id) {
      navigate(`/message/detail/${firstChat[0]?.messageRoom?.id}`);
    }
  }, [firstChat]);
  useEffect(() => {
    dispatch(backFirstChat());
  }, [pathname]);
  // const userInfo = useSelector((state) => state.user.user);
  // const filterMarkets = messages?.filter((obj) => {
  //   return obj.type_user === "shop";
  // });
  const { stepChat } = useSelector((state) => state.user);
  // useEffect(() => {
  //   if (stepChat === true && detail?.length > 0) {
  //     setRoomId(detail[0]?.messageRoom?.id);
  //     if (roomId !== null && roomId !== undefined)
  //       navigate("/message/detail/" + roomId);
  //   }
  // }, [id, stepChat]);
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

  return (
    <Container key={id}>
      <Link
        to="/message"
        className="group w-max hover:underline flex items-center"
      >
        <BsBoxArrowLeft className="mr-2" size={22} />
        Все магазины
      </Link>
      <div className="my__message" key={id}>
        <div className="lists my-8">
          <div className="list">
            {/* {markets?.map((market) => (
          <div key={market.id} className="new__list">
            <div className="rectangle">
              <img
                className="h-full w-full object-contain"
                src={API + market.photo}
                alt=""
              />
            </div>
            <p>{market.name}</p>
          </div>
        ))} */}
          </div>
          <div className="message__shadow">
            <div className="title flex items-center">
              {detail?.length > 0 && (
                <>
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
                </>
              )}
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
              {res?.length > 0 ? (
                res?.map((message, idx) => (
                  <div key={idx}>
                    {/* <p key={idx}>{message.message}</p> */}
                    <div className="text-sm text-center px-2">
                      {message?.date}
                    </div>
                    <div className="admin__text">
                      {message.message}
                      <img
                        id="avatarImage"
                        src={API + message.filePath}
                        alt=""
                      />
                    </div>
                  </div>
                ))
              ) : (
                <div
                  style={{ height: "-webkit-fill-available", display: "flex" }}
                  className="write-gif-div"
                >
                  <iframe
                    src="https://giphy.com/embed/lebpnk3qVPAjBxIKKc"
                    width="480"
                    height="315"
                    className="write-gif m-auto"
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
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
                        getter_id: id,
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

export default UserDetail;
