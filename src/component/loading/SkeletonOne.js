import React from "react";
import "../../assets/scss/_skeleton.scss";

export const SkeletonOne = ({ type }) => {
  return (
    <div className="skeleton">
      <div className={type}></div>
    </div>
  );
};
