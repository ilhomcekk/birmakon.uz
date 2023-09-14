import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosClose } from "react-icons/io";
import "../../assets/scss/_register.scss";
import { useDispatch, useSelector } from "react-redux";
import requests from "../../helpers/requests";
import { toast } from "react-toastify";
import { recoveryAccount, recoveryCode } from "../../redux/actions/userActions";
import PhoneInput from "react-phone-input-2";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import Modal from "react-responsive-modal";
import { Button } from "@mui/material";

export default function Recovery() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [phone, setPhone] = useState();
  const [code, setCode] = useState();
  const token = window.localStorage.getItem("@token");
  const { recoveryAccountStep } = useSelector((state) => state.user);
  const { recoveryAccountLoading } = useSelector((state) => state.user);
  const recoveryCodeRedux = useSelector((state) => state.user.recoveryCode);
  const [showPassword, setShowPassword] = useState(false);
  const { loginStep } = useSelector((state) => state.auth);
  const [modal, setModal] = useState(false);
  const onClose = () => {
    setModal(false);
  };

  const authSignIn = (params) => {
    dispatch({ type: "auth_login_start", payload: params });

    requests
      .authSignIn(params)
      .then(({ data }) => {
        dispatch({ type: "auth_login_success", payload: data });
        toast.success("Успешно");
      })
      .catch(({ response }) => {
        let message = (response && response.data.message) || "Login error";
        toast.error(message);
        // toast.error("Вам нужно зарегистрироваться");

        dispatch({ type: "auth_login_error", payload: message });
      });
  };

  useEffect(() => {
    if (recoveryAccountStep === 2) {
      authSignIn({
        phone: recoveryCodeRedux.phone,
        password: recoveryCodeRedux.password,
      });
      // toast.success(`Ваш код: ${recoveryCodeRedux?.password}`);
      if (loginStep === 2) {
        setModal(true);
      }
      // setTimeout(() => {
      //   window.location.reload();
      // }, 3000);
      // navigate("/");
    }
  }, [recoveryAccountStep, loginStep]);

  return (
    <>
      <Modal open={modal} center>
        <div className="error-modal">
          <div className="text-xl my-16">
            Ваш код: {recoveryCodeRedux?.password}
          </div>
          <div className="w-full">
            <Button
              className="w-full"
              onClick={() => {
                navigate("/");
                window.location.reload();
              }}
              variant="contained"
              color="primary"
            >
              Ок
            </Button>
          </div>
        </div>
      </Modal>
      <div className="register-box__box fixed top-0 right-0 bottom-0 left-0 z-10 flex items-center justify-center min-h-screen bg-gray-100">
        <div className="px-8 py-6 w-3/12 rounded-md mt-4 text-left bg-white shadow-lg register__box">
          <div className="flex float-right">
            <Link to="/">
              <IoIosClose
                className="x-close-register"
                fill="#000"
                color="#000"
              />
            </Link>
          </div>
          <form action="">
            <div className="mt-4">
              <div>
                <label className="block font-size text-sm" htmlFor="email">
                  Номер телефона
                </label>
                <PhoneInput
                  name="multipleErrorInput4"
                  autoCorrect="off"
                  containerClass="mt-2"
                  country={"uz"}
                  onlyCountries={["uz"]}
                  countryCodeEditable={false}
                  value={phone}
                  onChange={(e) => setPhone(e)}
                />
                {/* <input
                placeholder="Номер телефона"
                className="w-full px-4 py-2 my-2 border rounded-md focus:outline-none"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              /> */}
                {recoveryAccountStep !== 0 && (
                  <div className="relative">
                    <div className="relative mt-2">
                      <input
                        placeholder="(-xxxxxx-)"
                        type={`${showPassword ? "text" : "password"}`}
                        className="w-full px-4 py-2 mb-2 border rounded-md mt-2 focus:outline-none"
                        onChange={(e) => {
                          setCode(e.target.value);
                        }}
                      />
                      <div
                        className="absolute right-0 top-0 bottom-0 h-full flex items-center justify-center cursor-pointer mr-4"
                        onClick={() => setShowPassword((value) => !value)}
                      >
                        {showPassword ? (
                          <AiFillEyeInvisible size={22} />
                        ) : (
                          <AiFillEye size={22} />
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {/* <span className="mt-2 time">-0.59</span> */}
              <div className="flex">
                {recoveryAccountStep === 0 ? (
                  <div
                    onClick={() => {
                      dispatch(recoveryAccount({ phone: `+${phone}` }));
                    }}
                    className="reg-btnbtn hover:!bg-white hover:!text-sky-700 cursor-pointer text-center text-white w-full py-2 mt-2"
                  >
                    {recoveryAccountLoading ? "Loading" : "Получить код"}
                  </div>
                ) : (
                  <div
                    onClick={() => {
                      dispatch(
                        recoveryCode({ phone: `+${phone}`, code: code })
                      );
                    }}
                    className="reg-btnbtn hover:!bg-white hover:!text-sky-700 cursor-pointer text-center text-white w-full py-2 mt-2"
                  >
                    Переотправить
                  </div>
                )}
              </div>
            </div>
          </form>
          {/* <div>
          <div className="mt-4">
            <div className="mt-4">
              <label className="block">Номер</label>
              <input
                type="text"
                placeholder="Ваш номер"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none"
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              />
            </div>
            <div className="mt-4">
              <label className="block">Пароль</label>
              <input
                type="text"
                placeholder="Ваш пароль"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                onKeyPress={(e: KeyboardEvent<HTMLDivElement>) =>
                  e.key == "Enter" && dispatch(authSignIn({ phone, password }))
                }
              />
            </div>
            <div className="flex items-baseline justify-between">
              <button
                type="submit"
                className="px-6 py-2 w-full mt-4 text-white"
                onClick={() => {
                  dispatch(authSignIn({ phone, password }));
                }}
              >
                Продолжить
              </button>
            </div>
          </div>
        </div> */}
        </div>
      </div>
    </>
  );
}
