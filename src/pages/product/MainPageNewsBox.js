import React, { useEffect } from "react";
import { getLastNews } from "../../redux/actions/newsActions";
import { useDispatch, useSelector } from "react-redux";
import { MContainer } from "../../element/Elemens";
import Title from "../../component/Title/Title";
import NewsBox from "../../component/NewsBox/NewsBox";
import PreLoader from "../../component/PreLoader/PreLoader";
import parse from "html-react-parser";
const language = window.localStorage.getItem("Content-language");

export default function MainPageNewsBox() {
  const dispatch = useDispatch();

  // const [filter, setFilter] = useState({
  //    id: "2",
  // });

  useEffect(() => {
    dispatch(getLastNews());
  }, []);

  const { loading } = useSelector((state) => state.news);
  const getListNews = useSelector((state) => state.news.last_news);

  return (
    <MContainer className="md:py-12 py-8">
      <Title nameUz='Yangiliklar' nameEn='News' name="Новости" />
      <div className="news__boxes__products grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-7">
        {getListNews.map((news, index) => (
          <NewsBox key={index} news={news} />
        ))}
      </div>
      {loading && <PreLoader />}
    </MContainer>
  );
}
