import React from 'react'
const language = window.localStorage.getItem("Content-language");

export default function Title(props) {
  return (
    <div className="brand__name ml-0">
      {language === "ru" && props.name}
      {language === "uz" && (props.nameUz ? props.nameUz : props.name)}
      {language === "en" && (props.nameEn ? props.nameEn : props.name)}
    </div>
  );
}
