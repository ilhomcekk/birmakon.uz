import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { MContainer } from "../../element/Elemens";
import {
  getCategoriesAll,
  getSubCategoriesAll,
} from "../../redux/actions/categoryActions";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { AiOutlinePlus } from "react-icons/ai";
import "../../assets/scss/_category.scss";
const API_URL = `${process.env.REACT_APP_API_DOMAIN}`;

const Category = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [currentCategory, setCurrentCategory] = useState();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    dispatch(getSubCategoriesAll(id));
  }, [id]);

  const categoryList = useSelector((state) => state.category.categoryList);
  const subCategoryList = useSelector((state) => state.category.subCategory);
  const handleCategory = async () => {
    const category = await categoryList?.find((item) => item.id == id);
    return setCurrentCategory(category);
  };
  handleCategory();

  return (
    <>
      <MContainer>
        <div className="pages-link">
          <Link to="/">Главная страница / </Link>
          <Link to="">{currentCategory?.name}</Link>
        </div>
      </MContainer>
      <MContainer>
        <div className="category__grid grid xl:grid-cols-3 lg:grid-cols-2 gap-x-6 gap-y-8 my-12">
          {subCategoryList?.map((item, idx) => (
            <Accordion
              key={idx}
              expanded={expanded === `panel${idx}`}
              onChange={handleChange(`panel${idx}`)}
              className="!duration-200 hover:!bg-slate-200"
            >
              <AccordionSummary
                expandIcon={<AiOutlinePlus />}
                aria-controls={`panel${idx}a-content`}
                id={`panel${idx}a-header`}
              >
                <Typography className="flex items-center gap-2 md:!text-base !text-sm">
                  <img
                    style={{ height: "35px", width: "35px" }}
                    src={`${API_URL}${item?.photo}`}
                    alt=""
                  />
                  {item?.name}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {item?.childs?.length > 0
                  ? item?.childs?.map((item, idx) => (
                      <Link
                        className="flex items-center gap-2 duration-200 hover:bg-slate-300 px-4 py-2 md:!text-base !text-sm"
                        to={`/filter/${item.id}`}
                        key={idx}
                      >
                        <img
                          style={{ height: "35px", width: "35px" }}
                          src={API_URL + item?.photo}
                          alt=""
                        />
                        {item?.name}
                      </Link>
                    ))
                  : "Нет подкатегории"}
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </MContainer>
    </>
  );
};

export default Category;
