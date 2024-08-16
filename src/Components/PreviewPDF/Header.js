import React from "react";
import { Image } from "@react-pdf/renderer";
import CalendarHeader from "../../assets/img/CalendarHeader_12345px.jpeg";

const MyHeader = () => {
  return <Image src={CalendarHeader}></Image>;
};

export default MyHeader;
