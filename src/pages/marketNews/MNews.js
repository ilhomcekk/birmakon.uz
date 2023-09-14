import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../assets/scss/_mnews.scss";
import { MContainer, MLink, Link } from "../../element/Elemens";
import { getLastNews, getNewsDetail } from "../../redux/actions/newsActions";
import { FaEye } from "react-icons/fa";
import image4 from "../../assets/images/image 3.png";
import image7 from "../../assets/images/Rectangle 623.png";
import image8 from "../../assets/images/Rectangle 624.png";
import Title from "../../component/Title/Title";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
const API = "https://admin.birmakon.uz/";

export const MNews = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNewsDetail(id));
    dispatch(getLastNews());
  }, [id]);

  const { loading } = useSelector((state) => state.news);
  const newsDetail = useSelector((state) => state.news.data);
  const lastNews = useSelector((state) => state.news.last_news);
  const mainDescription0 = String(newsDetail?.description);
  const mainDescription = parse(mainDescription0);

  return (
    <>
      <MContainer>
        <div className="pages-link">
          <Link to="/">Главная страница</Link>
        </div>
      </MContainer>
      <MContainer className="md:py-8 py-4 mnews-page">
        <Title name={newsDetail.name} />
        <div className="mnews__boxes">
          <div className="box">
            <div className="box__image">
              <img src={`${API}${newsDetail.photo}`} alt="not found" />
              <span>{newsDetail.date}</span>
            </div>
            <p>{mainDescription}</p>
            {/* <div className="sidebar">
              <img src={image4} alt="not found" className="sidebar__img" />
              <div className="sidebar__box">
                <img src={image7} alt="not found" />
                <img src={image8} alt="not found" />
              </div>
            </div> */}
            <div className="shows flex flex-wrap">
              <MLink to="">Telegram</MLink>
              <span>|</span>
              <MLink to="">Facebook</MLink>
              <span className="flex items-center">
                <FaEye className="mr-2" size={16} />
                {newsDetail.views}
              </span>
            </div>
          </div>
          <div className="box">
            <div className="box__title">Последние новости</div>
            {lastNews.map((news, index) => (
              <div news={news} key={index} className="late__box">
                <img src={`${API}${news.photo}`} alt="not found" />
                <div className="late__text">
                  <div className="late__title">{news.name}</div>
                  <p>{parse(news.description_mini)}</p>
                  <div className="n__date">
                    <MLink to={"/mnews/" + news.id}>Подробно</MLink>
                    <span>{news.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </MContainer>
    </>
  );
};
