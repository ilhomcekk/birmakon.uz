import React from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

const ProductSkelet = ({ length }) => {
  return [...Array(length)].map((item, idx) => (
    <Box key={idx} sx={{ pt: 0.5 }}>
      <Skeleton variant="rectangular" width={"100%"} height={135} />
      <Skeleton />
      <Skeleton width="60%" height={30} />
      <div className="flex items-center justify-between">
        <Skeleton width="20%" />
        <Skeleton width="20%" />
      </div>
    </Box>
  ));
};

export default ProductSkelet;
