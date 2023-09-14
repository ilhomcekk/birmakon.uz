import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import cabinetEdit from "../../assets/images/Vector (31).png";
import "../../assets/scss/_cabinet.scss";
import { MContainer } from "../../element/Elemens";
import { removeAccount } from "../../redux/actions/authActions";
const API = `${process.env.REACT_APP_API_DOMAIN}`;
const token = window.localStorage.getItem("@token");

const UpdateProfile = ({ updateUser, onClickUpdateData }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState(updateUser.name);
  const [email, setEmail] = useState(updateUser.email);
  const [phone, setPhone] = useState(updateUser.phone);
  const [photo, setPhoto] = useState(API + updateUser.photo);
  const [birthday, setBirthday] = useState(updateUser.birthday);
  const [gender, setGender] = useState(updateUser.gender);
  const [inn, setInn] = useState(updateUser.inn);
  const [account, setAccount] = useState(updateUser.account);
  const [okohx, setOkohx] = useState(updateUser.okohx);
  const [bank, setBank] = useState(updateUser.bank);
  const [mfo, setMfo] = useState(updateUser.mfo);
  const [oked, setOked] = useState(updateUser.oked);
  const [address_legal, setAddressLegal] = useState(updateUser.address_legal);
  const [last_address, setLastAddress] = useState(updateUser.last_address);
  const [type_user, setTypeUser] = useState(updateUser.type);

  const onImageChange = (file, element) => {
    const fileReader = new FileReader();
    fileReader.addEventListener("load", function (e) {
      element.src = e.target.result;
    });
    fileReader.readAsDataURL(file);
    setPhoto(file);
  };

  const genders = [
    {
      id: 1,
      label: "Муж.",
    },
    {
      id: 2,
      label: "Жен.",
    },
  ];

  return (
    <MContainer>
      <div className="user__cabinet mb-12" style={{ minHeight: '70vh' }}>
        <div className="user">
          <div className="flex items-center">
            <div className="user__img relative">
              <input
                id="photo"
                onChange={(e) =>
                  onImageChange(
                    e.target.files[0],
                    document.querySelectorAll("#avatarImage")[0]
                  )
                }
                className="absolute top-0 right-0 bottom-0 left-0"
                style={{ zIndex: "10", opacity: 0, cursor: "pointer" }}
                type="file"
                accept="image/png, image/jpeg"
              />
              <label onChange={onImageChange} htmlFor="photo">
                <img id="avatarImage" src={photo} alt="not found" />
              </label>
            </div>
            <input
              defaultValue={updateUser?.name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              type="text"
              id="userName"
              className="user__name"
            />
            <label htmlFor="userName">
              <img
                className="cursor-pointer"
                src={cabinetEdit}
                alt="not found"
              />
            </label>
          </div>
          {/* <div className="w-full md:w-1/4 ml-auto">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                {updateUser?.type == null
                  ? "Тип пользователя"
                  : updateUser?.type}
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                size="small"
                label={
                  updateUser?.type == null
                    ? "Тип пользователя"
                    : updateUser?.type
                }
                onChange={(e) => setTypeUser(e.target.value)}
              >
                <MenuItem value={"yur"}>Юридическое лицо</MenuItem>
                <MenuItem value={"fiz"}>Физическое лицо</MenuItem>
              </Select>
            </FormControl>
          </div> */}
        </div>
        <div className="info__box">
          <div className="info__user">
            <div className="title">Э-маил</div>
            <div className="change">
              <input
                id="email"
                type="email"
                defaultValue={updateUser?.email || "@gmail.com"}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <label htmlFor="email">
                <img src={cabinetEdit} alt="not found" />
              </label>
            </div>
          </div>
          <div className="info__user">
            <div className="title">Телефон</div>
            <div className="change">
              <input
                id="phone"
                type="phone"
                defaultValue={updateUser?.phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              />
              <label htmlFor="phone">
                <img src={cabinetEdit} alt="not found" />
              </label>
            </div>
          </div>
          <div className="info__user">
            <div className="title">Дата рождения</div>
            <div className="change">
              <input
                type="date"
                id="birthday"
                defaultValue={updateUser?.birthday}
                onChange={(e) => {
                  setBirthday(e.target.value);
                }}
              />
              <label htmlFor="birthday">
                <img src={cabinetEdit} alt="not found" />
              </label>
            </div>
          </div>
          <div className="info__user">
            <div className="title">Пол</div>
            <div
              onChange={(e) => setGender(e.target.value)}
              className="change inputs !justify-start"
            >
              {genders.map((gen) => (
                <label className="flex items-center">
                  <input
                    value={gen.id}
                    className="mr-2"
                    type="radio"
                    name="name"
                    defaultChecked={gender === gen.id}
                  />
                  {gen.label}
                </label>
              ))}
            </div>
          </div>
          <div className="info__user">
            <div className="title">Адрес</div>
            <div className="change">
              <input
                defaultValue={updateUser?.last_address}
                id="lastAdres"
                type="text"
                placeholder="Адрес"
                onChange={(e) => setLastAddress(e.target.value)}
              />
              <label htmlFor="lastAdres">
                <img src={cabinetEdit} alt="not found" />
              </label>
            </div>
          </div>
          {updateUser?.type === "yur" && (
            <>
              <div className="info__user">
                <div className="title">ИНН</div>
                <div className="change">
                  <input
                    defaultValue={updateUser?.inn}
                    onChange={(e) => {
                      if (type_user === "yur") {
                        setInn(e.target.value);
                      }
                    }}
                    id="inn"
                    type="text"
                    placeholder="inn"
                  />
                  <label htmlFor="inn">
                    <img src={cabinetEdit} alt="not found" />
                  </label>
                </div>
              </div>
              <div className="info__user">
                <div className="title">Аккаунт</div>
                <div className="change">
                  <input
                    defaultValue={updateUser?.account}
                    onChange={(e) => {
                      if (type_user === "yur") {
                        setAccount(e.target.value);
                      }
                    }}
                    id="account"
                    type="text"
                    placeholder="account"
                  />
                  <label htmlFor="account">
                    <img src={cabinetEdit} alt="not found" />
                  </label>
                </div>
              </div>
              <div className="info__user">
                <div className="title">OKOHX</div>
                <div className="change">
                  <input
                    defaultValue={updateUser?.okohx}
                    onChange={(e) => {
                      if (type_user === "yur") {
                        setOkohx(e.target.value);
                      }
                    }}
                    id="okoxh"
                    type="text"
                    placeholder="okoxh"
                  />
                  <label htmlFor="okoxh">
                    <img src={cabinetEdit} alt="not found" />
                  </label>
                </div>
              </div>
              <div className="info__user">
                <div className="title">Наименование банка</div>
                <div className="change">
                  <input
                    defaultValue={updateUser?.bank}
                    onChange={(e) => {
                      if (type_user === "yur") {
                        setBank(e.target.value);
                      }
                    }}
                    id="bank"
                    type="text"
                    placeholder="bank"
                  />
                  <label htmlFor="bank">
                    <img src={cabinetEdit} alt="not found" />
                  </label>
                </div>
              </div>
              <div className="info__user">
                <div className="title">МФО</div>
                <div className="change">
                  <input
                    defaultValue={updateUser?.mfo}
                    onChange={(e) => {
                      if (type_user === "yur") {
                        setMfo(e.target.value);
                      }
                    }}
                    id="mfo"
                    type="text"
                    placeholder="mfo"
                  />
                  <label htmlFor="mfo">
                    <img src={cabinetEdit} alt="not found" />
                  </label>
                </div>
              </div>
              <div className="info__user">
                <div className="title">ОКЭД</div>
                <div className="change">
                  <input
                    defaultValue={updateUser?.oked}
                    onChange={(e) => {
                      if (type_user === "yur") {
                        setOked(e.target.value);
                      }
                    }}
                    id="oked"
                    type="text"
                    placeholder="oked"
                  />
                  <label htmlFor="oked">
                    <img src={cabinetEdit} alt="not found" />
                  </label>
                </div>
              </div>
              <div className="info__user">
                <div className="title">Юридический адрес</div>
                <div className="change">
                  <input
                    defaultValue={updateUser?.addresses[0]?.address}
                    id="address_legal"
                    type="text"
                    placeholder="Адрес"
                    onChange={(e) => {
                      if (type_user === "yur") {
                        setAddressLegal(e.target.value);
                      }
                    }}
                  />
                  <label htmlFor="address_legal">
                    <img src={cabinetEdit} alt="not found" />
                  </label>
                </div>
              </div>
            </>
          )}
          {/* <div className="info__user">
            <div className="title">Адресы</div>
            <div className="change flex-col">
              <div className="flex items-center">
                <input
                  defaultValue={updateUser.address1}
                  id="address1"
                  type="text"
                  placeholder="Адрес 1"
                  onChange={(e) => setAddress1(e.target.value)}
                />
                <label htmlFor="address1">
                  <img src={cabinetEdit} alt="not found" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  defaultValue={updateUser.address2}
                  id="address2"
                  type="text"
                  placeholder="Адрес 2"
                  onChange={(e) => setAddress2(e.target.value)}
                />
                <label htmlFor="address2">
                  <img src={cabinetEdit} alt="not found" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  defaultValue={updateUser.address3}
                  id="address3"
                  type="text"
                  placeholder="Адрес 3"
                  onChange={(e) => setAddresses?.push(e.target.value)}
                />
                <label htmlFor="address3">
                  <img src={cabinetEdit} alt="not found" />
                </label>
              </div>
            </div>
          </div> */}
          {/* <div className="info__user">
            <div className="title">ФИО руководителя</div>
            <div className="change">
              <p>mironshohnasimov</p>
              <img src={cabinetEdit} alt="not found" />
            </div>
          </div> */}
        </div>
        <div className="flex flex-wrap justify-end">
          {token && (
            <button
              onClick={() => dispatch(removeAccount())}
              className="self-end text-white bg-red-700 hover:bg-red-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-500 dark:red:bg-red-700 dark:focus:ring-red-600"
            >
              Удалить аккаунт
            </button>
          )}
          <button
            type="button"
            className="self-end text-sky-700 hover:bg-blue-100 duration-200 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            onClick={() =>
              onClickUpdateData({
                name,
                email,
                phone,
                birthday,
                photo: photo,
                // address1,
                // address2,
                // address3,
                // address,
                gender,
                inn: inn || '',
                account: account || '',
                okohx: okohx || '',
                bank: bank || '',
                mfo: mfo || '',
                oked: oked || '',
                address_legal: address_legal || '',
                last_address,
                // type: type_user,
              })
            }
          >
            Сохранить
          </button>
        </div>
      </div>
    </MContainer>
  );
};

export default UpdateProfile;
