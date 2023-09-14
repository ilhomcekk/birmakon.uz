import React from "react";
import { MContainer } from "../../element/Elemens";
import "../../assets/scss/_not_found.scss";
import notimage from "../../assets/images/error-6482984_960_720.png";

const NotFound = () => {
  return (
    <MContainer>
      <div className="not__found__page">
        <h4>Saytga texnik ishlar olib borilmoqda</h4>
        <div className="not__found__page__image__ramci">
          <img src={notimage} alt="Not Fount" />
        </div>
      </div>
    </MContainer>
  );
};

export default NotFound;
