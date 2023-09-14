import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { MButton } from "../element/Elemens";
import Loading from "../component/Loading";

const ProfileEditComponent = ({
  user_info,
  locations,
  onClickUpdateProfile,
  loading,
}) => {
  const [avatar_url, set_avatar_url] = useState(user_info.avatar_url);
  const [last_name, set_last_name] = useState(user_info.last_name);
  const [first_name, set_first_name] = useState(user_info.first_name);
  const [region, set_region] = useState(user_info.region);
  const [address, set_address] = useState(user_info.address);

  const handleUploadImg = (file, element) => {
    const fileReader = new FileReader();
    fileReader.addEventListener("load", function (e) {
      element.src = e.target.result;
    });
    fileReader.readAsDataURL(file);
    set_avatar_url(file);
  };
  return (
    <div className="profile__edit__page__box">
      <div className="profile__edit__page__user__info">
        <div className="profile__edit__page__avatar__ramci">
          <img
            className="userUpdateImg"
            src={user_info.avatar_url}
            alt="User image"
            id="avatarImage"
          />
          <label className="profile__edit__page__avatar__icon" htmlFor="file">
            <IoMdAdd size={50} style={{ color: "white" }} />
          </label>
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            onChange={(e) => {
              handleUploadImg(
                e.target.files[0],
                document.querySelectorAll("#avatarImage")[0]
              );
            }}
          />
        </div>
        <div className="profile__edit__page__user__info__fullName">
          <label
            htmlFor="fullName"
            className="profile__edit__page__user__edit__label"
          >
            Ism
            <MdEdit
              size={20}
              className="profile__edit__page__user__edit__icon"
            />
          </label>
          <input
            id="fullName"
            className="profile__edit__page__user__fullName__edit"
            defaultValue={user_info.last_name}
            onChange={(e) => {
              set_last_name(e.target.value);
            }}
          />
        </div>
      </div>

      <div className="profile__edit__page__user__informatsions">
        <div className="profile__edit__page__user__element__edit">
          <label htmlFor="first_name" className="profile__edit__page__label">
            Familya
            <MdEdit
              size={20}
              className="profile__edit__page__user__edit__icon"
            />
          </label>
          <input
            defaultValue={user_info.first_name}
            id="first_name"
            onChange={(e) => {
              set_first_name(e.target.value);
            }}
          />
        </div>

        <div className="profile__edit__page__user__element__edit">
          <label htmlFor="region_id" className="profile__edit__page__label">
            Viloyatni tanlang
            <MdEdit
              size={20}
              className="profile__edit__page__user__edit__icon"
            />
          </label>
          <select
            id="region_id"
            defaultValue={user_info.region}
            onChange={(e) => {
              set_region(e.target.value);
            }}
          >
            {locations.map((location, index) => (
              <option key={index} value={location._id}>
                {location.name}
              </option>
            ))}
          </select>
        </div>

        <div className="profile__edit__page__user__element__edit">
          <label htmlFor="address" className="profile__edit__page__label">
            Manzilingiz
            <MdEdit
              size={20}
              className="profile__edit__page__user__edit__icon"
            />
          </label>
          <input
            defaultValue={user_info.address}
            id="address"
            placeholder="Manzilingizni kiriting"
            onChange={(e) => {
              set_address(e.target.value);
            }}
          />
        </div>

        <div className="profile__edit__page__user__element__edit">
          <label htmlFor="first_name" className="profile__edit__page__label">
            Telefon raqam
            <MdEdit
              size={20}
              className="profile__edit__page__user__edit__icon"
            />
          </label>
          <input
            defaultValue={user_info.username}
            id="first_name"
            disabled
            placeholder="Manzilingizni kiriting"
          />
        </div>

        <div className="profile__edit__page__user__element__edit">
          <MButton
            disabled={loading}
            onClick={() => {
              onClickUpdateProfile({
                avatar_url,
                last_name,
                first_name,
                region,
                address,
              });
            }}
          >
            {loading ? (
              <Loading />
            ) : (
              <div className="button__box__none__loading"></div>
            )}
            Saqlash
          </MButton>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditComponent;
