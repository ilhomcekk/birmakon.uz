import React from "react";
import tab1Img from "../../assets/images/Vector (10).png";
import tab2Img from "../../assets/images/Vector (11).png";
import { AiOutlineRight } from "react-icons/ai";
import { Container } from "@mui/system";

export default function MessageTab2() {
  return (
    <Container>
      <div className="lists my-8">
        <div className="list mr-4">
          <div className="new__list">
            <i className="next next__page">
              <AiOutlineRight size={30} fill="white" />
            </i>
          </div>
          <div className="new__list">
            <div className="rectangle"></div>
            <p>Поддержка 1</p>
          </div>
          <div className="new__list">
            <div className="rectangle"></div>
            <p>Поддержка 2</p>
          </div>
          <div className="new__list">
            <div className="rectangle"></div>
            <p>Поддержка 3</p>
          </div>
        </div>
        <div className="message__shadow">
          <div className="title">Поддержка</div>
          <div className="message__shadow-message">
            <p>
              Рада приветствовать Вас в (Сайт названия) Я Ева Вайлет -
              виртуальный помощник службы поддержки. Если у Вас возник вопрос -
              задайте его в этом чате, и я с удовольствием отвечу на него.
            </p>
            <div className="admin__text">
              Рада приветствовать Вас в (Сайт названия) Я Ева Вайлет -
              виртуальный помощник службы поддержки. Если у Вас возник вопрос -
              задайте его в этом чате, и я с удовольствием отвечу на него.
            </div>
            <p>
              Рада приветствовать Вас в (Сайт названия) Я Ева Вайлет -
              виртуальный помощник службы поддержки. Если у Вас возник вопрос -
              задайте его в этом чате, и я с удовольствием отвечу на него.
            </p>
          </div>
          <div className="container mx-auto px-0">
            <div className="send">
              <form>
                <img src={tab1Img} alt="not found" />
                <input type="text" placeholder="Ваше сообщение" />
              </form>
              <img src={tab2Img} alt="not found" className="send" />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
