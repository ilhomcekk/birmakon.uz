import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Container } from "@mui/system";
import p1 from "../../assets/images/p1.png";
import p2 from "../../assets/images/p2.jpg";
import Title from "../../component/Title/Title";
import NavbarMenu from "../../container/NavbarMenu";
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper";
const API = "https://admin.birmakon.uz";

const VrAr = () => {
  return (
    <>
      <NavbarMenu />
      <div className="shadow-2xl py-6 md:px-16">
        <Title
          name="AR & VR шоу рум"
          nameUz="Ko'rsatish xonasi"
          nameEn="AR & VR show room"
        />
        <Swiper
          navigation={true}
          modules={[Navigation]}
          loop
          className="mySwiper-arvr"
        >
          <SwiperSlide>
            <img className="object-contain" src={p2} alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img className="object-contain" src={p1} alt="" />
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
};

export default VrAr;
