import "./functions.scss";
import React from "react";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import Navbar from "./container/Navbar";
import Product from "./pages/product/Product";
import ProductOrder from "./pages/product/ProductOrder";
import ScrollTop from "./container/ScrollTop";
import Footer from "./pages/footer/Footer";
import NotFound from "./pages/notFound/NotFound";
import Compare from "./pages/compare/Compare";
import Info from "./pages/info/Info";
import DeliveryCart from "./pages/deliverycart/DeliveryCart";
import Selected from "./pages/selected/Selected";
import Contract from "./pages/contract/Contract";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Basket from "./pages/basket/Basket";
import Payments from "./pages/payments/Payments";
import Deliveries from "./pages/delivery/Deliveries";
import ReturnProduct from "./pages/returnProduct/ReturnProduct";
import Cabinet from "./pages/cabinet/Cabinet";
import Questions from "./pages/questions/Questions";
import Contacts from "./pages/contacts/Contacts";
import SellerAdres from "./pages/sellerAdres/SellerAdres";
import Seller from "./pages/seller/Seller";
import News from "./pages/marketNews/News";
import { MNews } from "./pages/marketNews/MNews";
import Add from "./pages/add/Add";
import Filter from "./pages/filter/Filter";
import TopCategory from "./pages/topCategory/TopCategory";
import FirstRegister from "./pages/register/FirstRegister";
import SecondRegister from "./pages/register/SecondRegister";
import Register from "./pages/register/Register";
import Message from "./pages/message/Message";
import Notification from "./pages/readedNotification/Notification";
import MessageDetail from "./pages/message/MessageDetail";
import MessageTab2 from "./pages/message/MessageTab2";
import MessageTab3 from "./pages/message/MessageTab3";
import UserDetail from "./pages/message/UserDetail";
import Export from "./pages/export/Export";
import VrAr from "./pages/VrAr/VrAr";
import Exhibitions from "./pages/exhibitions/Exhibitions";
import SearchProduct from "./pages/searchPage/SearchProduct";
import SearchShop from "./pages/searchPage/SearchShop";
import Recovery from "./pages/register/Recovery";
import Category from "./pages/category/Category";
import Markets from "./pages/markets/Markets";
// const token = window.localStorage.getItem("@token");
const token = window.localStorage.getItem("@token");
const language = window.localStorage.getItem("Content-language");
const currency = window.localStorage.getItem("Content-currency");
const region = window.localStorage.getItem("Content-region");

const App = () => {
  if (!language) {
    window.localStorage.setItem("Content-language", "ru");
  }
  if (!currency) {
    window.localStorage.setItem("Content-currency", "sum");
  }
  if (!region) {
    window.localStorage.setItem("Content-region", 18);
  }
  return (
    <>
      <BrowserRouter>
        <div>
          <ScrollTop />
          <ToastContainer position="top-center" />
          <div>
            <Navbar />
            <Routes path="/">
              <Route path="/category/:id" element={<Category />} />
              <Route path="/compare" element={<Compare />} />
              <Route path="/search/product" element={<SearchProduct />} />
              <Route path="/search/shop" element={<SearchShop />} />
              <Route path="/markets" element={<Markets />} />
              <Route path="/info" element={<Info />} />
              <Route path="/deliverycart" element={<DeliveryCart />} />
              <Route path="/" element={<Product />} />
              <Route path="/basket" element={<Basket />} />
              <Route path="/selected" element={<Selected />} />
              <Route path="/contract" element={<Contract />} />
              <Route path="/cabinet" element={<Cabinet />} />
              <Route path="/questions" element={<Questions />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/payments" element={<Payments />} />
              <Route path="/add/:id" element={<Add />} />
              <Route path="/message" element={<Message />} />
              <Route path="/message/admin" element={<MessageTab3 />} />
              <Route path="/message/type=shop" element={<MessageTab2 />} />
              <Route path="/message/type=shop/:id" element={<UserDetail />} />
              <Route path="/message/detail/:id" element={<MessageDetail />} />
              <Route path="/deliveries" element={<Deliveries />} />
              <Route path="/returnproduct" element={<ReturnProduct />} />
              <Route
                path="/selleradres/:id"
                element={<SellerAdres key={window.location.pathname} />}
              />
              <Route path="/seller" element={<Seller />} />
              <Route path="/news" element={<News />} />
              <Route path="/mnews/:id" element={<MNews />} />
              <Route path="/filter" element={<Filter />} />
              <Route path="/filter/:id" element={<Filter />} />
              <Route
                path="/notification/type=readed/:id"
                element={<Notification />}
              />
              <Route
                path="/product/order/:productID"
                element={<ProductOrder />}
              />
              <Route path="/top-category" element={<TopCategory />} />
              <Route path="/export" element={<Export />} />
              <Route path="/ar-vr" element={<VrAr />} />
              <Route path="/exhibitions" element={<Exhibitions />} />
              <Route path="/second-register" element={<SecondRegister />} />
              <Route path="/firstregister" element={<FirstRegister />} />
              <Route path="/register" element={<Register />} />
              <Route path="/recovery" element={<Recovery />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
          </div>
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
