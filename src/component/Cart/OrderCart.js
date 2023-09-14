import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "../../assets/scss/_ordercart.scss";
import { postRefund } from "../../redux/actions/orderActions";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
const URL = `${process.env.REACT_APP_API_DOMAIN}`;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #e6e6e6",
  boxShadow: 24,
  p: 4,
};

const OrderCart = ({ order, onClickCancelOrder }) => {
  const dispatch = useDispatch();
  const [orderProduct, setOrderProduct] = useState([order]);
  const [product_id, setProductId] = useState();
  const [message, setMessage] = useState();
  const [open, setOpen] = useState(false);
  const handleOpen = (e) => {
    setOpen(true);
    setProductId(e);
  };
  const handleClose = () => setOpen(false);

  return (
    <>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box style={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Message
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <Box
                sx={{
                  width: 500,
                  maxWidth: "100%",
                }}
              >
                <TextField
                  onChange={(e) => setMessage(e.target.value)}
                  fullWidth
                  label="Ваше сообшение"
                  id="fullWidth"
                />
              </Box>
              <div className="flex justify-end mt-4">
                <Button
                  onClick={() =>
                    dispatch(
                      postRefund({
                        order_product_id: product_id,
                        message: message,
                      })
                    )
                  }
                  variant="contained"
                >
                  Сохранить
                </Button>
              </div>
            </Typography>
          </Box>
        </Modal>
      </div>
      {order.orderProducts?.map((item) => (
        <div className="cart delivery__cart" key={item.id}>
          <div className="cart__img">
            <div className="image relative">
              {!item?.product?.photo ? (
                <img
                  src="https://admin.birmakon.uz//assets_files/images/no-photo.png"
                  alt="Product"
                />
              ) : (
                <img src={`${URL}${item?.product?.photo}`} alt="not found" />
              )}
            </div>
            <div className="cart__info">
              <div>
                <div className="title">{item?.product?.name}</div>
                <p
                  className="my-2 !text-center !text-white p-2"
                  style={{ background: item?.product?.color?.color }}
                >
                  {item?.product?.color?.name}
                </p>
                <p>Бранд: {item?.product?.brand?.name}</p>
              </div>
              {/* <p>
                  Продавец: <span>ООО "ПРАЙД"</span>
                </p> */}
            </div>
          </div>
          <div className="order !pt-0">
            {item.amount ? (
              <p>
                Количество:{" "}
                <span>
                  {item?.amount} {item?.product?.unit?.name}
                </span>
              </p>
            ) : null}
          </div>
          <div className="price">
            <span id="price">
              {item?.product?.price} {item?.product?.currency?.name}
            </span>
            {order.status === 5 && (
              <Button
                onClick={() => handleOpen(item.id)}
                className="!w-max !ml-auto"
              >
                Сделать возврат
              </Button>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default OrderCart;
