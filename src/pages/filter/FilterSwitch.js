import React from "react";
import "../../assets/scss/_filter.scss";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { BsChevronDown } from "react-icons/bs";

const FilterSwitch = ({ input, handleFilter }) => {
  switch (input.type) {
    case "checkbox":
      return (
        <Accordion>
          <AccordionSummary
            expandIcon={<BsChevronDown />}
            aria-controls={`panel${input.id}a-content`}
            id={`panel${input.id}a-header`}
          >
            <Typography>{input.name}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <div className="size__boxes">
                {input.childs?.map((item) => (
                  <>
                    <label className="asad_checkbox">
                      <input
                        className="input-factories"
                        type="checkbox"
                        placeholder={item.value}
                        onChange={() =>
                          handleFilter(item.id, item.value, "checkbox")
                        }
                      />
                      <div>{item.value}</div>
                    </label>
                  </>
                ))}
              </div>
            </Typography>
          </AccordionDetails>
        </Accordion>
        // <div className="input-item">
        //   <p className="input-name-p">{input.name}</p>
        //   <div className="asad_fix">
        //     {input.childs?.map((item) => (
        //       <>
        //         <label className="asad_checkbox">
        //           <span>{item.value}</span>
        //           <input
        //             className="input-factories"
        //             type="checkbox"
        //             placeholder={item.value}
        //             onChange={() =>
        //               handleFilter(item.id, item.value, "checkbox")
        //             }
        //           />
        //         </label>
        //       </>
        //     ))}
        //   </div>
        // </div>
      );
    case "select":
      return (
        <>
          <Accordion>
            <AccordionSummary
              expandIcon={<BsChevronDown />}
              aria-controls={`panel${input.id}a-content`}
              id={`panel${input.id}a-header`}
            >
              <Typography>{input.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <select
                  className="input-factories"
                  onChange={(e) =>
                    handleFilter(input.id, e.target.value, "select")
                  }
                >
                  <option value="">Выбрать подкатегорию</option>
                  {input.childs?.map((item) => {
                    return (
                      <option id={item.id} value={item.value}>
                        {item.value}
                      </option>
                    );
                  })}
                </select>
              </Typography>
            </AccordionDetails>
          </Accordion>
          {/* <div className="input-item">
            <p className="input-name-p">{input.name}</p>
            <select
              className="input-factories"
              onChange={(e) => handleFilter(input.id, e.target.value, "select")}
            >
              <option value="">Выбрать подкатегорию</option>
              {input.childs?.map((item) => {
                return (
                  <option id={item.id} value={item.value}>
                    {item.value}
                  </option>
                );
              })}
            </select>
          </div> */}
        </>
      );
    case "input":
      return (
        <>
          <div className="input-item">
            <p className="input-name-p">{input.name}</p>
            <input
              onChange={(e) => handleFilter(input.id, e.target.value, "input")}
              className="input-factories"
              type="text"
            />
          </div>
        </>
      );

    default:
      return null;
  }
};

export default FilterSwitch;
