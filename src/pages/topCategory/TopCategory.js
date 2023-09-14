import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "@mui/system";
import top from "../../assets/images/topCategory.png";
import { Link } from "react-router-dom";
import { subCategoryFilter } from "../../redux/actions/categoryActions";
import Title from "../../component/Title/Title";
import NavbarMenu from "../../container/NavbarMenu";
import { MContainer } from "../../element/Elemens";
const API = "https://admin.birmakon.uz";

const TopCategory = () => {
  const dispatch = useDispatch();
  const navCategoryList = useSelector((state) => state.category.categoryList);

  return (
    <>
      <NavbarMenu />
      <div className="shadow-2xl xl:p-12 py-6 !pt-2">
        <Title
          name="Топ категории"
          nameUz="Yuqori kategoriyalar"
          nameEn="Top categories"
        />
        <MContainer>
          <div>
            <ul className="grid grid-cols-6 gap-4">
              {navCategoryList?.map((item) => (
                <li
                  key={item.id}
                  onClick={() => dispatch(subCategoryFilter(item.id))}
                >
                  <Link
                    className="flex flex-col border rounded items-center hover:border-orange-600 duration-200 text-sky-900 text-sm p-3"
                    to={`/category/` + item.id}
                  >
                    <img
                      className="mr-3"
                      height="120"
                      width="100%"
                      src={API + item.photo}
                      alt=""
                    />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </MContainer>
      </div>
    </>
  );
};

export default TopCategory;
