import React, { useEffect, useState } from "react";
import { MContainer } from "../../element/Elemens";
import "../../assets/scss/_questions.scss";
import { AiFillPlayCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getQuestions } from "../../redux/actions/newsActions";
import { useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import parse from "html-react-parser";
import { createChatAdmin } from "../../redux/actions/userActions";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<AiFillPlayCircle sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function Questions() {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [expanded, setExpanded] = useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  useEffect(() => {
    dispatch(getQuestions());
  }, []);
  const questions = useSelector((state) => state.news.questions);

  return (
    <div className="question-page-react">
      <MContainer>
        <Link to="/">Главная страница / </Link>
        <Link to=""> FAQ</Link>
      </MContainer>
      <MContainer>
        <div className="questions__title">Часто задаемевый вопросы</div>
        <div className="questions__box mb-12">
          <div style={{ width: "-webkit-fill-available" }}>
            {questions.map((ques, idx) => (
              <Accordion
                expanded={expanded === `panel${idx}`}
                onChange={handleChange(`panel${idx}`)}
              >
                <AccordionSummary
                  aria-controls={`panel${idx}d-content`}
                  id={`panel${idx}d-header`}
                >
                  <Typography>{parse(ques.question)}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{parse(ques.answer)}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </div>
          <div className="c__box">
            <div className="box__title">У вас есть вопросы</div>
            <input
              onChange={(e) => {
                let newData = {
                  ...data,
                  name: e.target.value,
                };
                setData(newData);
              }}
              type="text"
              placeholder="Ваше имя"
            />
            <input
              onChange={(e) => {
                let newData = {
                  ...data,
                  email: e.target.value,
                };
                setData(newData);
              }}
              type="email"
              placeholder="Ваш  e-mail"
            />
            <textarea
              onChange={(e) => {
                let newData = {
                  ...data,
                  message: e.target.value,
                };
                setData(newData);
              }}
              placeholder="Ваш отзыв"
            ></textarea>
            <button
              onClick={() => dispatch(createChatAdmin({ ...data }))}
              type="submit"
            >
              Отправить вопрос
            </button>
          </div>
        </div>
      </MContainer>
    </div>
  );
}
