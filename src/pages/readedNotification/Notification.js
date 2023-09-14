import { Container } from "@mui/system";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import PreLoader from "../../component/PreLoader/PreLoader";
import { MContainer } from "../../element/Elemens";
import { getReaded, getReadedDetail } from "../../redux/actions/userActions";

const Notification = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getReaded());
    dispatch(getReadedDetail(id));
  }, [id]);
  const readeds = useSelector((state) => state.user.typeReaded);
  const readedDetail = useSelector((state) => state.user.detailData);
  const { loading } = useSelector((state) => state.user);

  return (
    <MContainer className="md:py-16 py-8">
      {loading && <PreLoader />}
      {!loading && (
        <div className="shadow-md" key={id}>
          <div
            className="readed-user-box flex p-6 shadow-md mb-10"
            style={{ background: "rgba(0, 0, 255, 0.1)" }}
          >
            <img
              src="http://localhost:3000/static/media/11%20122001.d8928ceb59bfc99ddb08.png"
              alt=""
              style={{ width: "120px", borderRadius: "50%" }}
            />
            <div className="ml-5 py-2 flex flex-col justify-between">
              <div className="font-bold text-xl leading-none">
                {readedDetail.message}
              </div>
              <div className="text-sm text-gray-600">{readedDetail.date}</div>
            </div>
          </div>
          {readeds?.map((readed, idx) => (
            <div key={idx} className="readed-user-box flex p-6 shadow-md mb-10">
              <img
                src="http://localhost:3000/static/media/11%20122001.d8928ceb59bfc99ddb08.png"
                alt=""
                style={{ width: "120px", borderRadius: "50%" }}
              />
              <div className="ml-5 py-2 flex flex-col justify-between">
                <div className="font-bold text-xl leading-none">
                  {readed.message}
                </div>
                <div className="text-sm text-gray-600">{readed.date}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </MContainer>
  );
};

export default Notification;
