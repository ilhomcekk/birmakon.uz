import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const MContainer = styled.div`
  width: 90%;
  margin: 0 auto;

  @media (max-width: 780px) {
    width: 92%;
  }
  @media (max-width: 600px) {
    width: 96%;
  }
`;

export const MContent = styled.div`
  width: 100%;
  height: 80vh;
`;

export const Link = styled(NavLink)`
  cursor: pointer;
  text-decoration: none;
  color: #313131;
  white-space: nowrap;
`

export const MFooter = styled.div`
  width: 100%;
  background: #131e3d;
  
  margin-top: 20px;
  @media (max-width: 780px) {
    margin-bottom: 58px;
  }
`;

export const FooterLink = styled(NavLink)`
  color: #fff;
  transition: 0.2s linear;
  cursor: pointer;
  &:hover{
    color: #ee4927;
  }
`
export const ShowAllLink = styled(NavLink)`
  display: block;
  width: max-content;
  font-size: 18px;
  margin: 32px auto;
  color: #fff;
  text-align: center;
  background: #131e3d;
  border-radius: 8px;
  padding: 12px 80px;
  transition: 0.2s linear;
  cursor: pointer;
  &:hover{
    background: #11113d;
  }
  @media (max-width: 769px){
    padding: 10px 25px;
    font-size: 14px;
  }
  @media (max-width: 500px){
    padding: 10px;
    width: 100%;
  }
`

export const MNavbarTop = styled.div`
  height: 35px;

  @media (max-width: 780px) {
    display: none;
  }
`;

export const MLink = styled(NavLink)`
  cursor: pointer;
  text-decoration: none;
  color: white;
`;

export const MNav = styled.div`
  margin: 0 20px;
  cursor: pointer;
  color: white;
`;

export const MHeader = styled.div`
  background: #fff;
  padding: 15px 0px;
  margin-top: 1px;
`;

export const MNavbar = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
  color: white;
  height: 60px;
  top: 0;
  right: 0;
  left: 0;
  background: #fff;
  z-index: 10;
  @media only screen and (min-width: 568px) {
    position: ${(props) => (props.positionFixed ? "fixed" : "")};
    height: max-content;
  }
  @media only screen and (max-width: 568px) {
    position: ${(props) => (props.positionFixedResponse ? "fixed" : "")};
  }
  .navbar__item__global {
    padding: 5px 0 !important;
  }
`;

export const MButton = styled.button`
  padding: 8px;
  width: -webkit-fill-available;
  border: 1px solid #0f3979;
  outline: none;
  border-radius: 8px;
  background-color: #0f3979;
  color: white;
  transition: all 0.5s;
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;
