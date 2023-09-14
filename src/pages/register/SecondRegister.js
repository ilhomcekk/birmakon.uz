import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosClose } from "react-icons/io";
import "../../assets/scss/_register.scss";
import { useDispatch, useSelector } from "react-redux";
import { authSignUp, postGetCode } from "../../redux/actions/authActions";
import requests from "../../helpers/requests";
import { toast } from "react-toastify";

const Registers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [value, setValue] = useState();
  const { loginStep } = useSelector((state) => state.auth);
  const { reduxToken } = useSelector((state) => state.auth);

  useEffect(() => {
    if (loginStep === 3) {
      navigate("/");
      window.location.reload();
    }
  }, [loginStep]);

  return (
    <>
      <div className="register-box__box fixed top-0 right-0 bottom-0 left-0 z-10 flex items-center justify-center min-h-screen bg-gray-100 pb-8">
        <div className="px-8 py-6 w-3/12 rounded-md mt-4 text-left bg-white shadow-lg get__code">
          <form action="">
            <div className="mt-4">
              <div>
                <label className="block font-size" htmlFor="email">
                  Введите код
                </label>
                <input
                  type="password"
                  placeholder="(xxxxxx)"
                  className="w-full px-4 py-2 mt-2 border rounded-md"
                  onChange={(e) => setValue(e.target.value)}
                  onKeyPress={(e: KeyboardEvent<HTMLDivElement>) =>
                    e.key == "Enter" &&
                    dispatch(postGetCode({ code: value }))
                  }
                />
              </div>
              {/* <span className="mt-2 time">-0.59</span> */}
              <div className="flex mt-4">
                <div
                  onClick={() => {
                    dispatch(postGetCode({ code: value }));
                  }}
                  className="reg-btnbtn text-center text-white w-full py-2"
                >
                  Переотправить
                </div>
              </div>
              {/* <div className="flex items-baseline justify-between mt-2">
            <button className="px-6 py-2 w-full mt-4 text-white reg">
              Регистрация
            </button>
          </div> */}
              <div className="flex mt-2">
                <Link to="/register" className="registered">
                  Уже зарегистрирован?
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Registers;
