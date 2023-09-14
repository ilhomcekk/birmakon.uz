import { Button, IconButton } from "@mui/material";
import React, { useState } from "react";
import { IoIosClose } from "react-icons/io";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { Link, useNavigate } from "react-router-dom";
import "../../assets/scss/_modal.scss";
import registerPhoto from "../../assets/images/register-photo.webp";

const ErrorModal = ({ showModal, onClose, text }) => {
  const navigate = useNavigate();
  return (
    <>
      <Modal open={showModal} onClose={onClose} center>
        <div className="error-modal">
          <div className="text-xl">{text}</div>
          <img src={registerPhoto} className="my-5" alt="" />
          <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
            <Button
              onClick={() => {
                navigate("/register");
                onClose();
              }}
              variant="contained"
              color="primary"
            >
              Войти
            </Button>
            <Button
              onClick={() => {
                navigate("/firstregister");
                onClose();
              }}
              color="primary"
            >
              Зарегистрироваться
            </Button>
          </div>
        </div>
        {/* <div
          className="fixed z-10 top-0 right-0 bottom-0 left-0 w-full h-full duration-500"
          style={{ background: "rgba(0,0,0,0.7)" }}
        >
          ErrorModal
        </div> */}
      </Modal>
    </>
  );
};

export default ErrorModal;
