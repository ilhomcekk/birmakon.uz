import React, { useEffect, useState } from "react";
import { Container } from "@mui/system";
import NavbarMenu from "../../container/NavbarMenu";
import Title from "../../component/Title/Title";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActions } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getLastNews } from "../../redux/actions/newsActions";
import NewsBox from "../../component/NewsBox/NewsBox";
const API = "https://admin.birmakon.uz";

const Exhibitions = () => {
  const dispatch = useDispatch();

  const [params, setParams] = useState({
    page: 1,
    "per-page": 12,
  });

  useEffect(() => {
    dispatch(getLastNews(params));
  }, []);

  const { last_newsPagination } = useSelector((state) => state.news);
  const last_news = useSelector((state) => state.news.last_news);

  const handleOnPageChange = (e, value) => {
    let newParams = {
      ...params,
      page: (params["page"] += 1),
    };
    setParams(newParams);
    dispatch(getLastNews(newParams));
  };

  return (
    <>
      <NavbarMenu />
      <div className="shadow-2xl xl:p-12 px-2 py-6">
        <Title name="Выставки" nameUz="Ko'rgazmalar" nameEn="Exhibitions" />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 lg:gap-7 gap-4 exbitions">
          {last_news?.map((item, idx) => (
            <NewsBox key={idx} news={item} />
          ))}
        </div>
        {last_news?.length !== 0 && (
          <button onClick={handleOnPageChange} className="show__all">
            Показать еще
          </button>
        )}
      </div>
    </>
  );
};

export default Exhibitions;
