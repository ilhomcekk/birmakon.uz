import React from "react";
import { Link, MContainer } from "../element/Elemens";
import "../assets/scss/NavbarMenu.scss";
import { useDispatch, useSelector } from "react-redux";
import { subCategoryFilter } from "../redux/actions/categoryActions";
import { Swiper, SwiperSlide } from "swiper/react";
import { BiCategoryAlt } from "react-icons/bi";
import { IoIosPeople } from "react-icons/io";
import { MdImportExport, MdOutlineSlideshow } from "react-icons/md";
import { HiOutlineTruck } from "react-icons/hi";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";
const language = window.localStorage.getItem("Content-language");

export default function NavbarMenu() {
  const dispatch = useDispatch();
  // const navCategoryList = useSelector((state) => state.category.categoryList);
  const navCategoryList = [
    {
      id: 1,
      path: "/top-category",
      name: "Популярные категории",
      nameUz: "Ommabop kategoriyalar",
      nameEn: "Popular categories",
      icon: <BiCategoryAlt size="20" className="mr-1" />,
    },
    {
      id: 2,
      path: "/deliveries",
      name: "Помощь покупателям",
      nameUz: "Sotuvchilarga yordam",
      nameEn: "Help for buyers",
      icon: <IoIosPeople size="20" className="mr-1" />,
    },
    {
      id: 3,
      path: "/export",
      name: "Помощь экспортёрам",
      nameUz: "Eksportchilarga yordam",
      nameEn: "Help for exporters",
      icon: <MdImportExport size="20" className="mr-1" />,
    },
    {
      id: 4,
      path: "/exhibitions",
      name: "Выставки",
      nameUz: "Ko'rgazmalar",
      nameEn: "Exhibitions",
      icon: <MdOutlineSlideshow size="20" className="mr-1" />,
    },
    {
      id: 5,
      path: "/ar-vr",
      name: "AR & VR шоу рум",
      nameUz: "Ko'rsatish xonasi",
      nameEn: "AR & VR show room",
      icon: <HiOutlineTruck size="20" className="mr-1" />,
    },
  ];

  return (
    <MContainer className="md:py-4 py-2">
      <ul className="menu-list">
        {navCategoryList.map((category, index) => (
          <li key={index}>
            <Link
              className="flex items-center md:text-center"
              to={category.path}
            >
              {category.icon}
              {language === "ru" && category.name}
              {language === "uz" && category.nameUz}
              {language === "en" && category.nameEn}
            </Link>
          </li>
        ))}
      </ul>
    </MContainer>
  );
}
