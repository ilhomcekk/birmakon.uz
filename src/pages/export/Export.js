import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "@mui/system";
import exportPhoto from "../../assets/images/exportBirmakon.jpg";
import { Link } from "react-router-dom";
import Title from "../../component/Title/Title";
import NavbarMenu from "../../container/NavbarMenu";
const API = "https://admin.birmakon.uz";

const Export = () => {
  const dispatch = useDispatch();

  return (
    <>
      <NavbarMenu />
      <div className="shadow-2xl xl:p-12 py-6">
        <Title
          name="Помощь экспортёрам"
          nameUz="Eksportchilarga yordam"
          nameEn="Help for exporters"
        />
        <Container>
          <div className="grid md:grid-cols-2 gap-4">
            <img src={exportPhoto} alt="" />
            <div className="flex items-center">
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </p>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Export;
