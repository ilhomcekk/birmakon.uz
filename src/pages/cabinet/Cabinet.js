import React from "react";
import "../../assets/scss/_cabinet.scss";
import SecondNavbar from "../../component/layout/SecondNavbar";
// import { updateProfile } from "../../redux/actions/userActions";
import { useSelector } from "react-redux";
import UpdateProfile from "./UpdateProfile";
import { useDispatch } from "react-redux";
import { updateProfile } from "../.././redux/actions/userActions";

export default function Cabinet() {
  const dispatch = useDispatch();

  const updateUser = useSelector((state) => state.user.user);
  const { reduxToken } = useSelector((state) => state.user);
  return (
    <>
      {reduxToken ? (
        <>
          <SecondNavbar />
          {updateUser?.id && (
            <UpdateProfile
              updateUser={updateUser}
              onClickUpdateData={(updateProfileData) => {
                dispatch(updateProfile(updateProfileData));
              }}
            />
          )}
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
