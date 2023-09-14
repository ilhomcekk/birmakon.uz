import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosClose } from "react-icons/io";
import "../../assets/scss/_register.scss";
import { useDispatch, useSelector } from "react-redux";
import requests from "../../helpers/requests";
import { toast } from "react-toastify";
import PhoneInput from "react-phone-input-2";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState();
  const token = window.localStorage.getItem("@token");
  const { loginStep } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const { loading } = useSelector((state) => state.auth);

  // useEffect(() => {
  //   if (loginStep === 2) {
  //     navigate('/');
  //     window.location.reload();
  //   }
  // }, [loginStep]);

  const authSignIn = (params) => {
    dispatch({ type: "auth_login_start", payload: params });

    requests
      .authSignIn(params)
      .then(({ data }) => {
        dispatch({ type: "auth_login_success", payload: data });
        toast.success("Успешно");
        navigate("/");
        window.location.reload();
      })
      .catch(({ response }) => {
        let message =
          response.data.errors.password && "Не верный логин и/или пароль";
        toast.error(message);
        // toast.error("Вам нужно зарегистрироваться");

        dispatch({ type: "auth_login_error", payload: message });
      });
  };

  return (
    <div className="register-box__box fixed top-0 right-0 bottom-0 left-0 z-10 flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 w-3/12 rounded-md mt-4 text-left bg-white shadow-lg register__box">
        <div className="flex float-right">
          <Link to="/">
            <IoIosClose className="x-close-register" fill="#000" color="#000" />
          </Link>
        </div>
        <div>
          <div className="mt-4">
            {/* <div>
              <label className="block" htmlFor="email">
                Имя
              </label>
              <input
                type="text"
                placeholder="Ваше имя"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none"
              />
            </div> */}
            <div className="mt-4">
              <label className="block">Номер</label>
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
                type="text"
                placeholder="Ваш номер"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none"
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              /> */}
            </div>
            <div className="mt-4">
              <label className="block">Пароль</label>
              <div className="relative mt-2">
                <input
                  type={`${showPassword ? "text" : "password"}`}
                  placeholder="Ваш пароль"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  onKeyPress={(e: KeyboardEvent<HTMLDivElement>) =>
                    e.key == "Enter" &&
                    dispatch(authSignIn({ phone, password }))
                  }
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
            <Link
              to="/recovery"
              className="block text-right hover:underline text-sm mt-2"
            >
              забыли пароль
            </Link>
            <div className="flex items-baseline justify-between">
              <button
                type="submit"
                className="px-6 py-2 w-full mt-4 text-white"
                onClick={() => {
                  dispatch(authSignIn({ phone: `+${phone}`, password }));
                }}
              >
                {!loading ? "Продолжить" : "Loading"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
