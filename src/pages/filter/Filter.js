import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams, useSearchParams } from "react-router-dom";
import "../../assets/scss/_filter.scss";
import "react-hook-form";
import NavbarMenu from "../../container/NavbarMenu";
import { Cart } from "../../component/Cart/Cart";
import { MContainer } from "../../element/Elemens";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
  Pagination,
} from "@mui/material";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
// import Slider from '@mui/material/Slider';
// import Slider from 'react-rangeslider';
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";
import { BsChevronDown } from "react-icons/bs";
import Title from "../../component/Title/Title";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import {
  getBrands,
  getProductGalleryAll,
  getProductPriceDown,
  getProductPriceUp,
  getProductsByBrand,
  getProductSortNew,
} from "../../redux/actions/filterActions";
import {
  getSubCategoriesAll,
  subCategoryFilter,
} from "../../redux/actions/categoryActions";
import PreLoader from "../../component/PreLoader/PreLoader";
import FilterSwitch from "./FilterSwitch";
import { Form } from "react-final-form";
import { getProductsAll } from "../../redux/actions/productActions";
import { IoIosArrowDown } from "react-icons/io";

export default function Filter() {
  const [searchParams, setSearchParams] = useSearchParams();

  const { id } = useParams();
  const dispatch = useDispatch();
  const [filter, setFilter] = useState({ page: 1, "per-page": 12 });
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(priceMin);

  // const filterNam = f
  const handleFilter = (id, value, type) => {
    setFilter((prevState) => {
      return {
        ...prevState,
        [`filter[${id}]`]: id,
      };
    });
  };
  const [sortProduct, setSortProduct] = useState(0);

  useEffect(() => {
    dispatch(getProductGalleryAll(id, filter));
    // dispatch(getProductsByBrand());
    dispatch(getSubCategoriesAll(id));
  }, [id]);

  const galleryProductList = useSelector((state) => state.filter.list);
  const { productGalleryPagination } = useSelector((state) => state.filter);
  const { loading } = useSelector((state) => state.filter);
  // const categoryBrand = useSelector((state) => state.filter.brand_list);
  const filters = useSelector((state) => state.category.subCategory);
  const { loading2 } = useSelector((state) => state.filter);
  const productFelter = useSelector((state) => state.filter.list);
  const shopFilter = useSelector((state) => state.filter.shopList);
  const categoryList = useSelector((state) => state.category.categoryList);
  const subCategoryList = useSelector((state) => state.category.subCategory);
  const [currentCategory, setCurrentCategory] = useState();
  const [currentSubCategory, setCurrentSubCategory] = useState();

  const { handleSubmit } = useForm({});

  const onSubmit = (data) => {
    setSearchParams({
      ...data,
      filter,
    });
    dispatch(
      getProductGalleryAll({
        ...data,
        filter,
      })
    );
  };

  const onPageChange = (event, value) => {
    let newFilter = {
      ...filter,
      page: value,
    };
    setFilter(newFilter);
    dispatch(getProductGalleryAll(id, newFilter));
    window.scrollTo(0, 0);
  };

  return (
    <>
      <NavbarMenu />
      <MContainer>
        <div className="pages-link mb-4">
          <Link to="/">Главная страница / </Link>
        </div>
      </MContainer>
      <MContainer key={id}>
        <Title name="Фильтры" />
        <div>
          <div className="filter">
            <div className="sidebar__filter">
              <div className="flex gap-4 flex-col items-center justify-between">
                <label>
                  От
                  <input
                    onChange={(e) => {
                      let newFilter = {
                        ...filter,
                        price_min: e.target.value,
                      };
                      setPriceMin(e.target.value);
                      setFilter(newFilter);
                    }}
                    className="mt-2 border w-full rounded-full text-black px-4 py-2"
                    type="number"
                  />
                </label>
                <label>
                  До
                  <input
                    onChange={(e) => {
                      let newFilter = {
                        ...filter,
                        price_max: e.target.value,
                      };
                      setPriceMax(e.target.value);
                      setFilter(newFilter);
                    }}
                    className="mt-2 border w-full rounded-full text-black px-4 py-2"
                    type="number"
                  />
                </label>
              </div>
              {filters.map((item, idx) => (
                <FilterSwitch
                  key={idx}
                  input={item}
                  handleFilter={handleFilter}
                />
              ))}
              <div className="filter__buttons flex">
                <button
                  onClick={() => {
                    let newFilter = {
                      ...filter,
                      page: 1,
                    };
                    setFilter(newFilter);
                    dispatch(getProductGalleryAll(id, newFilter));
                  }}
                  type="submit"
                  className="filter"
                >
                  Фильтр
                </button>
                <button
                  onClick={() => window.location.reload()}
                  className="reset"
                  type="submit"
                >
                  Сбросить
                </button>
              </div>
            </div>
            <div className="all__products">
              <div className="products__menu">
                <ul className="flex flex-wrap">
                  <span>Сортировать по:</span>
                  <Button
                    onClick={() => {
                      dispatch(getProductPriceDown());
                      setSortProduct(1);
                    }}
                    style={{
                      color: "#131e3d",
                      background:
                        sortProduct === 1 && "rgba(25, 118, 210, 0.04)",
                    }}
                    className={`active ml-4`}
                  >
                    Самые дешевые
                  </Button>
                  <Button
                    onClick={() => {
                      dispatch(getProductPriceUp());
                      setSortProduct(2);
                    }}
                    style={{
                      color: "#131e3d",
                      background:
                        sortProduct === 2 && "rgba(25, 118, 210, 0.04)",
                    }}
                    className="ml-4"
                  >
                    Самые дорогие
                  </Button>
                  <Button
                    onClick={() => {
                      dispatch(getProductSortNew());
                      setSortProduct(3);
                    }}
                    style={{
                      color: "#131e3d",
                      background:
                        sortProduct === 3 && "rgba(25, 118, 210, 0.04)",
                    }}
                    className="ml-4"
                  >
                    Новинки
                  </Button>
                </ul>
              </div>
              <div className="products">
                {loading2 && <PreLoader />}
                {!loading2 && (
                  <div>
                    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-3 mb-8">
                      {galleryProductList?.map((product, idx) => (
                        <Cart key={idx} product={product} />
                      ))}
                    </div>
                  </div>
                )}
                {galleryProductList?.length > 0 && !loading2 && (
                  <Pagination
                    className="flex items-center justify-center mb-6"
                    count={productGalleryPagination?.pageCount}
                    page={productGalleryPagination?.currentPage}
                    defaultPage={productGalleryPagination?.currentPage}
                    onChange={onPageChange}
                    color="error"
                  />
                )}
              </div>
              {/* <div className="products">
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-3">
                {productsList.map((product, index) => (
                  <Cart key={index} product={product} />
                ))}
              </div>
            </div> */}
              {/* <div className="products">
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-3">
                {productsList.map((product, index) => (
                  <Cart key={index} product={product} />
                ))}
              </div>
            </div> */}
            </div>
          </div>
        </div>
      </MContainer>
    </>
  );
}
