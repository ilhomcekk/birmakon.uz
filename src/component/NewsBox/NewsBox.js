import React from "react";
import { MLink } from "../../element/Elemens";
import "../../assets/scss/_newsBox.scss";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
const language = window.localStorage.getItem("Content-language");

const API_URL = "https://admin.birmakon.uz/";

export default function NewsBox({ news }) {
  return (
    <div className="news-box__box">
      <Link to={`/mnews/${news.id}`}>
        <img
          src={`${API_URL}${news.photo}`}
          alt="not found"
          style={{ flexShrink: "0" }}
        />
      </Link>
      <div className="box__text">
        <div className="box__title">{news.name}</div>
        <p>{parse(news.description_mini)}</p>
        <div className="n__date">
          <MLink to={`/mnews/${news.id}`}>
            {language === "ru" && "Подробно"}
            {language === "uz" && "Batafsil"}
            {language === "en" && "Detail"}
          </MLink>
          <span>{news.date}</span>
        </div>
      </div>
    </div>
  );
}
