import React, { useEffect } from "react";
import ratingImg1 from "../../assets/images/unsplash_XZ3EmAIWuz0.png";
import { MContainer, MLink } from "../../element/Elemens";
import "../../assets/scss/_compare.scss";
import { CgSoftwareUpload } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { addCompare, compareList } from "../../redux/actions/compareActions";
import PreLoader from "../../component/PreLoader/PreLoader";
import noCompareImage from "../../assets/images/noCompare.jpg";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const Compare = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.compare);
  useEffect(() => {
    dispatch(compareList());
  }, [data]);

  const compare_list = useSelector((state) => state.compare.list);
  const { loading } = useSelector((state) => state.compare);

  return (
    <>
      <MContainer className="md:py-16 py-8">
        {loading && <PreLoader />}
        {!loading && (
          <div className="box compare__box py-2 px-2">
            {compare_list?.length > 0 ? (
              compare_list?.map((compare, idx) => (
                <div key={idx} className="rating__box">
                  <div className="rating__about padding relative">
                    <div className="absolute top-0 right-0 pt-6">
                      <Button
                        onClick={() => {
                          dispatch(addCompare({ product_id: compare.id }));
                          dispatch(compareList());
                        }}
                        variant="outlined"
                        color="primary"
                      >
                        Удалить
                      </Button>
                    </div>
                    <Link to={`/add/${compare.id}`}>
                      <img
                        className="rating__image mr-4"
                        src={`https://admin.birmakon.uz/${compare.photo}`}
                        alt="not found"
                      />
                    </Link>
                    <div className="rating">
                      <div className="rating__title">{compare.name}</div>
                      <div className="rating__number">
                        <span>{compare.rating}</span>
                        <span>Общая оценка</span>
                      </div>
                      <MLink
                        to={"/selleradres/" + compare.shop?.id}
                        className="rating__link"
                      >
                        {compare.shop?.name}
                        <CgSoftwareUpload
                          className="ml-2"
                          size={24}
                          fill={"#EE4927"}
                        />
                      </MLink>
                    </div>
                  </div>
                  <div className="character padding border-top">
                    <div className="character__title mb-4">Характеристики</div>
                    {compare?.productProperties?.map((item, idx) => (
                      <div key={idx} className="r__type">
                        {item.key_name} {item.key_name && ":"}{" "}
                        <span>{item.value_name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div
                className="flex flex-col items-center justify-center col-span-2"
                style={{ height: "500px" }}
              >
                <img src={noCompareImage} alt="" />
                Сравнений пока нет
              </div>
            )}
          </div>
        )}
      </MContainer>
    </>
  );
};

export default Compare;
